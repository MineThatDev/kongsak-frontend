<template>
  <q-toolbar v-if="breadCrumbs.length">
    <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el
        ><div
          class="text-cedar-plank font-size-16 cursor-pointer font-kongsak-regular"
          @click="redirect('/home')"
        >
          หน้าหลัก
        </div></q-breadcrumbs-el
      >
      <q-breadcrumbs-el v-if="breadCrumbs.length === 1"
        ><div class="text-trapped-darkness font-size-16">
          {{ breadCrumbs[0] }}
        </div></q-breadcrumbs-el
      >
      <q-breadcrumbs-el
        v-else-if="breadCrumbs.length > 1"
        v-for="(bc, index) in breadCrumbs"
        :key="index"
        ><div class="text-trapped-darkness font-size-16">
          {{ bc }}
        </div></q-breadcrumbs-el
      >
    </q-breadcrumbs>
  </q-toolbar>
</template>

<script>
import store from "@/store";
import { computed } from "vue";
import commonFunctions from "@/utils/common-function";
export default {
  setup() {
    const { redirect } = commonFunctions();
    const currentPage = computed(() => store.getters.currentPage);
    const breadCrumbs = computed(() => store.getters.breadCrumbs);
    return { currentPage, redirect, breadCrumbs };
  },
};
</script>
