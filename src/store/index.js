import { createStore } from "vuex";
import userModule from "./user.module";
import commonModule from "./common.module";
import cartModule from "./cart.module";

export default createStore({
  modules: {
    userModule,
    commonModule,
    cartModule
  },
});
