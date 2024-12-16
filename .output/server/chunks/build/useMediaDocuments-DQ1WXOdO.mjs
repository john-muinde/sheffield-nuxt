import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { k as useAxios } from './server.mjs';

function useMediaDocuments(options = {}) {
  const { API_URL } = useAxios();
  const {
    thumbnailScale = 0.5,
    enableDflip = true,
    cdnBaseUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174",
    storageBaseUrl = API_URL + "/storage",
    filters = {
      type: "document"
    }
  } = options;
  const documents = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();
  const loadPdfJS = async () => {
    if ((void 0).pdfjsLib) return (void 0).pdfjsLib;
    try {
      await Promise.all([
        new Promise((resolve) => {
          const script = (void 0).createElement("script");
          script.src = `${cdnBaseUrl}/pdf.min.js`;
          script.onload = resolve;
          (void 0).head.appendChild(script);
        }),
        new Promise((resolve) => {
          const script = (void 0).createElement("script");
          script.src = `${cdnBaseUrl}/pdf.worker.min.js`;
          script.onload = resolve;
          (void 0).head.appendChild(script);
        })
      ]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return (void 0).pdfjsLib;
    } catch (err) {
      console.error("Failed to load PDF.js", err);
      throw err;
    }
  };
  const generateThumbnail = async (filePath, scale = thumbnailScale) => {
    try {
      const pdfjsLib = await loadPdfJS();
      const fullPath = `${storageBaseUrl}/${filePath}`;
      const loadingTask = pdfjsLib.getDocument(fullPath);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const canvas = (void 0).createElement("canvas");
      const viewport = page.getViewport({ scale });
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({
        canvasContext: context,
        viewport
      }).promise;
      return canvas.toDataURL("image/jpeg", 0.8);
    } catch (error2) {
      console.error("Error generating thumbnail:", error2);
      return null;
    }
  };
  const processDocuments = async (fetchFunction) => {
    loading.value = true;
    try {
      const documentsData = await fetchFunction();
      const documentPromises = documentsData.map(async (doc) => {
        doc.slug = doc.slug || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        let height = 0, width = 0, heightWidthRatio = 1, orientation = "unknown";
        try {
          if (!doc.thumbnail_path && doc.publication_file.toLowerCase().endsWith(".pdf")) {
            const thumbnail = await generateThumbnail(doc.publication_file);
            doc.thumb = thumbnail || void 0;
          } else if (doc.thumbnail_path) {
            doc.thumb = `${storageBaseUrl}/${doc.thumbnail_path}`;
          }
          if (doc.thumb) {
            const dimensions = extractDimensions(doc.thumb);
            if (dimensions) {
              width = dimensions.width || 1;
              height = dimensions.height || 1;
              heightWidthRatio = width === 0 ? Infinity : height / width;
              if (heightWidthRatio > 1) {
                orientation = "portrait";
              } else if (heightWidthRatio < 1) {
                orientation = "landscape";
              } else {
                orientation = "square";
              }
            }
          }
        } catch (error2) {
          console.error(`Error processing thumbnail for ${doc.name}:`, error2);
        }
        return {
          ...doc,
          height,
          width,
          heightWidthRatio: parseFloat(heightWidthRatio.toFixed(2)),
          orientation
        };
      });
      const processedDocuments = await Promise.all(documentPromises);
      documents.value = processedDocuments.sort(
        (a, b) => b.heightWidthRatio - a.heightWidthRatio
      );
      loading.value = false;
      return documents.value;
    } catch (err) {
      loading.value = false;
      error.value = err instanceof Error ? err : new Error(String(err));
      console.error(err);
      return [];
    }
  };
  const initializeDflip = (docs = documents.value) => {
    var _a;
    if (!enableDflip || !docs.length) return false;
    docs.forEach((doc) => {
      if (doc.publication_file.toLowerCase().endsWith(".pdf")) {
        (void 0)[`df_option_${doc.id}`] = {
          source: `${storageBaseUrl}/${doc.publication_file}`,
          outline: [],
          autoEnableOutline: false,
          autoEnableThumbnail: false,
          overwritePDFOutline: false,
          pageSize: "0",
          is3D: true,
          height: "100",
          direction: "1",
          slug: doc.slug,
          wpOptions: "true",
          id: doc.id
        };
      }
    });
    if ((_a = (void 0).DFLIP) == null ? void 0 : _a.parseBooks) {
      (void 0).DFLIP.parseBooks();
      if (router.currentRoute.value.hash) {
        if (router.currentRoute.value.hash === "#_") {
          router.replace({
            hash: ""
          });
          return;
        }
        const brochure = docs.find(
          (b) => router.currentRoute.value.hash.includes(b.slug)
        );
        if (brochure) {
          (void 0).getElementById(`df_${brochure.id}`).click();
        }
      }
      return true;
    }
    console.warn("DFLIP library not loaded");
    return false;
  };
  const handleRouteLeave = (to, from) => {
    var _a;
    const wrapper = (void 0).querySelector(".df-lightbox-wrapper");
    const wrapperOpen = wrapper && wrapper.style.display !== "none";
    if ((void 0).DFLIP && wrapperOpen) {
      (_a = (void 0).querySelector(".df-lightbox-close")) == null ? void 0 : _a.click();
      return false;
    }
    return true;
  };
  const filterDocuments = (searchTerm = "") => {
    return documents.value.filter((doc) => {
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => doc[key] === value
      );
      const matchesSearch = !searchTerm || Object.values(doc).some(
        (field) => String(field).toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesFilters && matchesSearch;
    });
  };
  const extractDimensions = (filename) => {
    const parts = filename.split("-").pop().split(".jpg")[0].split("x");
    if (parts.length === 2) {
      const width = parseFloat(parts[0], 10);
      const height = parseFloat(parts[1], 10);
      if (!isNaN(width) && !isNaN(height)) {
        return { width, height };
      }
    }
    return null;
  };
  return {
    documents,
    loading,
    error,
    processDocuments,
    initializeDflip,
    generateThumbnail,
    handleRouteLeave,
    filterDocuments
  };
}

export { useMediaDocuments as u };
//# sourceMappingURL=useMediaDocuments-DQ1WXOdO.mjs.map
