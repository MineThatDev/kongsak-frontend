import "quasar/dist/quasar.sass";
import "./styles/quasar/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { Dialog, Notify, Loading } from "quasar";
import { setCssVar } from "quasar";

const trappedDarkness = "#0F1F38";
const cedarPlank = "#8E7970";
const pumpingSpice = "#F55449";
const lazuriteBlue = "#1B4B5A";

setCssVar("trapped-darkness", trappedDarkness);
setCssVar("cedar-plank", cedarPlank);
setCssVar("pumping-spice", pumpingSpice);
setCssVar("lazurite-blue", lazuriteBlue);
export default {
  config: {},
  plugins: {
    Loading,
    Dialog,
    Notify,
  },
};
