import{_}from"./DNiCKMHD.js";import{_ as C}from"./Cmx_2-sP.js";import{j as k,C as w,a9 as P,c as d,a as e,b as j,w as x,m as o,A as u,q as p,s as v,H as S,F as B,p as D,o as s,t as T}from"./Cg6WK9Tj.js";import{u as F}from"./DTOzZtqW.js";import{u as L}from"./Dd2ktJ3W.js";import"./BHIiYVKw.js";const M={class:"main"},O={class:"page-content"},q={class:"container"},z={class:"row"},E={class:"col-lg-10 offset-lg-1"},N={id:"dflip-books",ref:"bookContainer",class:"dflip-books row media-center"},A=["id","href","data-slug","data-title","data-df-option","thumb"],I={ref:"thumbnailCanvas",style:{display:"none"}},J={__name:"brochures-and-catalogs",setup(R){const{api:c}=k();F({title:"Brochures & Catalogs",meta:[{name:"description",content:"Explore our Brochures & Catalogs"},{property:"og:title",content:"Brochures & Catalogs"},{property:"og:description",content:"Explore our Brochures & Catalogs"}],link:[{rel:"stylesheet",href:"/dearflip/dflip/css/dflip.min.css"}],script:[{src:"/dearflip/dflip/js/libs/jquery.min.js",id:"jquery-core-js"},{src:"/dearflip/dflip/js/libs/jquery-migrate.min.js",id:"jquery-migrate-js"},{src:"/dearflip/dflip/js/libs/imagesloaded.min.js",id:"imagesloaded-js"},{src:"/dearflip/dflip/js/libs/masonry.min.js",id:"masonry-js"},{src:"/dearflip/dflip/js/dflip.min.js",id:"dflip-script-js"},{src:"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"},{children:`
                window.dFlipLocation = "https://js.dearflip.com/wp-content/plugins/dflip/assets/";
                window.dFlipWPGlobal = ${JSON.stringify({text:{toggleSound:"Turn on/off Sound",toggleThumbnails:"Toggle Thumbnails",toggleOutline:"Toggle Outline/Bookmark",previousPage:"Previous Page",nextPage:"Next Page",toggleFullscreen:"Toggle Fullscreen",zoomIn:"Zoom In",zoomOut:"Zoom Out",toggleHelp:"Toggle Help",singlePageMode:"Single Page Mode",doublePageMode:"Double Page Mode",downloadPDFFile:"Download PDF File",gotoFirstPage:"Goto First Page",gotoLastPage:"Goto Last Page",share:"Share",search:"Search",print:"Print",mailSubject:"I wanted you to see this FlipBook",mailBody:"Check out this site {{ url()->current() }}",loading:"Loading"},viewerType:"flipbook",mobileViewerType:"auto",moreControls:"download,pageMode,startPage,endPage,sound",hideControls:"altPrev,altNext",leftControls:"outline,thumbnail",rightControls:"fullScreen,share,download,more",hideShareControls:"",scrollWheel:"true",backgroundColor:"rgb(229,229,229)",backgroundImage:"",height:"auto",paddingTop:"30",paddingBottom:"30",paddingLeft:"30",paddingRight:"30",controlsPosition:"bottom",controlsFloating:!0,direction:"1",duration:"800",soundEnable:"true",showDownloadControl:"true",showSearchControl:"false",showPrintControl:"false",enableAnalytics:"true",webgl:"true",hard:"none",autoEnableOutline:"false",autoEnableThumbnail:"false",pageScale:"fit",maxTextureSize:"3200",rangeChunkSize:"1048576",disableRange:!1,zoomRatio:"1.5",flexibility:"1",pageMode:"0",singlePageMode:"0",pageSize:"0",autoPlay:"false",autoPlayDuration:"5000",autoPlayStart:"false",linkTarget:"2",sharePrefix:"flipbook-",pdfVersion:"default",thumbLayout:"book-title-hover",targetWindow:"_popup",buttonClass:"",hasSpiral:!1,spiralColor:"#eee",cover3DType:"plain",color3DCover:"#aaaaaa",color3DSheets:"#fff",flipbook3DTiltAngleUp:"0",flipbook3DTiltAngleLeft:"0",autoPDFLinktoViewer:!1,sideMenuOverlay:!0,displayLightboxPlayIcon:!0,popupBackGroundColor:"#eee",shelfImage:"",enableAutoLinks:!1})}
            `}]});const{processDocuments:m,initializeDflip:f,documents:l,loading:n,error:i,handleRouteLeave:h}=L({thumbnailScale:.4,enableDflip:!0}),g=async()=>(await c.get("/api/get-media-center")).data.brochures;return w(async()=>{await m(g),f()}),P(h),(b,t)=>{const y=_,r=C;return s(),d("div",null,[e("main",M,[e("div",O,[e("div",q,[e("div",z,[e("div",E,[t[1]||(t[1]=e("h2",{class:"about-us-title"},"Brochures & Catalogs",-1)),j(y,{to:"/media",class:"btn btn-primary btn-round btn-shadow float-right"},{default:x(()=>t[0]||(t[0]=[e("i",{class:"icon-long-arrow-left"},null,-1),e("span",null,"Back to Media Center",-1)])),_:1}),t[2]||(t[2]=e("p",{class:"lead about-us-lead text-primary mb-1"}," Explore Our Brochures & Catalogs ",-1)),t[3]||(t[3]=e("p",{class:"about-us-text mb-2"},"Click on the documents to view",-1)),o(n)?(s(),u(r,{key:0,type:"loading","content-type":"Brochures & Catalogs"})):p("",!0),!o(l).length&&!o(n)&&o(i)==null?(s(),u(r,{key:1,type:"empty","content-type":"Brochures & Catalogs"})):p("",!0),o(i)&&!o(n)?(s(),u(r,{key:2,type:"error","error-sub-message":o(i).message,"content-type":"Brochures & Catalogs",onRetry:g},null,8,["error-sub-message"])):p("",!0),v(e("div",N,[(s(!0),d(B,null,D(o(l),a=>(s(),d("a",{id:`df_${a.id}`,key:a.id,href:`/media/brochures#${a.slug}/`,class:"_df_thumb","data-slug":a.slug,"data-title":a.name,"data-df-option":`df_option_${a.id}`,thumb:a.thumb},T(a.name),9,A))),128))],512),[[S,o(l).length]]),e("canvas",I,null,512)])])])])])])}}};export{J as default};