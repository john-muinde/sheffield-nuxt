import{_ as v}from"./dUgdr07b.js";import{u as f,g as h,r as w}from"./B1-weQWx.js";import{a as b}from"./CsmmXB_I.js";import{e as y,r as C,o as d,c as i,b as a,w as r,a as t,t as n,F as x,p as k,i as c,$ as L,d as q,B}from"./CvmJwppT.js";const V={class:"dropdown cart-dropdown"},F={class:"cart-count"},N={class:"dropdown-menu dropdown-menu-right"},R={class:"dropdown-cart-products"},T={class:"flex items-center space-x-4"},z=["src","alt"],A={class:"font-semibold text-gray-800"},P={class:"text-sm text-gray-500"},j={class:"text-gray-500"},H=["onClick"],I={class:"dropdown-cart-action"},G={__name:"CartComponent",setup(M){const m=f(),u=y(()=>m.cartItems),p=C(!1),g=()=>{document.body.classList.toggle("mmenu-active"),p.value=!p.value};return(e,s)=>{const l=v;return d(),i("div",V,[a(l,{to:"/request-for-quote",class:"dropdown-toggle",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false","data-display":"static"},{default:r(()=>{var o;return[s[0]||(s[0]=t("i",{class:"icon-shopping-cart"},null,-1)),t("span",F,n((o=u.value)==null?void 0:o.length),1),s[1]||(s[1]=t("span",{class:"cart-txt"},"Cart",-1))]}),_:1}),t("div",N,[t("div",R,[a(L,{name:"cart-item",tag:"div",class:"space-y-3"},{default:r(()=>[(d(!0),i(x,null,k(u.value,(o,_)=>(d(),i("div",{key:o.id,class:"flex items-center justify-between bg-white shadow-sm border border-gray-100 p-4 rounded-lg hover:shadow-md transition-all duration-300"},[a(l,{to:("getProductLink"in e?e.getProductLink:c(h))(o)},{default:r(()=>[t("div",T,[t("img",{src:("assets"in e?e.assets:c(b))(o.main_image_path),alt:o.name,class:"w-16 h-16 object-cover rounded-md border"},null,8,z),t("div",null,[t("span",A,n(o.name),1),t("p",P,n(o.category),1),t("span",j,"Qty: "+n(o.quantity),1)])])]),_:2},1032,["to"]),t("button",{class:"text-red-500 hover:bg-red-100 p-2 rounded-full transition-all duration-300 group",onClick:Q=>("removeFromCart"in e?e.removeFromCart:c(w))(_)},s[2]||(s[2]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 group-hover:scale-110",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{fillRule:"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})],-1)]),8,H)]))),128))]),_:1}),t("div",I,[a(l,{to:"/request-for-quote",class:"btn btn-primary mt-2 float-right",style:{color:"white"}},{default:r(()=>s[3]||(s[3]=[q(" Request for Quote ")])),_:1})])])]),t("button",{class:"mobile-menu-toggler",onClick:g},s[4]||(s[4]=[t("span",{class:"sr-only"},"Toggle mobile menu",-1),t("i",{class:"icon-bars"},null,-1)]))])}}},U=B("/assets/images/logo.png");export{U as _,G as a};