<template>
  <header class="header header-6 header-transparent desktop-header">
    <div class="header-middle mt-2">
      <div class="container">
        <div class="header-left">
          <div
            class="header-search header-search-extended header-search-visible d-none d-lg-block"
          >
            <a href="#" class="search-toggle" role="button"
              ><i class="icon-search"></i
            ></a>
            <form action="#" method="get">
              <div
                class="header-search-wrapper search-wrapper-wide searchListMainDiv"
              >
                <label for="q" class="sr-only">Search</label>
                <button class="btn btn-primary" type="submit">
                  <i class="icon-search"></i>
                </button>
                <input
                  v-model="query"
                  type="search"
                  class="form-control"
                  name="q"
                  autocomplete="off"
                  placeholder="Search product ..."
                  required=""
                  @input="search"
                />
                <ul v-if="showResults" class="">
                  <li v-for="result in results" :key="result.id">
                    <NuxtLink :to="getProductLink(result)">
                      <img
                        style="display: inline"
                        width="28"
                        :src="assetsSync(result.main_image_path)"
                        class="rounded profile-img"
                        alt=""
                      />
                      {{ result.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <!-- End .header-search-wrapper -->
            </form>
          </div>
          <!-- End .header-search -->
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="logo">
            <img
              src="/assets/images/logo.png"
              alt="Sheffield Logo"
              width="245"
              height="auto"
            />
          </NuxtLink>
        </div>
        <!-- End .header-left -->

        <div class="header-right">
          <!-- <a class="header_phone" href="tel:+254713777111">+254 713 777 111</a> -->
          <!-- <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        ><i
                            class="icon-telegram-plane"
                            style="font-size: 40px"
                        ></i>
                        Contact Us</a
                    > -->

          <button class="mobile-menu-toggler" @click="handleButtonClick">
            <span class="sr-only">Toggle mobile menu</span>
            <i class="icon-bars"></i>
          </button>
        </div>
      </div>
      <!-- End .container -->
    </div>
    <!-- End .header-middle -->
  </header>

  <header class="header header-6 mobile-header">
    <div class="header-middle">
      <div class="container">
        <div class="header-left">
          <div
            class="header-search header-search-extended header-search-visible d-none d-lg-block"
          >
            <a href="#" class="search-toggle" role="button"
              ><i class="icon-search"></i
            ></a>
            <form action="#" method="get">
              <div
                class="header-search-wrapper search-wrapper-wide searchListMainDiv"
              >
                <label for="q" class="sr-only">Search</label>
                <button class="btn btn-primary" type="submit">
                  <i class="icon-search"></i>
                </button>
                <input
                  id="q"
                  v-model="query"
                  type="search"
                  class="form-control"
                  name="q"
                  autocomplete="off"
                  placeholder="Search product ..."
                  required=""
                  @input="search"
                />
                <ul v-if="showResults" class="">
                  <li v-for="result in results" :key="result.id">
                    <NuxtLink :to="getProductLink(result)">
                      <img
                        style="display: inline"
                        width="28"
                        :src="assetsSync(result.main_image_path)"
                        class="rounded profile-img"
                        alt=""
                      />
                      {{ result.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <!-- End .header-search-wrapper -->
            </form>
          </div>
          <!-- End .header-search -->
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="logo">
            <img
              src="/assets/images/logo.png"
              alt="Sheffield Logo"
              width="245"
              height="auto"
            />
          </NuxtLink>
        </div>
        <!-- End .header-left -->

        <div class="header-right">
          <!-- <a class="header_phone" href="tel:+254713777111">+254 713 777 111</a> -->
          <button
            id="mobile-menu-toggler"
            class="mobile-menu-toggler"
            @click="addClassToBody"
          >
            <span class="sr-only">Toggle mobile menu</span>
            <i class="icon-bars"></i>
          </button>
        </div>
      </div>
      <!-- End .container -->
    </div>
    <!-- End .header-middle -->
  </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick, watch } from "vue";

const { api } = useAxios();

const query = ref("");
const results = ref([]);
const showResults = ref(false);

const search = async () => {
  if (query.value.length >= 3) {
    try {
      const response = await api.get("/api/product_search" + `/${query.value}`);
      results.value = response.data.data;
      //
      showResults.value = true;
      //
    } catch (error) {
      //console.error(error);
    }
  } else {
    results.value = [];
    showResults.value = false;
  }
};

const bodyClassAdded = ref(true);

// Function to toggle the class on document.body
const addClassToBody = () => {
  //bodyClassAdded.value = !bodyClassAdded.value;
  document.body.classList.toggle("mmenu-active", bodyClassAdded.value);
};

onMounted(() => {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.toggle("mmenu-active1", true);
  });
});

const handleButtonClick = () => {
  addClassToBody();
};
</script>
