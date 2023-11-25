<template>
  <q-page padding> MemberInformationPage </q-page>
</template>
<script>
import { onMounted, onUnmounted } from "vue";
import store from "@/store";
export default {
  setup() {
    onMounted(() => {
      store.dispatch("updateBreadCrumbs", ["ข้อมูลสมาชิก"]);
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {};
  },
};
</script>
