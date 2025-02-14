<!-- eslint-disable no-console -->
<template>
  <!-- Mobile Menu -->
  <div class="mobile-menu-overlay" @click="closeMenu"></div>

  <div class="mobile-menu-container" :class="{ active: isMenuActive }">
    <div class="mobile-menu-wrapper">
      <span class="mobile-menu-close mobile-menu-toggler" @click="toggleMenu">
        <i class="icon-close"></i>
      </span>

      <ul class="nav nav-pills-mobile" role="tablist">
        <li class="nav-item">
          <button
            id="mobile-menu-link"
            class="nav-link"
            :class="{ active: currentTab === 'menu' }"
            data-toggle="tab"
            @click="currentTab = 'menu'"
            role="tab"
            aria-controls="mobile-menu-tab"
            aria-selected="true"
          >
            Menu
          </button>
        </li>
        <li class="nav-item">
          <button
            id="mobile-cats-link"
            class="nav-link"
            data-toggle="tab"
            :class="{ active: currentTab === 'cats' }"
            @click="currentTab = 'cats'"
            role="tab"
            aria-controls="mobile-cats-tab"
            aria-selected="false"
          >
            Solutions
          </button>
        </li>
      </ul>

      <div class="tab-content">
        <div
          id="mobile-menu-tab"
          class="tab-pane fade"
          :class="{ 'show active': currentTab === 'menu' }"
          role="tabpanel"
          aria-labelledby="mobile-menu-link"
        >
          <nav class="mobile-nav">
            <ul class="mobile-menu">
              <li class="active">
                <NuxtLink to="/" @click="closeMenu"> Home </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/commercial-kitchen" class="sf-with-ul">
                  Kitchen
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="category in data.kitchen.categories"
                    :key="category.id"
                  >
                    <NuxtLink
                      :to="
                        generateLink(
                          '/commercial-kitchen',
                          category.id,
                          category.name
                        )
                      "
                      @click="closeMenu"
                    >
                      {{ category.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                <NuxtLink to="/laundry" class="sf-with-ul">
                  LAUNDRY & FLOOR CLEANING
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="category in data.laundry.categories"
                    :key="category.id"
                  >
                    <NuxtLink
                      :to="generateLink('/laundry', category.id, category.name)"
                      @click="closeMenu"
                    >
                      {{ category.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                <NuxtLink to="/cold-storage" class="sf-with-ul">
                  Cold Storage
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="category in data.coldRoom.categories"
                    :key="category.id"
                  >
                    <NuxtLink
                      :to="
                        generateLink(
                          '/cold-storage',
                          category.id,
                          category.name
                        )
                      "
                      @click="closeMenu"
                    >
                      {{ category.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li v-if="data.promotional?.categories?.length">
                <NuxtLink to="/promotional-solutions" class="sf-with-ul">
                  Promotions
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="category in data.promotional.categories"
                    :key="category.id"
                  >
                    <NuxtLink
                      :to="
                        generateLink(
                          '/promotional-solutions',
                          category.id,
                          category.name
                        )
                      "
                      @click="closeMenu"
                    >
                      {{ category.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                <NuxtLink
                  to="/consultancy-and-design"
                  class="sf-with-ul"
                  @click="closeMenu"
                >
                  Consultancy & Design
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/kitchen-smalls"
                  class="sf-with-ul"
                  @click="closeMenu"
                >
                  Kitchen Smalls
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about-us" class="sf-with-ul" @click="closeMenu">
                  About Us
                </NuxtLink>
              </li>

              <li>
                <NuxtLink
                  to="/about-us/sheffield-advantage"
                  class="sf-with-ul"
                  @click="closeMenu"
                >
                  Sheffield Advantages
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/projects" class="sf-with-ul" @click="closeMenu">
                  Project References
                </NuxtLink>
              </li>

              <li>
                <NuxtLink to="/events" class="sf-with-ul" @click="closeMenu">
                  Events
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/careers" class="sf-with-ul" @click="closeMenu">
                  Careers
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/faq" class="sf-with-ul" @click="closeMenu">
                  FAQ
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/media" class="sf-with-ul" @click="closeMenu">
                  Media Center
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/contact-us"
                  class="sf-with-ul"
                  @click="closeMenu"
                >
                  Contact us
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <!-- .End .tab-pane -->
        <div
          id="mobile-cats-tab"
          class="tab-pane fade"
          :class="{ 'show active': currentTab === 'cats' }"
          role="tabpanel"
          aria-labelledby="mobile-cats-link"
        >
          <nav class="mobile-cats-nav">
            <ul class="mobile-menu">
              <li>
                <NuxtLink to="/commercial-kitchen" class="sf-with-ul">
                  KITCHEN SOLUTIONS
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="solution in data.kitchen.solutions"
                    :key="solution.id"
                  >
                    <NuxtLink
                      :to="
                        generateLink(
                          '/commercial-kitchen/solutions',
                          solution.id,
                          solution.name
                        )
                      "
                      @click="closeMenu"
                    >
                      {{ solution.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                <NuxtLink to="/laundry" class="sf-with-ul">
                  LAUNDRY & FLOOR CLEANING SOLUTIONS
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="solution in data.laundry.solutions"
                    :key="solution.id"
                  >
                    <NuxtLink
                      :to="
                        generateLink(
                          '/laundry/solutions',
                          solution.id,
                          solution.name
                        )
                      "
                      @click="closeMenu"
                    >
                      {{ solution.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                <NuxtLink to="/cold-storage" class="sf-with-ul">
                  COLD STORAGE SOLUTIONS
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="solution in data.coldRoom.solutions"
                    :key="solution.id"
                  >
                    <NuxtLink
                      :to="
                        generateLink(
                          '/cold-storage/solutions',
                          solution.id,
                          solution.name
                        )
                      "
                      @click="closeMenu"
                    >
                      {{ solution.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li v-if="data.promotional?.solutions?.length">
                <NuxtLink to="/promotional-solutions" class="sf-with-ul">
                  PROMOTIONAL SOLUTIONS
                  <ChevronDown
                    class="chevron-icon"
                    @click="toggleSubMenu($event)"
                  />
                </NuxtLink>
                <ul class="submenu">
                  <li
                    v-for="solution in data.promotional.solutions"
                    :key="solution.id"
                  >
                    <NuxtLink
                      :to="
                        generateLink(
                          `/promotional-solutions`,
                          solution.id,
                          solution.name
                        )
                      "
                      @click="closeMenu"
                    >
                      {{ solution.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <!-- .End .tab-pane -->
      </div>
    </div>
  </div>

  <!-- Sign in / Register Modal -->
  <div
    id="signin-modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true"><i class="icon-close"></i></span>
          </button>

          <div class="form-box">
            <div class="form-tab">
              <ul class="nav nav-pills nav-fill" role="tablist">
                <li class="nav-item">
                  <a
                    id="signin-tab"
                    class="nav-link active"
                    data-toggle="tab"
                    href="#signin"
                    role="tab"
                    aria-controls="signin"
                    aria-selected="true"
                    >Sign In</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    id="register-tab"
                    class="nav-link"
                    data-toggle="tab"
                    href="#register"
                    role="tab"
                    aria-controls="register"
                    aria-selected="false"
                    >Register</a
                  >
                </li>
              </ul>
              <div id="tab-content-5" class="tab-content">
                <div
                  id="signin"
                  class="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="signin-tab"
                >
                  <form action="#">
                    <div class="form-group">
                      <label for="signin-email"
                        >Username or email address *</label
                      >
                      <input
                        id="signin-email"
                        type="text"
                        class="form-control"
                        autocomplete="username"
                        name="signin-email"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="signin-password">Password *</label>
                      <input
                        id="signin-password"
                        type="password"
                        class="form-control"
                        name="signin-password"
                        autocomplete="current-password"
                        required
                      />
                    </div>

                    <div class="form-footer">
                      <button type="submit" class="btn btn-outline-primary-2">
                        <span>LOG IN</span>
                        <i class="icon-long-arrow-right"></i>
                      </button>

                      <div class="custom-control custom-checkbox">
                        <input
                          id="signin-remember"
                          type="checkbox"
                          class="custom-control-input"
                        />
                        <label
                          class="custom-control-label"
                          for="signin-remember"
                          >Remember Me</label
                        >
                      </div>

                      <a href="#" class="forgot-link">Forgot Your Password?</a>
                    </div>
                  </form>
                </div>
                <!-- .End .tab-pane -->
                <div
                  id="register"
                  class="tab-pane fade"
                  role="tabpanel"
                  aria-labelledby="register-tab"
                >
                  <form action="#">
                    <div class="form-group">
                      <label for="register-email">Your email address *</label>
                      <input
                        id="register-email"
                        type="email"
                        class="form-control"
                        autocomplete="username"
                        name="register-email"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="register-password">Password *</label>
                      <input
                        id="register-password"
                        type="password"
                        class="form-control"
                        autocomplete="current-password"
                        name="register-password"
                        required
                      />
                    </div>

                    <div class="form-footer">
                      <button type="submit" class="btn btn-outline-primary-2">
                        <span>SIGN UP</span>
                        <i class="icon-long-arrow-right"></i>
                      </button>

                      <div class="custom-control custom-checkbox">
                        <input
                          id="register-policy"
                          type="checkbox"
                          class="custom-control-input"
                          required
                        />
                        <label
                          class="custom-control-label"
                          for="register-policy"
                          >I agree to the
                          <a href="#">privacy policy</a>
                          *</label
                        >
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ChevronDown } from "lucide-vue-next";

const { api } = useAxios();
const currentTab = ref("menu");
const isMenuActive = ref(false);
const data = ref({
  kitchen: {
    categories: [],
    solutions: [],
  },
  laundry: {
    categories: [],
    solutions: [],
  },
  coldRoom: {
    categories: [],
    solutions: [],
  },
  promotional: {
    categories: [],
    solutions: [],
  },
});

const categoryIds = {
  kitchen: 21,
  laundry: 247,
  coldRoom: 301,
  promotional: 370,
};

// Replace your existing fetchAllCategories function with this:
const fetchAllCategories = async () => {
  try {
    // Single API call to get all categories
    const response = await api.get(
      "/api/get-main-categories/21,247,301,370?all=true"
    );

    // Initialize data structure
    const categorizedData = {
      kitchen: { categories: [], solutions: [] },
      laundry: { categories: [], solutions: [] },
      coldRoom: { categories: [], solutions: [] },
      promotional: { categories: [], solutions: [] },
    };

    // Process categories
    if (response.data.categories) {
      response.data.categories.forEach((category) => {
        // Determine which section this category belongs to based on parent_id
        switch (category.parent_id) {
          case "21": // Kitchen
            categorizedData.kitchen.categories.push(category);
            break;
          case "247": // Laundry
            categorizedData.laundry.categories.push(category);
            break;
          case "301": // Cold Storage
            categorizedData.coldRoom.categories.push(category);
            break;
          case "370": // Promotional
            categorizedData.promotional.categories.push(category);
            break;
        }
      });
    }

    // Process solutions
    if (response.data.solutions) {
      response.data.solutions.forEach((solution) => {
        // Determine which section this solution belongs to based on solution_category
        switch (solution.solution_category) {
          case 21: // Kitchen
            categorizedData.kitchen.solutions.push(solution);
            break;
          case 247: // Laundry
            categorizedData.laundry.solutions.push(solution);
            break;
          case 301: // Cold Storage
            categorizedData.coldRoom.solutions.push(solution);
            break;
          case 370: // Promotional
            categorizedData.promotional.solutions.push(solution);
            break;
        }
      });
    }

    // Update the ref with the organized data
    data.value = categorizedData;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Menu toggle functions
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
  document.body.classList.toggle("mmenu-active", isMenuActive.value);
  document.querySelector(".the_main_div")?.classList.toggle("mmenu-active");
};

const closeMenu = () => {
  isMenuActive.value = false;
  document.body.classList.remove("mmenu-active");
  document.querySelector(".the_main_div")?.classList.remove("mmenu-active");
};

const toggleSubMenu = (event) => {
  event.preventDefault();
  const parentLi = event.target.closest("li");
  parentLi.classList.toggle("show");
  document.querySelectorAll(".mobile-menu > li.show").forEach((li) => {
    if (li !== parentLi) li.classList.remove("show");
  });
};

// URL generation functions
const generateLink = (basePath, id, name) => getGenericLink(id, name, basePath);

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  fetchAllCategories(); // Fetch all categories when component mounts
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
  if (!event.target.closest(".mobile-menu") && isMenuActive.value) {
    closeMenu();
  }
};
</script>

<style scoped>
.mobile-menu li .submenu {
  display: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.mobile-menu li.show > .submenu {
  display: block;
  max-height: 1000px;
  /* Adjust as needed */
}

.mobile-menu li .sf-with-ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-menu li .icon-chevron-down {
  cursor: pointer;
  padding: 10px;
  /* Increase click area */
}
</style>
