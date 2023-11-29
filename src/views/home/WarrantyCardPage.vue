<template>
  <q-page padding>
    <div class="row">
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
        <div
          class="text-pumping-spice font-size-18 text-weight-bold cursor-pointer"
        >
          ทั้งหมด ({{ warrantyCardList.length }})
        </div>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-12">
        <div class="row justify-between items-center">
          <div class="text-trapped-darkness font-size-18 text-weight-bold">
            รายการใบรับประกัน:
          </div>
        </div>
        <div v-if="warrantyCardList.length">
          <q-expansion-item
            v-for="(card, index) in warrantyCardList"
            :key="index"
            :default-opened="index === 0"
            :label="card.product_name"
            header-class="text-trapped-darkness font-size-16 text-weight-bold rounded-borders expansion-item-height"
            style="border: 1px solid rgb(237, 228, 228); border-radius: 8px"
            class="q-my-md"
          >
            <div class="q-px-lg q-py-md">
              <div class="row items-center">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xl-12">
                  <div class="text-trapped-darkness text-weight-bold q-mt-md">
                    ชื่อสินค้า
                  </div>
                  <div>
                    {{ card.product_name }}
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xl-12">
                  <div class="text-trapped-darkness text-weight-bold q-mt-md">
                    Serial Number
                  </div>
                  <div>{{ card.product_code }}</div>
                </div>
              </div>
              <div class="row items-center">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xl-12">
                  <div class="text-trapped-darkness text-weight-bold q-mt-md">
                    ประวัติการซ่อม / เปลี่ยนสินค้า
                  </div>
                  <div>
                    {{
                      card.product_history
                        ? card.product_history
                        : "ไม่มีประวัติ"
                    }}
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xl-12">
                  <div class="text-trapped-darkness text-weight-bold q-mt-md">
                    วันที่ เริ่ม - สิ้นสุด การรับประกันสินค้า
                  </div>
                  <div>{{ card.start_date }} - {{ card.expiry_date }}</div>
                </div>
              </div>
            </div>
          </q-expansion-item>
        </div>
        <div v-else-if="!warrantyCardList.length && !loading" class="flex flex-center" style="height: 70vh">
          <div class="font-size-24">ไม่มีรายการ</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import commonFunctions from "@/utils/commonFunctions";
import store from "@/store";
import { $api } from "@/services/api";
export default {
  setup() {
    const { showSpinnerIosLoading, hideSpinnerIosLoading } = commonFunctions();
    const warrantyCardList = ref([]);
    const loading = ref(true);
    const fetchInformation = async () => {
      showSpinnerIosLoading();
      loading.value = true;
      warrantyCardList.value = [];
      const warrantyCards = await $api.warranty_cards.getByParams({
        user_id: store.getters.userInfo.id
      });
      if (warrantyCards && warrantyCards.length) {
        for (const wc of warrantyCards) {
          const userRes = await $api.users.getById(wc.user_id);
          const productRes = await $api.products.getById(wc.product_id);
          warrantyCardList.value.push({
            ...wc,
            product_name: productRes ? productRes.name : "",
            firstName: userRes ? userRes.first_name : "",
            lastName: userRes ? userRes.last_name : "",
          });
        }
      }
      loading.value = false;
      hideSpinnerIosLoading();
    };
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", ["ใบรับประกัน"]);
      await fetchInformation();
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return { warrantyCardList, loading };
  },
};
</script>
