import Toast from "react-native-toast-message";

const Notify = {
  success: (message, opt) => {
    Toast.show({ text1: message?.toUpperCase(), type: "success", ...opt });
  },
  error: (message, opt) => {
    Toast.show({ text1: message?.toUpperCase(), type: "error", ...opt });
  },
  info: (message, opt) => {
    Toast.show({ text1: message?.toUpperCase(), type: "info", ...opt });
  },
};
export default Notify;
