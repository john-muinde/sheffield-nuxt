<template>
  <div class="container" :style="cssVars">
    <div class="row elements top-menu categories">
      <div
        v-for="(category, index) in mainCategories"
        :key="index.id"
        class="col-xs-3 col-sm-4 col-md-2 white-bg"
      >
        <NuxtLink
          class="element-type"
          :to="getCategoryLink(category.id, category.name, 1)"
        >
          <div class="element box">
            <p>
              <img
                class="menu-icon"
                :src="`/assets/images/menu-icons/${formattedName(
                  category.name
                )}.png`"
              />{{ category.name }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <div class="col-xs-3 col-sm-4 col-md-2 white-bg">
        <NuxtLink
          class="element-type NuxtLink-active active"
          to="/consultancy-and-design"
        >
          <div class="element box box2 box3">
            <p>
              <img
                class="menu-icon"
                src="/assets/images/menu-icons/consultancy-design.png"
              />Consultancy & Design
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div class="mobile-categories">
    <button
      id="menu1"
      class="btn btn-default dropdown-toggle button"
      type="button"
      data-toggle="dropdown"
    >
      BROWSE CATEGORIES <span class="caret"></span>
    </button>
    <ul
      class="dropdown-menu browse-categories mobile-menu"
      role="menu"
      aria-labelledby="menu1"
    >
      <li
        v-for="category in mainCategories"
        :key="category.id"
        role="presentation"
      >
        <NuxtLink
          class="element-type"
          :to="getCategoryLink(category.id, category.name, 1)"
        >
          <div class="sf-with-ul">
            <p class="category">
              <img
                class="mobile-menu-icon"
                :src="`/assets/images/menu-icons/${formattedName(
                  category.name
                )}.png`"
              />
              {{ category.name }}
            </p>
          </div>
        </NuxtLink>
      </li>

      <li role="presentation">
        <NuxtLink class="element-type" to="/consultancy-and-design">
          <div class="sf-with-ul">
            <p class="category">
              <img
                class="mobile-menu-icon"
                src="/assets/images/menu-icons/consultancy-design.png"
              />
              Consultancy & Design
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  segment: Object,
});

import { ref, onMounted } from "vue";

const { api } = useAxios();
const segment = ref(props.segment);
const mainCategories = ref([]);
const cssVars = ref({
  "--segment-primary-color": segment.value.color,
});

// Fetch products based on the current page
const fetchMainCategories = async () => {
  try {
    const response = await api.get(
      `/api/get-main-categories/${segment.value.id}`,
      {}
    );
    mainCategories.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getCategoryLink = (id, name, page) => {
  let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
  // Remove consecutive dashes
  transformedName = transformedName.replace(/-+/g, "-");
  // Remove leading and trailing dashes
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  // Convert to lowercase
  transformedName = transformedName.toLowerCase();

  return `/${segment.value.slug}/${id}/${transformedName}`;
};

onMounted(async () => {
  fetchMainCategories();
});

const formattedName = (category_name) => {
  return category_name.toLowerCase().replace(/\s/g, "-");
};
</script>

<style scoped>
.header-left > .category-dropdown {
  pointer-events: none;
}

.theClass1 {
  position: absolute;
  width: 94.8% !important;
}

.megamenu-scrollable {
  overflow-y: auto;
  direction: rtl;
}

.megamenu-container {
  direction: ltr;
}

.megamenu-scrollable::-webkit-scrollbar {
  width: 8px;
}

.megamenu-scrollable::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.megamenu-scrollable::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.menu-vertical .megamenu {
}

.scroll-track {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 16px;
  background-color: #f0f0f0;
}

.scroll-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  cursor: pointer;
  font-size: 16px;
}

.up-arrow {
  border-bottom: 1px solid #ccc;
}

.down-arrow {
  border-top: 1px solid #ccc;
}

.scroll-arrow:hover {
  background-color: #ccc;
  color: #fff;
}

.container {
  margin-top: 20px;
}

.box {
  height: 33px;
  background: var(--segment-primary-color);
  border-radius: 5px;
  margin-bottom: 5px;
  /* max-width: 330px; */
  border: 1px solid #9d9d9d;
}

.box p {
  font-size: 1.15rem;
  color: #ffffff;
}

.box2 {
  height: 33px;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 5px;
  /* max-width: 330px; */
  border: 1px solid var(--segment-primary-color);
}

.box3 {
  border: 3.5px dotted var(--segment-primary-color) !important;
}

.box2 p {
  font-size: 1.2rem;
  color: var(--segment-primary-color);
}

.elements {
  position: relative;
  /*background-image: url(/assets/images/sheffield_stainless_steel_background.jpg);*/
  background-size: cover;
  overflow: hidden;
  margin-bottom: 15px;
}

.NuxtLink-active .box p {
  color: var(--segment-primary-color);
}

.NuxtLink-active .box {
  background-color: #ffffff;
  border: 3.5px solid var(--segment-primary-color);
}

.NuxtLink-active .box2 p {
  color: var(--segment-primary-color);
}

.NuxtLink-active .box2 {
  background-color: #ffffff;
  border: 3.5px solid var(--segment-primary-color);
}

.mobile-categories {
  display: none;
  margin-top: -2rem;
}

.box .menu-icon {
  width: 15.5%;
  padding-left: 8px;
  padding-right: 8px;
  display: inline-block;
  filter: brightness(0.9) invert(1) sepia(0) hue-rotate(0deg) saturate(0);
}

.NuxtLink-active .box .menu-icon {
  filter: invert(20%) sepia(63%) saturate(3227%) hue-rotate(337deg)
    brightness(88%) contrast(94%);
}

.mobile-menu-icon {
  width: 35px;
  padding-left: 5px;
  padding-right: 10px;
  display: inline-block;
  filter: brightness(0.9) invert(1) sepia(0) hue-rotate(0deg) saturate(0);
}

@media only screen and (max-width: 768px) {
  .button {
    width: 100%;
    background: var(--segment-primary-color);
    color: #fff;
  }

  .browse-categories {
    width: 97%;
    padding: 0px;
    background-color: var(--segment-primary-color);
    margin-top: 3.5rem;
    border-radius: 0px;
  }

  .categories {
    display: none;
  }

  .category {
    color: #fff;
    font-size: 12px;
    font-weight: 500;
  }

  .mobile-categories .btn {
    font-weight: 600;
  }

  .mobile-menu li a {
    padding: 5px;
  }

  .mobile-categories {
    display: block;
    max-height: 100vh;
    overflow-y: auto;
  }
}

@media (max-width: 1367px) {
  .box p {
    font-size: 1rem;
  }
}

/* @media only screen and (max-width: 768px) {
    .categories {
        display: none;
    }

    .mobile-categories {
        display: block;
        max-height: 100vh;
        overflow-y: auto;
    }
} */
</style>
