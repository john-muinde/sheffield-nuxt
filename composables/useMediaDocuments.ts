import type {
  ProcessedDocument,
  DocumentOptions,
  DFlipOptions,
  DocumentDimensions,
  SortType,
  DocumentOptionsType,
} from "~/types/types";

export default function useMediaDocuments(options: DocumentOptions = {}) {
  const {
    type = "all",
    cacheTime = 3600,
    thumbnailScale = 0.4,
    enableDflip = true,
    cdnBaseUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174",
    filters = {
      type: "document",
    },
  } = options;

  const documents: Ref<ProcessedDocument[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);
  const router = useRouter();

  // Cache management
  const cacheKey = `documents_${type}`;
  const documentCache = useCookie(cacheKey, {
    maxAge: cacheTime,
    sameSite: true,
  });

  const loadPdfJS = async (): Promise<any> => {
    if (window.pdfjsLib) return window.pdfjsLib;

    try {
      await Promise.all([
        new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = `${cdnBaseUrl}/pdf.min.js`;
          script.onload = () => resolve();
          document.head.appendChild(script);
        }),
        new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = `${cdnBaseUrl}/pdf.worker.min.js`;
          script.onload = () => resolve();
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

  const generateThumbnail = async (
    filePath: string,
    scale: number = thumbnailScale
  ): Promise<string | null> => {
    try {
      const pdfjsLib = await loadPdfJS();
      const loadingTask = pdfjsLib.getDocument(filePath);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) throw new Error("Failed to get canvas context");

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

  const extractDimensions = (
    filename: string
  ): { width: number; height: number } | null => {
    const match = filename.match(/(\d+\.?\d*)x(\d+\.?\d*)/);
    return match
      ? { width: parseFloat(match[1]), height: parseFloat(match[2]) }
      : null;
  };

  const processDocuments = async (
    fetchFunction: () => Promise<ProcessedDocument[]>,
    sorting: SortType = "height"
  ): Promise<ProcessedDocument[]> => {
    loading.value = true;
    try {
      const documentsData = await fetchFunction();

      const documentPromises = documentsData.map(async (doc) => {
        doc.slug =
          doc.slug ||
          doc.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        let dimensions = {
          height: 0,
          width: 0,
          heightWidthRatio: 1,
          orientation: "unknown" as DocumentDimensions["orientation"],
        };

        try {
          if (
            !doc.thumbnail_path &&
            doc.publication_file.toLowerCase().endsWith(".pdf")
          ) {
            const thumbnail = await generateThumbnail(doc.publication_file);
            doc.thumb = thumbnail || undefined;
          } else if (doc.thumbnail_path) {
            doc.thumb = doc.thumbnail_path;
          }

          if (doc.thumb && sorting === "height") {
            const extractedDimensions = extractDimensions(doc.thumb);

            if (extractedDimensions) {
              dimensions.width = extractedDimensions.width || 1;
              dimensions.height = extractedDimensions.height || 1;
              dimensions.heightWidthRatio =
                dimensions.width === 0
                  ? Infinity
                  : dimensions.height / dimensions.width;

              dimensions.orientation =
                dimensions.heightWidthRatio > 1
                  ? "portrait"
                  : dimensions.heightWidthRatio < 1
                  ? "landscape"
                  : "square";
            }
          }
        } catch (error) {
          console.error(`Error processing thumbnail for ${doc.name}:`, error);
        }

        doc.thumb = assetsSync(doc.thumb);

        return {
          ...doc,
          ...dimensions,
        };
      });

      documents.value = await Promise.all(documentPromises);

      if (sorting === "height") {
        documents.value = sortDocumentsByThumbnailRatios(documents.value);
      }

      loading.value = false;
      return documents.value;
    } catch (err) {
      loading.value = false;
      error.value = err instanceof Error ? err : new Error(String(err));
      return [];
    }
  };

  const sortDocumentsByThumbnailRatios = (
    docs: ProcessedDocument[]
  ): ProcessedDocument[] => {
    return [...docs].sort(
      (a, b) => (b.heightWidthRatio || 1) - (a.heightWidthRatio || 1)
    );
  };

  const filterDocuments = (searchTerm: string = ""): ProcessedDocument[] => {
    return documents.value.filter((doc) => {
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => (doc as Record<string, any>)[key] === value
      );

      const matchesSearch =
        !searchTerm ||
        Object.values(doc).some((field) =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesFilters && matchesSearch;
    });
  };

  const initializeDflip = (
    docs: ProcessedDocument[] = documents.value
  ): boolean => {
    if (!enableDflip || !docs?.length) return false;

    // First configure the options for each document
    docs.forEach((doc) => {
      if (doc.publication_file.toLowerCase().endsWith(".pdf")) {
        (window as any)[`df_option_${doc.id}`] = {
          source: assetsSync(`${doc.publication_file}`),
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
        } as DFlipOptions;
      }
    });

    // Make sure DFLIP is available
    if (window.DFLIP?.parseBooks) {
      // Set global ready handler
      window.DFLIP.defaults = window.DFLIP.defaults || {};
      window.DFLIP.defaults.onReady = function (flipBook: any) {
        console.log("Global DFlip Ready:", flipBook);
        if (flipBook.ui?.fullScreen) {
          flipBook.ui.fullScreen.trigger("click");
        }
      };

      // Let DFLIP handle the initialization
      window.DFLIP.parseBooks();

      // Handle route hash for direct book opening
      if (router.currentRoute.value.hash) {
        if (router.currentRoute.value.hash === "#_") {
          router.replace({ hash: "" });
          return false;
        }

        const brochure = docs.find((b) =>
          router.currentRoute.value.hash.includes(b.slug || "")
        );

        if (brochure && import.meta.client) {
          console.log(
            "Opening brochure",
            document.getElementById(`df_${brochure.id}`)
          );
          const element = document.getElementById(`df_${brochure.id}`);
          // add _df_button class and source to the button
          if (element) {
            element.classList.add("_df_button");
            element.setAttribute(
              "source",
              assetsSync(`${brochure.publication_file}`)
            );
            element.click();
            router.push({ hash: "" });
          }
        }
      }
      return true;
    }

    console.warn("DFLIP library not loaded", window);
    return false;
  };

  const handleRouteLeave = (to: any, from: any): boolean => {
    const wrapper = document.querySelector(
      ".df-lightbox-wrapper"
    ) as HTMLElement;
    const wrapperOpen = wrapper && wrapper.style.display !== "none";

    if (window.DFLIP && wrapperOpen) {
      const closeButton = document.querySelector(
        ".df-lightbox-close"
      ) as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
      return false;
    }
    return true;
  };

  const cleanup = (): void => {
    documents.value = [];
    error.value = null;
  };

  return {
    documents,
    loading,
    error,
    processDocuments,
    initializeDflip,
    handleRouteLeave,
    filterDocuments,
    generateThumbnail,
    cleanup,
  };
}
