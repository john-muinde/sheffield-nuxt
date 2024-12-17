import { reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import VueEasyLightbox from 'vue-easy-lightbox';
import { defineRule, useForm, useField } from 'vee-validate';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { u as useVueRecaptcha } from './useVueRecaptcha-Dk53wG_R.mjs';
import { r as required, m as min } from './rules-D_52UAQM.mjs';
import { useRouter } from 'vue-router';
import { Modal } from 'ant-design-vue';
import { _ as _export_sfc, k as useAxios, B as apiRequest } from './server.mjs';
import 'vue-recaptcha-v3';
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
import 'axios';

function useCareers() {
  const careers2 = ref([]);
  const careerList = ref([]);
  const career = ref({
    title: "",
    department: "",
    location: "",
    education: "",
    experience: "",
    deadline: "",
    description: "",
    responsibilities: "",
    requirements: "",
    is_published: ""
  });
  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);
  const getCareers = async (page = 1, search_id = "", search_title = "", search_global = "", order_column = "created_at", order_direction = "desc") => {
    try {
      const response = await apiRequest(
        "get",
        `/api/careers?page=${page}&search_id=${search_id}&search_title=${search_title}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`
      );
      careers2.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };
  const getCareer = async (id) => {
    try {
      const response = await apiRequest("get", `/api/careers/${id}`);
      career.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };
  const storeCareer = async (career2) => {
    if (isLoading.value) return;
    isLoading.value = true;
    validationErrors.value = {};
    let serializedPost = new FormData();
    for (let item in career2) {
      if (career2.hasOwnProperty(item)) {
        serializedPost.append(item, career2[item]);
      }
    }
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    try {
      await apiRequest("post", "/api/careers", serializedPost, config);
      router.push({ name: "careers.create" });
      Object.keys(career2).forEach((key) => career2[key] = "");
      showToast("success", "Career saved successfully");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };
  const updateCareer = async (career2) => {
    if (isLoading.value) return;
    isLoading.value = true;
    validationErrors.value = {};
    let serializedPost = new FormData();
    for (let item in career2) {
      if (career2.hasOwnProperty(item)) {
        serializedPost.append(item, career2[item]);
      }
    }
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    try {
      await apiRequest(
        "put",
        `/api/careers/${career2.id}`,
        serializedPost,
        config
      );
      router.push({ name: "careers.index" });
      showToast("success", "Career updated successfully");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };
  const deleteCareer = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        try {
          await apiRequest("delete", `/api/careers/${id}`);
          getCareers();
          router.push({ name: "careers.index" });
          showToast("success", "Career deleted successfully");
        } catch (errors) {
          showToast("error", "Something went wrong");
        }
      }
    });
  };
  const getCareerList = async () => {
    try {
      const response = await apiRequest("get", "/api/career-list");
      careerList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };
  return {
    careerList,
    careers: careers2,
    career,
    getCareers,
    getCareerList,
    getCareer,
    storeCareer,
    updateCareer,
    deleteCareer,
    validationErrors,
    isLoading
  };
}
const _sfc_main = {
  __name: "careers",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Careers",
      meta: [
        {
          name: "description",
          content: "Sheffield Africa is an equal opportunity employer with opportunities to guide your career. We are always sourcing for problem solvers and creative thinkers from engineers to sales and marketing personnel. Put your talents to use where opportunities are limitless and every day makes a difference. Whether you\u2019re an experienced professional or a recent graduate, working with Sheffield Africa will be a rewarding experience that will grow your career."
        }
      ]
    });
    useVueRecaptcha();
    defineRule("required", required);
    defineRule("min", min);
    const schema = {
      name: "required|min:3",
      phone_number: "required",
      email: "required|min:3",
      message: "required",
      job_title: "required"
    };
    useForm({ validationSchema: schema });
    const { value: name } = useField("name", null, { initialValue: "" });
    const { value: phone_number } = useField("phone_number", null, {
      initialValue: ""
    });
    const { value: email } = useField("email", null, { initialValue: "" });
    const { value: message } = useField("message", null, { initialValue: "" });
    const { value: job_title } = useField("job_title", null, { initialValue: "" });
    useField("cv", null, { initialValue: "" });
    useField("supporting_document", null, {
      initialValue: ""
    });
    const { storeCareer, validationErrors, isLoading } = useCareers();
    const career = reactive({
      name,
      phone_number,
      email,
      message,
      job_title,
      cv: "",
      supporting_document: ""
    });
    useAxios();
    const imgs = ref([]);
    const visible = ref(false);
    const indexRef = ref(0);
    const handleHide = () => {
      visible.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-03399fd9><div class="page-content pg-white" data-v-03399fd9><div class="container" data-v-03399fd9><div class="pg-white" data-v-03399fd9><div class="mb-lg-5" data-v-03399fd9><div class="container" data-v-03399fd9><div class="row no-margin" data-v-03399fd9><div class="col-lg-12 justify-content-center mt-1" data-v-03399fd9><h2 class="about-us-title" data-v-03399fd9>Careers at Sheffield</h2><div class="row mt-3 graduate-intake hex-section-career" data-v-03399fd9><div class="col-lg-12 mb-3" data-v-03399fd9><p class="who-we-are-p" data-v-03399fd9> Sheffield Africa is an equal opportunity employer with opportunities to guide your career. We are always sourcing for problem solvers and creative thinkers from engineers to sales and marketing personnel. Put your talents to use where opportunities are limitless and every day makes a difference. Whether you\u2019re an experienced professional or a recent graduate, working with Sheffield Africa will be a rewarding experience that will grow your career. </p></div><div class="col-lg-12" data-v-03399fd9><div class="grid" data-v-03399fd9><ul id="hexGrid" data-v-03399fd9><li class="hex" data-v-03399fd9><div class="hexIn" data-v-03399fd9><div class="hexLink" data-v-03399fd9><div class="img" style="${ssrRenderStyle({ "background-image": "url(assets/images/welding.jpg)" })}" data-v-03399fd9></div><span id="demo2" data-v-03399fd9>Technical</span></div></div></li><li class="hex" data-v-03399fd9><div class="hexIn" data-v-03399fd9><div class="hexLink" data-v-03399fd9><div class="img" style="${ssrRenderStyle({ "background-image": "url(/assets/images/human_resource.jpg)" })}" data-v-03399fd9></div><span id="demo2" data-v-03399fd9>Admin</span></div></div></li><li class="hex" data-v-03399fd9><div class="hexIn" data-v-03399fd9><div class="hexLink" data-v-03399fd9><div class="img" style="${ssrRenderStyle({ "background-image": "url(assets/images/our_staff.jpg)" })}" data-v-03399fd9></div><span id="demo2" data-v-03399fd9>Engineering</span></div></div></li><li class="hex" data-v-03399fd9><div class="hexIn" data-v-03399fd9><div class="hexLink" data-v-03399fd9><div class="img" style="${ssrRenderStyle({ "background-image": "url(assets/images/homepage/sheffield_engineer.jpg)" })}" data-v-03399fd9></div><span id="demo2" data-v-03399fd9>Design</span></div></div></li><li class="hex" data-v-03399fd9><div class="hexIn" data-v-03399fd9><div class="hexLink" data-v-03399fd9><div class="img" style="${ssrRenderStyle({ "background-image": "url(/assets/images/sales_and_marketing.jpg)" })}" data-v-03399fd9></div><span id="demo2" data-v-03399fd9>Sales &amp; Marketing</span></div></div></li></ul></div></div></div></div></div></div></div></div><div class="pg-white who-we-are-section" data-v-03399fd9><div class="overlay" data-v-03399fd9></div><div class="pt-5 pb-2" data-v-03399fd9><div class="container" data-v-03399fd9><div class="row" data-v-03399fd9><div class="col-md-12" data-v-03399fd9><div class="row" data-v-03399fd9><div class="col-lg-8 offset-lg-1 who-we-are" data-v-03399fd9><h5 class="mt-2" data-v-03399fd9>Benefits</h5><ul class="graduate-trainee-program" data-v-03399fd9><li data-v-03399fd9><i class="icon-check" data-v-03399fd9></i> Transformative experience throughout the career journey </li><li data-v-03399fd9><i class="icon-check" data-v-03399fd9></i> Diverse &amp; inclusive working environment </li><li data-v-03399fd9><i class="icon-check" data-v-03399fd9></i> Opportunity to impact on client experience through innovative solutions </li><li data-v-03399fd9><i class="icon-check" data-v-03399fd9></i> We support your growth &amp; learning opportunities </li><li data-v-03399fd9><i class="icon-check" data-v-03399fd9></i> Strong mentorship under experienced industry leaders </li></ul></div></div></div></div></div></div></div><div data-v-03399fd9>`);
      _push(ssrRenderComponent(unref(VueEasyLightbox), {
        "esc-disabled": "",
        visible: visible.value,
        imgs: imgs.value,
        index: indexRef.value,
        onHide: handleHide
      }, null, _parent));
      _push(`</div><div class="pg-white who-we-are-section" data-v-03399fd9><div class="overlay" data-v-03399fd9></div><div class="pt-5 pb-2" data-v-03399fd9><div class="container" data-v-03399fd9><div class="row" data-v-03399fd9><div class="col-md-12" data-v-03399fd9><div class="row" data-v-03399fd9><div id="fill_fomr" class="col-lg-10 offset-lg-1 who-we-are" data-v-03399fd9><h2 class="about-us-title mb-4" data-v-03399fd9> Interested in joining us </h2><p class="about-us-text" data-v-03399fd9> Fill the form below with your details and click submit. </p><div class="row" data-v-03399fd9><div class="offset-lg-1 col-md-10 register-right mt-2" data-v-03399fd9><div id="myTabContent" class="" data-v-03399fd9><div id="home" class="" role="tabpanel" aria-labelledby="home-tab" data-v-03399fd9><form data-v-03399fd9><div class="row register-form" data-v-03399fd9><div class="form-group col-md-6" data-v-03399fd9><label for="" class="label" data-v-03399fd9><b data-v-03399fd9>Name</b></label><input${ssrRenderAttr("value", career.name)} required type="text" class="form-control" placeholder="Name *" data-v-03399fd9></div><div class="form-group col-md-6" data-v-03399fd9><label for="" class="label" data-v-03399fd9><b data-v-03399fd9>Phone Number</b></label><input${ssrRenderAttr("value", career.phone_number)} required type="text" class="form-control" placeholder="Phone Number *" data-v-03399fd9></div><div class="form-group col-md-6" data-v-03399fd9><label for="" class="label" data-v-03399fd9><b data-v-03399fd9>Email</b></label><input${ssrRenderAttr("value", career.email)} required type="email" class="form-control" placeholder="Email *" data-v-03399fd9></div><div class="form-group col-md-6" data-v-03399fd9><label for="" class="label" data-v-03399fd9><b data-v-03399fd9>Job Title/Position</b></label><input${ssrRenderAttr("value", career.job_title)} required type="text" class="form-control" placeholder="Job Title *" data-v-03399fd9></div><div class="form-group col-md-12" data-v-03399fd9><label for="" class="label" data-v-03399fd9><b data-v-03399fd9>Message</b></label><textarea required placeholder="Write your message here ..." class="form-control" data-v-03399fd9>${ssrInterpolate(career.message)}</textarea></div><div class="form-group col-md-6" data-v-03399fd9><label for="" class="label" data-v-03399fd9><b data-v-03399fd9>Attach CV</b></label><input required type="file" class="form-control" placeholder="Attach CV *" data-v-03399fd9></div><div class="form-group col-md-6" data-v-03399fd9><label for="" class="label" data-v-03399fd9><b data-v-03399fd9>Supporting Document</b></label><input required type="file" class="form-control" placeholder="Supporting Document *" data-v-03399fd9></div><div class="col-md-12 form-group mt-2" data-v-03399fd9><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="btn btn-primary btn-minwidth-sm" data-v-03399fd9><div style="${ssrRenderStyle(unref(isLoading) ? null : { display: "none" })}" class="" data-v-03399fd9></div>`);
      if (unref(isLoading)) {
        _push(`<span data-v-03399fd9>Processing...</span>`);
      } else {
        _push(`<span data-v-03399fd9>SUBMIT YOUR CV</span>`);
      }
      _push(`<i class="icon-long-arrow-right" data-v-03399fd9></i></button></div></div></form></div></div></div></div></div></div></div></div></div></div></div></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/careers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const careers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03399fd9"]]);

export { careers as default };
//# sourceMappingURL=careers-CntPUc8s.mjs.map
