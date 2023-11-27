<template>
  <q-page padding>
    <div class="row">
      <div class="col-2">
        <div
          class="text-pumping-spice font-size-18 text-weight-bold cursor-pointer"
        >
          ทั้งหมด ({{ warrantyCardList.length }})
        </div>
      </div>
      <div class="col-10">
        <div class="row justify-between items-center">
          <div class="text-trapped-darkness font-size-18 text-weight-bold">
            รายการใบรับประกัน:
          </div>
          <div>
            <q-input
              v-model="searchString"
              outlined
              dense
              color="dark"
              label="ค้นหาชื่อผู้ใช้"
              @keydown.enter.prevent="fetchInformation()"
            >
              <template v-slot:append
                ><q-icon
                  name="search"
                  class="cursor-pointer"
                  @click="fetchInformation()"
                ></q-icon
              ></template>
            </q-input>
          </div>
        </div>
        <div v-if="warrantyCardList.length">
          <q-expansion-item
            v-for="(card, index) in warrantyCardList"
            :key="index"
            :default-opened="index === 0"
            :label="`${card.firstName} ${card.lastName}`"
            header-class="text-trapped-darkness font-size-16 text-weight-bold rounded-borders expansion-item-height"
            style="border: 1px solid rgb(237, 228, 228); border-radius: 8px"
            class="q-my-md"
          >
            <div class="q-px-lg q-py-md">
              <div class="row items-center">
                <div class="col-6">
                  <div class="text-trapped-darkness text-weight-bold q-mt-md">
                    ชื่อสินค้า
                  </div>
                  <div>
                    {{ card.product_name }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-trapped-darkness text-weight-bold q-mt-md">
                    Serial Number
                  </div>
                  <div>{{ card.product_code }}</div>
                </div>
              </div>
              <div class="row items-center">
                <div class="col-6">
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
                <div class="col-6">
                  <div class="text-trapped-darkness text-weight-bold q-mt-md">
                    วันที่ เริ่ม - สิ้นสุด การรับประกันสินค้า
                  </div>
                  <div>{{ card.start_date }} - {{ card.expiry_date }}</div>
                </div>
              </div>
              <div class="col-6 text-right">
                <q-btn
                  class="text-cedar-plank btn-radius"
                  style="min-width: 60px"
                  @click="deleteWarrantyCard(card.id)"
                  icon="delete"
                  flat
                ></q-btn>
                <q-btn
                  class="text-pumping-spice btn-radius"
                  style="min-width: 60px"
                  @click="mountInformationToDialog(card.id)"
                  icon="edit"
                  flat
                ></q-btn>
              </div>
            </div>
          </q-expansion-item>
        </div>
        <div
          v-else-if="!warrantyCardList.length && !loading"
          class="flex flex-center"
          style="height: 70vh"
        >
          <div class="font-size-24">ไม่มีรายการ</div>
        </div>
      </div>
    </div>
    <q-dialog v-model="showCreateWarrantyCardDialog">
      <q-card class="card-radius" style="max-width: 1000px; height: 520px">
        <div class="row full-width justify-between items-center q-pa-md">
          <div class="text-trapped-darkness font-size-18">
            {{
              dialogForm.id
                ? "แก้ไขรายการการรับประกันสินค้า"
                : "เพิ่มรายการรับประกันสินค้า"
            }}
          </div>
          <q-btn
            icon="close"
            flat
            size="16px"
            @click="showCreateWarrantyCardDialog = false"
          ></q-btn>
        </div>
        <div class="row q-pb-md">
          <div class="col-6 q-mt-md">
            <div class="q-pl-lg">
              <div class="row text-black font-size-14">ชื่อ - นามสกุล</div>
              <div class="row">
                <div class="col-6 q-pr-sm">
                  <q-input
                    outlined
                    v-model="dialogForm.firstName"
                    placeholder="ชื่อ"
                    dense
                  ></q-input>
                </div>
                <div class="col-6 q-pl-sm">
                  <q-input
                    outlined
                    v-model="dialogForm.lastName"
                    placeholder="นามสกุล"
                    dense
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="q-pl-lg q-py-sm">
              <div class="row text-black font-size-14">ชื่อสินค้า</div>
              <div class="col-12">
                <q-input
                  outlined
                  v-model="dialogForm.productName"
                  placeholder="ชื่อสินค้า"
                  dense
                ></q-input>
              </div>
            </div>

            <div class="q-pl-lg q-py-sm">
              <div class="row text-black font-size-14">
                ประวัติการซ่อม/เปลี่ยนสินค้า
              </div>
              <div class="row">
                <div class="col-12">
                  <q-input
                    type="textarea"
                    outlined
                    v-model="dialogForm.productHistory"
                    placeholder="ประวัติการซ่อม/เปลี่ยนสินค้า"
                    dense
                  ></q-input>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 q-mt-md">
            <div class="q-px-lg">
              <div class="text-black font-size-14">
                วันที่ เริ่ม - สิ้นสุด การรับประกันสินค้า
              </div>
              <div class="row">
                <div class="col-6 q-pr-sm">
                  <q-input
                    outlined
                    v-model="dialogForm.startDate"
                    placeholder="dd/mm/yyy"
                    dense
                  ></q-input>
                </div>
                <div class="col-6 q-pl-sm">
                  <q-input
                    outlined
                    v-model="dialogForm.expiryDate"
                    placeholder="dd/mm/yyy"
                    dense
                  ></q-input>
                </div>
              </div>
            </div>

            <div class="q-px-lg q-py-sm">
              <div class="row text-black font-size-14">Serial Number</div>
              <div class="row">
                <div class="col-12">
                  <q-input
                    outlined
                    v-model="dialogForm.productCode"
                    placeholder="รหัสสินค้า"
                    dense
                  ></q-input>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 text-center q-mt-lg">
            <div>
              <q-btn
                class="bg-green text-white btn-radius"
                @click="saveWarrantyCard(dialogForm.id)"
                style="min-width: 140px"
                >ยืนยัน</q-btn
              >
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { onMounted, onUnmounted, ref, reactive } from "vue";
import store from "@/store";
import commonFunctions from "@/utils/commonFunctions";
import { $api } from "@/services/api";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    const { showNotification, showSpinnerIosLoading, hideSpinnerIosLoading } = commonFunctions();
    const warrantyCardList = ref([]);
    const loading = ref(true);
    const searchString = ref("");
    const fetchInformation = async () => {
      showSpinnerIosLoading();
      loading.value = true;
      warrantyCardList.value = [];
      const warrantyCards = await $api.warranty_cards.getByParams({
        created_by_like: searchString.value ? searchString.value : null,
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
    const showCreateWarrantyCardDialog = ref(false);
    const dialogForm = reactive({
      id: "",
      firstName: "",
      lastName: "",
      productName: "",
      productCode: "",
      productHistory: "",
      startDate: "",
      expiryDate: "",
    });
    const validateDeliveryAddressForm = () => {
      if (
        dialogForm.firstName &&
        dialogForm.lastName &&
        dialogForm.productName &&
        dialogForm.startDate &&
        dialogForm.expiryDate
      ) {
        return true;
      } else {
        return false;
      }
    };
    const clearDialogForm = () => {
      dialogForm.id = "";
      dialogForm.firstName = "";
      dialogForm.lastName = "";
      dialogForm.productName = "";
      dialogForm.productCode = "";
      dialogForm.productHistory = "";
      dialogForm.dates = "";
    };
    const openWarrantyCardDialog = () => {
      showCreateWarrantyCardDialog.value = true;
    };
    const closeWarrantyCardDialog = () => {
      showCreateWarrantyCardDialog.value = false;
      clearDialogForm();
    };
    const mountInformationToDialog = async (id) => {
      const card = await $api.warranty_cards.getById(id);
      if (card) {
        const userRes = await $api.users.getById(card.user_id);
        const productRes = await $api.products.getById(card.product_id);
        dialogForm.id = card.id;
        dialogForm.firstName = userRes ? userRes.first_name : "";
        dialogForm.lastName = userRes ? userRes.last_name : "";
        dialogForm.productName = productRes ? productRes.name : "";
        dialogForm.productCode = card.product_code ? card.product_code : "";
        dialogForm.productHistory = card.product_history
          ? card.product_history
          : "";
        dialogForm.startDate = card.start_date ? card.start_date : "";
        dialogForm.expiryDate = card.expiry_date ? card.expiry_date : "";
        openWarrantyCardDialog();
      }
    };
    const saveWarrantyCard = async (id) => {
      const isValid = validateDeliveryAddressForm();
      if (isValid) {
        const warrantyCard = await $api.warranty_cards.getById(id);
        const response = await $api.warranty_cards.update({
          id: id,
          user_id: warrantyCard.user_id,
          product_name: dialogForm.productName,
          product_code: dialogForm.productCode,
          start_date: dialogForm.startDate,
          expiry_date: dialogForm.expiryDate,
          product_history: dialogForm.productHistory,
        });
        if (response && response.status === 200) {
          $q.notify({
            message: "แก้ไขใบรับประกันสำเร็จ!",
            position: "top",
            type: "positive",
          });
          await fetchInformation(); // fetch again for new added card
          closeWarrantyCardDialog();
        } else {
          $q.notify({
            message: "แก้ไขใบรับประกันล้มเหลว!",
            position: "top",
            type: "negative",
          });
        }
      } else {
        showNotification("negative", "กรุณากรอกข้อมูลให้ครบ!");
      }
    };
    const deleteWarrantyCard = async (id) => {
      $q.dialog({
        title: "ลบรายการ",
        message: "ต้องกาลบรายการนี้หรือไม่?",
        ok: "ยืนยัน",
        cancel: "ยกเลิก",
      }).onOk(async () => {
        await $api.warranty_cards.delete(id);
        $q.notify({
          message: "ลบรายการสำเร็จสำเร็จ!",
          position: "top",
          type: "positive",
        });
        await fetchInformation();
      });
    };
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", ["ใบรับประกัน"]);
      await fetchInformation();
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {
      warrantyCardList,
      openWarrantyCardDialog,
      showCreateWarrantyCardDialog,
      dialogForm,
      closeWarrantyCardDialog,
      saveWarrantyCard,
      mountInformationToDialog,
      clearDialogForm,
      deleteWarrantyCard,
      loading,
      searchString,
      fetchInformation,
    };
  },
};
</script>
