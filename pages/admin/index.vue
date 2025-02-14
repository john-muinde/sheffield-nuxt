<template>
  <div class="layout-px-spacing dash_2">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Dashboard</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Sales</span>
                </li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav flex-row ms-auto">
        <li class="nav-item more-dropdown">
          <div class="dropdown custom-dropdown-icon">
            <a
              id="ddlSettings"
              href="javascript:;"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>Settings</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="ddlSettings"
            >
              <li>
                <a
                  class="dropdown-item"
                  data-value="Settings"
                  href="javascript:void(0);"
                  >Settings</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  data-value="Mail"
                  href="javascript:void(0);"
                  >Mail</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  data-value="Print"
                  href="javascript:void(0);"
                  >Print</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  data-value="Download"
                  href="javascript:void(0);"
                  >Download</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  data-value="Share"
                  href="javascript:void(0);"
                  >Share</a
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="row layout-top-spacing">
      <div
        class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing"
      >
        <div class="widget widget-unique-visitors">
          <div class="widget-content flex justify-between p-2">
            <div class="">
              <a-range-picker
                :bordered="false"
                :default-value="[
                  dayjs(dates.start_date),
                  dayjs(dates.end_date),
                ]"
                :presets="presetRanges"
                @change="datePickerOnChange"
              />
              ({{ dates.label }})
            </div>
            <a-space>
              <a-dropdown>
                <a-button
                  type="primary"
                  :disabled="loading"
                  class="ant-dropdown-link flex"
                  @click.prevent
                >
                  Quote Requests
                  <ChevronDown />
                </a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1" @click="getStats('quotes', 'excel')"
                      >Selected Period</a-menu-item
                    >
                    <a-menu-item
                      key="2"
                      @click="getStats('quotes', 'excel', 'all')"
                      >Download All</a-menu-item
                    >
                  </a-menu>
                </template>
              </a-dropdown>
              <a-button
                type="primary"
                danger
                :disabled="loading"
                @click="showResetConfirm"
              >
                Reset All Stats
              </a-button>
              <a-button type="primary" :disabled="loading" @click="getStats">
                Refresh
              </a-button>
            </a-space>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-statistics">
          <div class="widget-heading">
            <h5>Visitors</h5>
          </div>
          <div class="widget-content">
            <div class="row">
              <div class="col-6">
                <div class="w-detail">
                  <p class="w-title">New Visitors</p>
                  <p class="w-stats">
                    {{ uniqueVisitors?.filter((e) => e.is_new == 1).length }}
                  </p>
                </div>
                <apex-chart
                  v-if="newVistorsOptions && !loading"
                  height="58"
                  type="line"
                  :options="newVistorsOptions"
                  :series="newVistorsSeries"
                />
              </div>
              <div class="col-6">
                <div class="w-detail">
                  <p class="w-title">Returning Visitors</p>
                  <p class="w-stats">
                    {{ uniqueVisitors?.filter((e) => e.is_new == 0).length }}
                  </p>
                </div>
                <apex-chart
                  v-if="returningVisitorsOptions"
                  height="58"
                  type="line"
                  :options="returningVisitorsOptions"
                  :series="returningVisitorsSeries"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-expenses">
          <div class="widget-heading">
            <h5 class="mb-4">Total Visitors</h5>
          </div>

          <div class="widget-content">
            <p class="value">
              {{ uniqueVisitors?.length }}
              <span>({{ dates.label }})</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-trending-up"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </p>
            <div class="w-progress-stats">
              <div class="progress">
                <div
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="57"
                  class="progress-bar bg-gradient-secondary"
                  style="width: 57%"
                ></div>
              </div>
              <div class="w-icon">57%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-active-log">
          <div class="widget-heading">
            <h5>Recent Visits</h5>
          </div>

          <div class="widget-content">
            <div class="w-shadow-top"></div>
            <perfect-scrollbar
              style="height: 200px"
              :options="{ suppressScrollX: true }"
            >
              <div id="visitorAccordion" class="accordion accordion-flush">
                <div
                  v-for="(visitorData, index) in stats?.visitor_details"
                  :key="visitorData.visitor.tracking_id"
                  class="accordion-item border-b"
                >
                  <h2 :id="'heading' + index" class="accordion-header">
                    <button
                      class="accordion-button collapsed p-4 bg-transparent"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapse' + index"
                      aria-expanded="false"
                      :aria-controls="'collapse' + index"
                    >
                      <div class="flex flex-col w-full">
                        <div class="flex items-center mb-1">
                          <span class="font-semibold">{{
                            visitorData.visitor.location
                          }}</span>
                          <span
                            class="text-sm ml-2"
                            :class="
                              visitorData.visitor.is_new
                                ? 'text-success'
                                : 'text-info'
                            "
                          >
                            {{
                              visitorData.visitor.is_new ? "New" : "Returning"
                            }}
                          </span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                          <span
                            >{{ visitorData.visitor.platform }} -
                            {{ visitorData.visitor.browser }}</span
                          >
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    :id="'collapse' + index"
                    class="accordion-collapse collapse"
                    :aria-labelledby="'heading' + index"
                    data-bs-parent="#visitorAccordion"
                  >
                    <div class="accordion-body p-4 bg-gray-50">
                      <!-- Visit Timeline -->
                      <div class="timeline-small">
                        <div
                          v-for="(visit, vIndex) in visitorData.visits"
                          :key="vIndex"
                          class="timeline-container position-relative mb-3 pb-1"
                        >
                          <div class="timeline-content">
                            <div class="d-flex justify-content-between mb-1">
                              <span class="font-medium text-sm">
                                {{
                                  formatDate(visit.timestamp, {
                                    format: "M/D/YYYY, hh:mm:ss A",
                                  })
                                }}
                              </span>
                            </div>
                            <div
                              v-if="visit.url"
                              class="text-sm text-gray-600 break-all"
                            >
                              <a
                                :href="visit.url"
                                target="_blank"
                                class="text-primary hover:underline"
                              >
                                {{ visit.url }}
                              </a>
                            </div>
                            <div class="text-xs text-gray-500 mt-1">
                              {{ visit.platform }} - {{ visit.browser }} |
                              {{ visit.location }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </div>
      </div>

      <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-unique-visitors">
          <div class="widget-heading">
            <h5>Unique Visitors</h5>
          </div>

          <div class="widget-content">
            <apex-chart
              v-if="uniqueVisitorOptions"
              height="350"
              type="bar"
              :options="uniqueVisitorOptions"
              :series="uniqueVisitorSeries"
            />
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-active-log">
          <div class="widget-heading">
            <h5>Activity Log</h5>
          </div>

          <div class="widget-content">
            <div class="w-shadow-top"></div>
            <perfect-scrollbar class="mt-container mx-auto">
              <div class="timeline-line">
                <div
                  v-for="activity in activities"
                  :key="activity.timestamp"
                  class="item-timeline"
                >
                  <div class="t-dot">
                    <div :class="getActivityColor(activity.type)">
                      <component :is="getActivityIcon(activity.type)" />
                    </div>
                  </div>
                  <div class="t-content">
                    <div class="t-uppercontent">
                      <h5>
                        {{ getActivityTitle(activity) }}
                        <template v-if="activity.data.email">
                          <a :href="'mailto:' + activity.data.email">{{
                            activity.data.email
                          }}</a>
                        </template>
                      </h5>
                    </div>
                    <p>{{ formatDate(activity.timestamp) }}</p>
                    <p
                      v-if="activity.data.message"
                      class="text-sm text-gray-600"
                    >
                      {{ activity.data.message }}
                    </p>
                  </div>
                </div>
              </div>
            </perfect-scrollbar>
            <div class="w-shadow-bottom"></div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
        <div class="widget widget-active-log widget-visitor-by-browser">
          <div class="widget-heading">
            <h5>Visitors by platform</h5>
          </div>

          <div class="widget-content">
            <div class="w-shadow-top"></div>
            <div v-for="platform in platforms" class="browser-list">
              <div
                class="w-icon icon-fill-primary"
                v-html="platform.icon"
              ></div>
              <div class="w-browser-details">
                <div class="w-browser-info">
                  <h6>{{ platform.name }}</h6>
                  <p class="browser-count">
                    {{
                      (
                        (platform.count / uniqueVisitors?.length) *
                        100
                      )?.toFixed(2)
                    }}%
                  </p>
                </div>
                <div class="w-browser-stats">
                  <div class="progress">
                    <div
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      :aria-valuenow="
                        (platform.count / uniqueVisitors?.length) * 100
                      "
                      class="progress-bar bg-gradient-primary"
                      :style="{
                        width:
                          (platform.count / uniqueVisitors?.length) * 100 + '%',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <VisitorsMap
          :visitors="
            filters.status == 'visitors' ? uniqueVisitors : stats?.visitors
          "
        >
          <div class="widget-heading">
            <h5>Visitors by Country</h5>
            <div class="dropdown btn-group">
              <a
                id="ddlRevenue"
                href="javascript:;"
                class="btn dropdown-toggle btn-icon-only"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ filters.status == "visitors" ? "Visitors" : "Activity" }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-1 feather feather-more-horizontal"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="ddlRevenue"
              >
                <li>
                  <a
                    href="javascript:;"
                    class="dropdown-item"
                    @click="changeFilters('visitors')"
                    >Visitors</a
                  >
                </li>
                <li>
                  <a
                    href="javascript:;"
                    class="dropdown-item"
                    @click="changeFilters('activity')"
                    >Activity</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </VisitorsMap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

import "../assets/sass/widgets/widgets.scss";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ApexChart from "vue3-apexcharts";
import useStats from "@/composables/home";
import dayjs from "dayjs";

import { ChevronDown } from "lucide-vue-next";
import {
  formatDate,
  getActivityIcon,
  getActivityColor,
  getActivityTitle,
  generateChartOptions,
  platformIcons,
} from "@/utils";

const {
  getStats,
  dates,
  stats,
  loading,
  datePickerOnChange,
  presetRanges,
  showResetConfirm,
} = useStats();
const store = useStore();
const activities = computed(() => stats.value?.activities || []);
const filters = ref({ status: "visitors" });

const changeFilters = (status) => {
  filters.value.status = status;
};

const uniqueVisitors = computed(() => {
  return stats.value.visitors?.reduce((acc, curr) => {
    const visitor = acc.find((e) => e.tracking_id == curr.tracking_id);
    if (!visitor) {
      acc.push(curr);
    }
    return acc;
  }, []);
});

const platforms = computed(() => {
  return uniqueVisitors.value?.reduce((acc, curr) => {
    const platform = acc.find((e) => e.name == curr.platform);
    if (platform) {
      platform.count++;
    } else {
      acc.push({
        name: curr.platform,
        count: 1,
        desktop: curr.is_desktop == 1,
        icon: platformIcons[curr.platform] || platformIcons.Others,
      });
    }
    return acc;
  }, []);
});

const newVistorsSeries = computed(() => {
  return [{ data: stats.value?.series?.datasets[0].data || [] }];
});
const newVistorsOptions = computed(() =>
  generateChartOptions("#009688", store.state.is_dark_mode)
);

const returningVisitorsSeries = computed(() => {
  return [{ data: stats.value?.series?.datasets[1].data || [] }];
});
const returningVisitorsOptions = computed(() =>
  generateChartOptions("#e2a03f", store.state.is_dark_mode, {
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      color: "#e2a03f",
      opacity: 0.7,
    },
  })
);

const uniqueVisitorSeries = computed(() => {
  return [
    { name: "New Visitors", data: stats.value?.series?.datasets[0].data || [] },
    {
      name: "Returning Visitors",
      data: stats.value?.series?.datasets[1].data || [],
    },
  ];
});

const uniqueVisitorOptions = computed(() => {
  const isDark = store.state.is_dark_mode;
  return {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    colors: ["#5c1ac3", "#ffbb44"],
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 1,
      left: 1,
      top: 1,
      color: "#515365",
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%", borderRadius: 10 },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      markers: { width: 12, height: 12 },
      itemMargin: { horizontal: 0, vertical: 8 },
    },
    grid: { borderColor: isDark ? "#191e3a" : "#e0e6ed" },
    xaxis: {
      categories: stats.value?.series?.labels || [],
      axisBorder: { show: true, color: isDark ? "#3b3f5c" : "#e0e6ed" },
    },
    yaxis: { tickAmount: 6 },
    fill: {
      type: "gradient",
      gradient: {
        shade: isDark ? "dark" : "light",
        type: "vertical",
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: { formatter: (val) => val },
    },
  };
});

onMounted(async () => {
  await getStats();
});
</script>

<style>
.timeline-line {
  position: relative;
  padding: 20px 0;
}

.item-timeline {
  display: flex;
  margin-bottom: 20px;
}

.t-dot {
  position: relative;
  margin-right: 20px;
  min-width: 40px;
}

.t-dot > div {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.t-primary {
  background-color: #4361ee;
}

.t-secondary {
  background-color: #805dca;
}

.t-success {
  background-color: #1abc9c;
}

.t-warning {
  background-color: #e2a03f;
}

.t-dark {
  background-color: #3b3f5c;
}

.t-content {
  flex-grow: 1;
}

.t-content h5 {
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: 600;
}

.t-content a {
  color: #4361ee;
  text-decoration: none;
}

.t-content a:hover {
  text-decoration: underline;
}

.t-content p {
  margin: 0;
  color: #888ea8;
  font-size: 12px;
}

.w-shadow-top,
.w-shadow-bottom {
  height: 10px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), transparent);
}

.w-shadow-bottom {
  transform: rotate(180deg);
}

.collapse {
  visibility: unset;
}

.timeline-small::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 1px;
  background: #e5e7eb;
}

.timeline-container::before {
  content: "";
  position: absolute;
  left: -5px;
  top: 6px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #e5e7eb;
}

.timeline-content {
  margin-left: 20px;
}

.accordion-button:not(.collapsed) {
  background-color: rgba(67, 97, 238, 0.05);
  color: inherit;
  box-shadow: none;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(0, 0, 0, 0.125);
}

.accordion-button::after {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
}

input[disabled],
select[disabled],
textarea[disabled],
input[readonly],
select[readonly],
textarea[readonly] {
  cursor: text;
  background-color: unset !important;
  color: #bfc9d4;
}

.widget-total-balance {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.account-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.accordion-button {
  padding: 10px 15px;
  background-color: #f8f9fa;
}

.accordion-body {
  padding: 15px;
}

.acc-action {
  display: flex;
  align-items: center;
  gap: 10px;
}

.acc-action a {
  text-decoration: none;
  color: inherit;
}
</style>

<style lang="scss" scoped></style>
