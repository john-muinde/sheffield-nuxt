import { notification as antNotification } from "ant-design-vue";

type NotificationType = "success" | "info" | "warning" | "error";

const showToast = (
  description: string,
  type: NotificationType = "success",
  heading: string = "Success"
): void => {
  type = type.toLowerCase() as NotificationType;
  if (!heading || heading.length === 0 || type !== "success") {
    heading = type.charAt(0).toUpperCase() + type.slice(1);
  }
  antNotification[type]({
    message: heading,
    description,
    placement: "topRight",
    duration: 3, // Duration in seconds
  });
};

export const notification = {
  showToast,
  success: (description: string, heading: string = "Success") =>
    showToast(description, "success", heading),
  info: (description: string, heading: string = "Info") =>
    showToast(description, "info", heading),
  warning: (description: string, heading: string = "Warning") =>
    showToast(description, "warning", heading),
  error: (description: string, heading: string = "Error") =>
    showToast(description, "error", heading),
};

export default notification;
