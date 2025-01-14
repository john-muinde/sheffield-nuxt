declare global {
  interface Window {
    DFLIP?: {
      defaults: any;
      parseBooks: () => void;
    };
    pdfjsLib?: any;
    jQuery?: any;
  }
}

// Base interface for common properties across all document types
interface BaseDocument {
  id: number;
  name: string;
  content: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// Blog specific interface
interface Blog extends BaseDocument {
  main_image_path: string;
  excerpt: string;
}

// Video specific interface
type VideoType = "Youtube Url" | "Upload Video";

interface Video extends BaseDocument {
  type?: VideoType;
  file_path: string | null;
  shown_in_about_us: boolean;
  video_url: string;
  main_image_path: string;
}

// Publication type
type PublicationType = "Newsletter" | "Brochures";

// Newsletter and Brochure shared properties
interface Publication extends BaseDocument {
  type: PublicationType;
  publication_file: string;
  thumbnail_path: string;
  slug?: string;
  thumb?: string;
}

// Document processing related interfaces
interface DocumentDimensions {
  width: number;
  height: number;
  heightWidthRatio: number;
  orientation: "portrait" | "landscape" | "square" | "unknown";
}

interface ProcessedDocument extends Publication, Partial<DocumentDimensions> {}

// Options for document processing
type DocumentOptionsType = "all" | "blog" | "video" | "newsletter" | "brochure";

interface DocumentOptions {
  type?: DocumentOptionsType;
  cacheTime?: number;
  thumbnailScale?: number;
  enableDflip?: boolean;
  cdnBaseUrl?: string;
  filters?: Record<string, any>;
}

// DFlip specific interfaces
interface DFlipOptions {
  source: string;
  outline: any[];
  autoEnableOutline: boolean;
  autoEnableThumbnail: boolean;
  overwritePDFOutline: boolean;
  pageSize: string;
  is3D: boolean;
  height: string;
  direction: string;
  slug: string;
  wpOptions: string;
  id: number;
}

// Sorting types for document collection
type SortType = "asc" | "desc" | "height" | "date";

// Collection of all document types
interface DocumentCollection {
  blogs: Blog[];
  videos: Video[];
  newsletters: Publication[];
  brochures: Publication[];
}

interface DFlipGlobalConfig {
  events?: {
    onReady: (id: any) => void;
  };
  text: {
    toggleSound: string;
    toggleThumbnails: string;
    toggleOutline: string;
    previousPage: string;
    nextPage: string;
    toggleFullscreen: string;
    zoomIn: string;
    zoomOut: string;
    toggleHelp: string;
    singlePageMode: string;
    doublePageMode: string;
    downloadPDFFile: string;
    gotoFirstPage: string;
    gotoLastPage: string;
    share: string;
    search: string;
    print: string;
    mailSubject: string;
    mailBody: string;
    loading: string;
  };
  viewerType: string;
  mobileViewerType: string;
  moreControls: string;
  hideControls: string;
  leftControls: string;
  rightControls: string;
  hideShareControls: string;
  scrollWheel: string;
  backgroundColor: string;
  backgroundImage: string;
  height: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  controlsPosition: string;
  controlsFloating: boolean;
  direction: string;
  duration: string;
  soundEnable: string;
  showDownloadControl: string;
  showSearchControl: string;
  showPrintControl: string;
  enableAnalytics: string;
  webgl: string;
  hard: string;
  autoEnableOutline: string;
  autoEnableThumbnail: string;
  pageScale: string;
  maxTextureSize: string;
  rangeChunkSize: string;
  disableRange: boolean;
  zoomRatio: string;
  flexibility: string;
  pageMode: string;
  singlePageMode: string;
  pageSize: string;
  autoPlay: string;
  autoPlayDuration: string;
  autoPlayStart: string;
  linkTarget: string;
  sharePrefix: string;
  pdfVersion: string;
  thumbLayout: string;
  targetWindow: string;
  buttonClass: string;
  hasSpiral: boolean;
  spiralColor: string;
  cover3DType: string;
  color3DCover: string;
  color3DSheets: string;
  flipbook3DTiltAngleUp: string;
  flipbook3DTiltAngleLeft: string;
  autoPDFLinktoViewer: boolean;
  sideMenuOverlay: boolean;
  displayLightboxPlayIcon: boolean;
  popupBackGroundColor: string;
  shelfImage: string;
  enableAutoLinks: boolean;
}

export type {
  BaseDocument,
  DFlipGlobalConfig,
  SortType,
  Blog,
  Video,
  VideoType,
  Publication,
  PublicationType,
  DocumentDimensions,
  ProcessedDocument,
  DocumentOptions,
  DocumentOptionsType,
  DFlipOptions,
  DocumentCollection,
};
