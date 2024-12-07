import{_ as a,o as n,c as i,a as t,q as r,d}from"./CvmJwppT.js";const c={data(){return{isAnimating:!1,primaryColor:"#c02434",gradientStart:"#e74c5d",gradientEnd:"#a11d2a",borderColor:"#7c1520"}},computed:{titleColor(){return"text-rose-900"},subtitleColor(){return"text-rose-800"},buttonClasses(){return["bg-rose-600","text-white","hover:bg-rose-700",{"animate-pulse":this.isAnimating}]}},methods:{handleRetry(){this.isAnimating=!0,setTimeout(()=>{this.isAnimating=!1},1500)}}},u={class:"flex flex-col items-center justify-center min-h-[400px] p-6 bg-gradient-to-br from-rose-50 to-rose-100 w-full"},h={class:"text-center"},m={id:"giftGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%"},p=["stop-color"],x=["stop-color"],f=["stroke"],g=["stroke"],_=["stroke"],w=["stroke"];function k(b,e,y,C,o,s){return n(),i("div",u,[t("div",h,[(n(),i("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 400 300",class:r(["mx-auto mb-6 w-64 h-64",{"animate-bounce":o.isAnimating}])},[t("defs",null,[t("linearGradient",m,[t("stop",{offset:"0%","stop-color":o.gradientStart,"stop-opacity":"1"},null,8,p),t("stop",{offset:"100%","stop-color":o.gradientEnd,"stop-opacity":"1"},null,8,x)])]),t("path",{d:"M100 120 L200 50 L300 120 L300 250 L100 250 Z",fill:"url(#giftGradient)",stroke:o.borderColor,"stroke-width":"4"},null,8,f),t("path",{d:"M100 120 L200 190 L300 120",fill:"none",stroke:o.borderColor,"stroke-width":"4"},null,8,g),t("circle",{cx:"200",cy:"85",r:"20",fill:"#FFFFFF",stroke:o.borderColor,"stroke-width":"4"},null,8,_),t("path",{d:"M190 85 L210 85 M200 75 L200 95",stroke:o.borderColor,"stroke-width":"3"},null,8,w)],2)),t("h2",{class:r(["text-2xl font-bold mb-4",s.titleColor])}," Exciting Promotions Coming Soon! ",2),t("p",{class:r(["max-w-md mx-auto mb-6",s.subtitleColor])}," We're crafting something extraordinary just for you. Stay tuned for exclusive deals that'll make your day! ",2),t("button",{onClick:e[0]||(e[0]=(...l)=>s.handleRetry&&s.handleRetry(...l)),class:r(["flex items-center justify-center mx-auto px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl",s.buttonClasses])},[(n(),i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:r(["mr-2",{"animate-spin":o.isAnimating}])},e[1]||(e[1]=[t("path",{d:"M23 4v6h-6"},null,-1),t("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"},null,-1)]),2)),e[2]||(e[2]=d(" Check Again "))],2)])])}const L=a(c,[["render",k]]);export{L as _};