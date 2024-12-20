// utils.js
import {
  ShoppingCart,
  MessageSquare,
  Phone,
  Mail,
  Plus,
} from "lucide-vue-next";

// utils.js
import { countries as countriesData } from "countries-list";
import moment from "moment";

export const getCountryCodeByName = (name) => {
  for (const [code, country] of Object.entries(countriesData)) {
    if (
      country.name &&
      name &&
      country.name.toLowerCase() === name.toLowerCase()
    ) {
      return code;
    }
  }
  return null;
};

export const formatDate = (
  timestamp,
  { fromUtc = true, format = "MMM D, YYYY, hh:mm A" } = {}
) => {
  if (!timestamp) return "";

  if (fromUtc) {
    return moment.utc(timestamp).local().format(format);
  }
  return moment(timestamp).format(format);
};

const activityIcons = {
  quote_request: ShoppingCart,
  contact_us: MessageSquare,
  phone_call: Phone,
  email_sent: Mail,
  default: Plus,
};

export const platformIcons = {
  Windows:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chrome"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>',
  Safari:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>',
  AndroidOS:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smartphone"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>',
  Others:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
};

const activityColors = {
  quote_request: "t-primary",
  contact_us: "t-success",
  phone_call: "t-warning",
  email_sent: "t-secondary",
  default: "t-dark",
};

const activityTitles = {
  quote_request: "New Quote Request",
  contact_us: "Contact Form Submission",
  phone_call: "Phone Call Received",
  email_sent: "Email Communication",
  default: "Activity Recorded",
};

export const getActivityIcon = (type) =>
  activityIcons[type] || activityIcons.default;
export const getActivityColor = (type) =>
  activityColors[type] || activityColors.default;
export const getActivityTitle = (activity) => {
  const title = activityTitles[activity.type] || activityTitles.default;
  return activity.data.items_count
    ? `${title} (${activity.data.items_count} items)`
    : title;
};

export const generateChartOptions = (
  color,
  isDark,
  additionalOptions = {}
) => ({
  chart: {
    sparkline: { enabled: true },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 1,
      blur: 3,
      color,
      opacity: 0.7,
    },
  },
  stroke: { curve: "smooth", width: 2 },
  markers: { size: 0 },
  colors: [color],
  grid: { padding: { top: 0, bottom: 0, left: 0 } },
  tooltip: {
    theme: isDark ? "dark" : "light",
    x: { show: false },
    y: { title: { formatter: () => "" } },
  },
  responsive: [
    {
      breakPoint: 576,
      options: {
        chart: { height: 95 },
        grid: { padding: { top: 45, bottom: 0, left: 0 } },
      },
    },
  ],
  ...additionalOptions,
});
