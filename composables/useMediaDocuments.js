import { ref } from "vue";
import { useRouter } from "vue-router";

export function useMediaDocuments(options = {}) {
  const { API_URL } = useAxios();
  const {
    thumbnailScale = 0.5,
    enableDflip = true,
    cdnBaseUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174",
    storageBaseUrl = API_URL + "/storage",
    filters = {
      type: "document",
    },
  } = options;

  const documents = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();

  // Dynamic PDF.js loader
  const loadPdfJS = async () => {
    if (window.pdfjsLib) return window.pdfjsLib;

    try {
      await Promise.all([
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = `${cdnBaseUrl}/pdf.min.js`;
          script.onload = resolve;
          document.head.appendChild(script);
        }),
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = `${cdnBaseUrl}/pdf.worker.min.js`;
          script.onload = resolve;
          document.head.appendChild(script);
        }),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 100));
      return window.pdfjsLib;
    } catch (err) {
      console.error("Failed to load PDF.js", err);
      throw err;
    }
  };

  // Generate thumbnail from PDF
  const generateThumbnail = async (filePath, scale = thumbnailScale) => {
    try {
      const pdfjsLib = await loadPdfJS();
      const fullPath = `${storageBaseUrl}/${filePath}`;
      const loadingTask = pdfjsLib.getDocument(fullPath);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const canvas = document.createElement("canvas");
      const viewport = page.getViewport({ scale });
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      return canvas.toDataURL("image/jpeg", 0.8);
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      return null;
    }
  };

  // Process documents with thumbnail generation
  const processDocuments = async (fetchFunction) => {
    loading.value = true;
    try {
      const documentsData = await fetchFunction();

      // Pre-process thumbnails asynchronously
      const documentPromises = documentsData.map(async (doc) => {
        // Generate slug if not present
        doc.slug =
          doc.slug ||
          doc.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        // Handle thumbnail generation
        let height = 0,
          width = 0,
          heightWidthRatio = 1,
          orientation = "unknown";
        try {
          if (
            !doc.thumbnail_path &&
            doc.publication_file.toLowerCase().endsWith(".pdf")
          ) {
            // Generate thumbnail for PDF
            const thumbnail = await generateThumbnail(doc.publication_file);
            doc.thumb = thumbnail || undefined;
          } else if (doc.thumbnail_path) {
            // Use existing thumbnail
            doc.thumb = `${storageBaseUrl}/${doc.thumbnail_path}`;
          }

          // Estimate thumbnail height without fully loading the image
          if (doc.thumb) {
            const dimensions = extractDimensions(doc.thumb);
            if (dimensions) {
              width = dimensions.width || 1;
              height = dimensions.height || 1;

              // Calculate height-width ratio, handling zero division
              heightWidthRatio = width === 0 ? Infinity : height / width;

              // Determine orientation based on ratio
              if (heightWidthRatio > 1) {
                orientation = "portrait";
              } else if (heightWidthRatio < 1) {
                orientation = "landscape";
              } else {
                orientation = "square";
              }
            }
          }
        } catch (error) {
          console.error(`Error processing thumbnail for ${doc.name}:`, error);
        }

        return {
          ...doc,
          height,
          width,
          heightWidthRatio: parseFloat(heightWidthRatio.toFixed(2)),
          orientation,
        };
      });

      // Limit concurrent thumbnail processing to prevent performance issues
      const processedDocuments = await Promise.all(documentPromises);

      // Sort documents by height-width ratio in descending order
      // This will prioritize portrait (taller) images, then square, then landscape
      documents.value = processedDocuments.sort(
        (a, b) => b.heightWidthRatio - a.heightWidthRatio
      );

      console.log(
        "Processed documents:",
        documents.value.map((d) => {
          return {
            name: d.name,
            height: d.height,
            width: d.width,
            heightWidthRatio: d.heightWidthRatio.toFixed(2),
            orientation: d.orientation,
          };
        })
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

  // Alternative method with fallback
  const getEstimatedThumbnailHeight = (doc) => {
    if (doc.thumbnail_path) {
      const knownHeights = {
        "a4-portrait": 794,
        "a4-landscape": 560,
        "letter-portrait": 792,
        "letter-landscape": 612,
      };

      // Try to match known dimensions
      const matchedHeight = Object.values(knownHeights).find((height) =>
        doc.thumbnail_path.includes(String(height))
      );

      if (matchedHeight) return matchedHeight;
    }

    // Fallback to a default height or based on document type
    const typeHeights = {
      brochure: 300,
      newsletter: 250,
      catalog: 400,
      default: 200,
    };

    return typeHeights[doc.type] || typeHeights["default"];
  };

  // Optimized sorting method with fallback
  const sortDocumentsByThumbnailHeight = (documents) => {
    return documents.sort((a, b) => {
      const heightA = a.thumbnailHeight || getEstimatedThumbnailHeight(a);
      const heightB = b.thumbnailHeight || getEstimatedThumbnailHeight(b);
      return heightB - heightA;
    });
  };

  // Initialize DFlip for documents
  const initializeDflip = (docs = documents.value) => {
    if (!enableDflip || !docs.length) return false;

    docs.forEach((doc) => {
      if (doc.publication_file.toLowerCase().endsWith(".pdf")) {
        window[`df_option_${doc.id}`] = {
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
          id: doc.id,
        };
      }
    });

    if (window.DFLIP?.parseBooks) {
      window.DFLIP.parseBooks();
      if (router.currentRoute.value.hash) {
        // if has is only #_ then remove the hash
        if (router.currentRoute.value.hash === "#_") {
          router.replace({
            hash: "",
          });
          return;
        }
        const brochure = docs.find((b) =>
          router.currentRoute.value.hash.includes(b.slug)
        );
        if (brochure) {
          document.getElementById(`df_${brochure.id}`).click();
        }
      }
      return true;
    }

    console.warn("DFLIP library not loaded");
    return false;
  };

  // Handle route leaving with open DFlip book
  const handleRouteLeave = (to, from) => {
    const wrapper = document.querySelector(".df-lightbox-wrapper");
    const wrapperOpen = wrapper && wrapper.style.display !== "none";

    if (window.DFLIP && wrapperOpen) {
      document.querySelector(".df-lightbox-close")?.click();
      return false;
    }
    return true;
  };

  // Filter and search documents
  const filterDocuments = (searchTerm = "") => {
    return documents.value.filter((doc) => {
      // Check filters
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => doc[key] === value
      );

      // Check search term
      const matchesSearch =
        !searchTerm ||
        Object.values(doc).some((field) =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
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
    filterDocuments,
  };
}
