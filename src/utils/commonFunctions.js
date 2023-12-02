import router from "@/router";
import { useQuasar, QSpinnerIos } from "quasar";
export default function commonFunctions() {
  const $q = useQuasar();
  const redirect = (path, slug = "") => {
    if (!slug) {
      router.push(path);
    } else {
      router.push(`${path}/${slug}`);
    }
  };
  const showNotification = (type, message, position) => {
    $q.notify({
      message: message,
      position: position ? position : "top",
      type: type,
    });
  };
  const handleImageSrc = (imgSrc) => {
    let condition = "@/assets/products";
    // if local path
    if (imgSrc ? imgSrc.includes(condition) : "") {
      let newPath = imgSrc.replace(condition, "");
      return require(`@/assets/products${newPath}`);
      // if No path
    } else if (!imgSrc) {
      //
    }
    // For External Path
    else {
      return imgSrc;
    }
  };
  const currencyFormat = (num) => {
    if (typeof num == "number") {
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      // return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
    return num;
  };
  const showSpinnerIosLoading = () => {
    $q.loading.show({
      spinner: QSpinnerIos,
      spinnerColor: "pumping-spice",
      spinnerSize: 70,
    });
  };
  const hideSpinnerIosLoading = () => {
    $q.loading.hide();
  };
  const convertISOFormatToDDMMYYYY = (date) => {
    if (date) {
      const utcDate = new Date(date);
      const day = utcDate.getUTCDate();
      const month = utcDate.getUTCMonth() + 1; // Months are zero-indexed, so we add 1
      const year = utcDate.getUTCFullYear();
      return `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year}`;
    }
    return "";
  };
  return { redirect, handleImageSrc, currencyFormat, showNotification, $q, showSpinnerIosLoading, hideSpinnerIosLoading, convertISOFormatToDDMMYYYY };
}
