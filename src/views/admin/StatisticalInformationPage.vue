<template>
  <q-page padding> StatisticallnformationPage </q-page>
</template>
<script>
import { onMounted, onUnmounted } from "vue";
import store from "@/store";
export default {
  setup() {
    onMounted(() => {
      store.dispatch("updateBreadCrumbs", ["ข้อมูลสถิติ"]);
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {};
  },
};
</script>
