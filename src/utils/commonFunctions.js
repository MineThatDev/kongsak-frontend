import router from "@/router";
import { useQuasar } from "quasar";
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
  }
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
  return { redirect, handleImageSrc, currencyFormat, showNotification, $q };
}
