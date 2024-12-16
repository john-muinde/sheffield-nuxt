import { ref } from "vue";
import { apiRequest } from "../utils/api";
import { Modal } from "ant-design-vue";

export default function useStats() {
  const stats = ref([]);
  const dates = ref({
    label: "This Week",
    start_date: moment().startOf("week").format("YYYY-MM-DD"),
    end_date: moment().endOf("week").format("YYYY-MM-DD"),
  });

  const period = (start_date, end_date) => {
    // if difference of days is 6, then it is a week, else it is a month, else it is a year
    const start = moment(start_date);
    const end = moment(end_date);
    const days = end.diff(start, "days");
    if (days <= 0) return "day";
    if (days <= 7) return "week";
    if (days <= 31) return "month";
    return "year";
  };

  const validationErrors = ref({});

  const getStats = async () => {
    try {
      const queryParameters = new URLSearchParams();
      queryParameters.append(
        "period",
        period(dates.value.start_date, dates.value.end_date)
      );
      queryParameters.append("start_date", dates.value.start_date);
      queryParameters.append("end_date", dates.value.end_date);
      const url = `/api/dashboard-stats?${queryParameters.toString()}`;
      const response = await apiRequest("get", url);
      stats.value = response;
      return response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const datePickerOnChange = (datesMoment, datesStrings) => {
    if (!datesMoment || !datesStrings || !datesStrings.length) return null;

    let label = presetRanges.find(
      (range) =>
        range.value[0] == datesMoment[0] && range.value[1] == datesMoment[1]
    );

    if (!label) {
      label = {
        label: `${moment(datesMoment[0]).format("MMM D, YYYY")} - ${moment(
          datesMoment[1]
        ).format("MMM D, YYYY")}`,
      };
    }

    dates.value = {
      label: label.label,
      start_date: datesStrings[0],
      end_date: datesStrings[1],
    };

    getStats();
  };

  const presetRanges = [
    { label: "Today", value: [moment(), moment()] },
    {
      label: "Yesterday",
      value: [moment().subtract(1, "day"), moment().subtract(1, "day")],
    },
    {
      label: "This Week",
      value: [moment().startOf("week"), moment().endOf("week")],
    },
    {
      label: "Last 7 Days",
      value: [moment().subtract(7, "day"), moment()],
    },
    {
      label: "This Month",
      value: [moment().startOf("month"), moment().endOf("month")],
    },
    {
      label: "Last Month",
      value: [
        moment().subtract(1, "months").startOf("month"),
        moment().subtract(1, "months").endOf("month"),
      ],
    },
    {
      label: "This Year",
      value: [moment().startOf("year"), moment().endOf("year")],
    },
    {
      label: "Last Year",
      value: [
        moment().subtract(1, "year").startOf("year"),
        moment().subtract(1, "year").endOf("year"),
      ],
    },
  ];

  const showResetConfirm = () => {
    Modal.confirm({
      title: "Do you want to reset the date filters?",
      content: `This will reset the date range to ${dates.value.label}`,
      onOk() {
        datePickerOnChange(
          [moment().startOf("week"), moment().endOf("week")],
          [
            moment().startOf("week").format("YYYY-MM-DD"),
            moment().endOf("week").format("YYYY-MM-DD"),
          ]
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return {
    getStats,
    showResetConfirm,
    datePickerOnChange,
    presetRanges,
    stats,
    dates,
  };
}
