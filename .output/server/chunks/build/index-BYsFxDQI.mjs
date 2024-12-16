import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../_/nitro.mjs';
import 'consola/core';
import 'nuxt-site-config/urls';
import 'ipx';
import 'pinia';
import 'unhead';
import 'vue-router';
import 'ant-design-vue';
import 'axios';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper" }, _attrs))}><main class="main"><div class="page-header text-center" style="${ssrRenderStyle({ "background-image": "url('/assets/images/sheffield_stainless_steel_background.jpg')" })}"><div class="container"><h1 class="page-title"> My Account<span>Manage Your Orders, Preferences, and Personal Information</span></h1></div></div><div class="page-content mt-3"><div class="dashboard"><div class="container"><div class="row"><aside class="col-md-4 col-lg-3"><ul class="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist"><li class="nav-item"><a id="tab-dashboard-link" class="nav-link active" data-toggle="tab" href="#tab-dashboard" role="tab" aria-controls="tab-dashboard" aria-selected="true">Dashboard</a></li><li class="nav-item"><a id="tab-orders-link" class="nav-link" data-toggle="tab" href="#tab-orders" role="tab" aria-controls="tab-orders" aria-selected="false">Orders</a></li><li class="nav-item"><a id="tab-address-link" class="nav-link" data-toggle="tab" href="#tab-address" role="tab" aria-controls="tab-address" aria-selected="false"> Adresses</a></li><li class="nav-item"><a id="tab-account-link" class="nav-link" data-toggle="tab" href="#tab-account" role="tab" aria-controls="tab-account" aria-selected="false">Account Details</a></li><li class="nav-item"><a class="nav-link" href="#">Sign Out</a></li></ul></aside><div class="col-md-8 col-lg-9"><div class="tab-content"><div id="tab-dashboard" class="tab-pane fade show active" role="tabpanel" aria-labelledby="tab-dashboard-link"><p> Hello <span class="font-weight-normal text-dark">User</span> (not <span class="font-weight-normal text-dark">User</span>? <a href="#">Log out</a>) <br> From your account dashboard you can view your <a href="#tab-orders" class="tab-trigger-link link-underline">recent orders</a>, manage your <a href="#tab-address" class="tab-trigger-link">shipping and billing addresses</a>, and <a href="#tab-account" class="tab-trigger-link">edit your password and account details</a>. </p></div><div id="tab-orders" class="tab-pane fade" role="tabpanel" aria-labelledby="tab-orders-link"><p>No order has been made yet.</p><a href="category.html" class="btn btn-outline-primary-2"><span>GO SHOP</span><i class="icon-long-arrow-right"></i></a></div><div id="tab-address" class="tab-pane fade" role="tabpanel" aria-labelledby="tab-address-link"><p> The following addresses will be used on the checkout page by default. </p><div class="row"><div class="col-lg-6"><div class="card card-dashboard"><div class="card-body"><h3 class="card-title"> Billing Address </h3><p> User Name<br> User Company<br> John str<br> Nairobi,Kenya<br> +254716370730<br><a href="#" class="__cf_email__" data-cfemail="c7bea8b2b5aaa6aeab87aaa6aeabe9a4a8aa">[email\xA0protected]</a><br><a href="#">Edit <i class="icon-edit"></i></a></p></div></div></div><div class="col-lg-6"><div class="card card-dashboard"><div class="card-body"><h3 class="card-title"> Shipping Address </h3><p> You have not set up this type of address yet.<br><a href="#">Edit <i class="icon-edit"></i></a></p></div></div></div></div></div><div id="tab-account" class="tab-pane fade" role="tabpanel" aria-labelledby="tab-account-link"><form action="#"><div class="row"><div class="col-sm-6"><label>First Name *</label><input type="text" class="form-control" required=""></div><div class="col-sm-6"><label>Last Name *</label><input type="text" class="form-control" required=""></div></div><label>Display Name *</label><input type="text" class="form-control" required=""><small class="form-text">This will be how your name will be displayed in the account section and in reviews</small><label>Email address *</label><input type="email" class="form-control" required=""><label>Current password (leave blank to leave unchanged)</label><input type="password" class="form-control"><label>New password (leave blank to leave unchanged)</label><input type="password" class="form-control"><label>Confirm new password</label><input type="password" class="form-control mb-2"><button type="submit" class="btn btn-outline-primary-2"><span>SAVE CHANGES</span><i class="icon-long-arrow-right"></i></button></form></div></div></div></div></div></div></div></main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-BYsFxDQI.mjs.map