import{cg as o,r as c,h as f,g as d,B as v,bq as l,bp as h,ch as i,S as p}from"./DqP3LHpI.js";function I(t,a={}){const e=a.head||o();if(e)return e.ssr?e.push(t,a):m(e,t,a)}function m(t,a,e={}){const s=c(!1),n=c({});f(()=>{n.value=s.value?{}:i(a)});const r=t.push(n.value,e);return d(n,u=>{r.patch(u)}),p()&&(v(()=>{r.dispose()}),l(()=>{s.value=!0}),h(()=>{s.value=!1})),r}export{I as u};