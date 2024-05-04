<template>
  <q-page padding>
    <div class="row">
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
        <div :class="$q.screen.gt.xs ? '' : 'row justify-between'">
          <div
            class="font-size-18 cursor-pointer q-mb-md"
            @click="fetchInformation()"
            :class="
              selectedType === 'ทั้งหมด'
                ? 'text-pumping-spice'
                : 'text-trapped-darkness'
            "
          >
            ทั้งหมด ({{ allLength }})
          </div>
          <div
            class="font-size-18 cursor-pointer q-mb-md"
            @click="fetchInformation('กำลังดำเนินการ')"
            :class="
              selectedType === 'ที่ต้องจัดส่ง'
                ? 'text-pumping-spice'
                : 'text-trapped-darkness'
            "
          >
            กำลังดำเนินการ ({{ mustShippedLength }})
          </div>
          <div
            class="font-size-18 cursor-pointer"
            @click="fetchInformation('สำเร็จ')"
            :class="
              selectedType === 'สำเร็จ'
                ? 'text-pumping-spice'
                : 'text-trapped-darkness'
            "
          >
            สำเร็จ ({{ succeedLength }})
          </div>
        </div>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-12">
        <div class="row justify-between items-center">
          <div class="text-trapped-darkness font-size-18 text-weight-bold">
            รายการสั่งซื้อ:
          </div>
        </div>
        <div v-if="orderList.length">
          <q-expansion-item
            v-for="(order, index) in orderList"
            :key="index"
            :default-opened="index === 0"
            :label="`หมายเลขการสั่งซื้อ : ${order.order_number}`"
            header-class="text-trapped-darkness font-size-16 text-weight-bold rounded-borders expansion-item-height"
            style="border: 1px solid rgb(237, 228, 228); border-radius: 8px"
            class="q-my-md"
          >
            <div class="q-px-lg q-py-md">
              <div
                class="row justify-between q-px-lg q-my-sm"
                v-for="(product, index) in order.products"
                :key="index"
              >
                <div>{{ product.name }}</div>
                <div>จำนวนสินค้า {{ product.quantity }} ชิ้น</div>
              </div>
              <div class="text-right q-px-lg q-my-sm">
                ยอดรวมทั้งหมด {{ currencyFormat(order.total_amount) }} บาท
              </div>
              <div>
                <q-stepper v-model="order.step" ref="stepper" flat animated>
                  <q-step
                    v-for="(status, index) in order.statuses"
                    :key="index"
                    :name="status.id"
                    :title="status.title"
                    :done="status.status === 'Finished'"
                    active-color="grey"
                    active-icon="radio_button_checked"
                    done-icon="check"
                    done-color="positive"
                  >
                  </q-step>
                </q-stepper>
              </div>
              <div>
                <div class="row justify-between items-center q-px-lg q-my-md">
                  <div>
                    <div class="font-kongsak-bold">หมายเลขติดตามพัสดุ</div>
                    <div>
                      {{ order.tracking_number ? order.tracking_number : "" }}
                      จัดส่งโดย
                      {{ order.delivered_by ? order.delivered_by : "" }}
                      <a
                        v-if="order.tracking_url"
                        :href="`http://${order.tracking_url}`"
                        target="_blank"
                        >{{ order.tracking_url }}</a
                      >
                    </div>
                  </div>
                  <div>
                    <q-file
                      v-model="order.files"
                      class="text-black"
                      borderless
                      label="Upload File"
                      label-color="gold"
                      dense
                      multiple
                      append
                      use-chips
                      disable
                    >
                      <template v-slot:before>
                        <q-icon name="upload_file"></q-icon
                        ><span
                          class="q-ml-sm text-trapped-darkness font-size-12"
                          style="text-decoration: underline"
                          >หลักฐานการโอน</span
                        >
                      </template>
                      <template v-slot:prepend>
                        <q-icon name="attachment" color="smokey-grey" />
                      </template>
                      <template v-slot:after v-if="order.files.length">
                        <q-btn
                          class="text-black"
                          flat
                          @click="openFiles(order.files)"
                          >ดูไฟล์</q-btn
                        >
                      </template>
                    </q-file>
                  </div>
                </div>
                <div class="row justify-between items-center q-px-lg q-my-md">
                  <div>
                    <div class="font-kongsak-bold">ที่อยู่การจัดส่ง</div>
                    <div>
                      <span
                        >{{ order.shippingAddresses.first_name }}&nbsp;</span
                      >
                      <span> {{ order.shippingAddresses.last_name }}</span>
                      <span> | </span
                      ><span>{{ order.shippingAddresses.phone }}</span>
                    </div>
                    <div>{{ order.shippingAddresses.address }} {{ order.shippingAddresses.district }} {{ order.shippingAddresses.province }} {{ order.shippingAddresses.zip_code }}</div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </q-expansion-item>
        </div>
        <div
          v-else-if="!orderList.length && !loading"
          class="flex flex-center"
          style="height: 70vh"
        >
          <div class="font-size-24">ไม่มีรายการ</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import commonFunctions from "@/utils/common-function";
import file from "@/utils/file";
import store from "@/store";
import { $api } from "@/services/api";
export default {
  setup() {
    const { currencyFormat, showSpinnerIosLoading, hideSpinnerIosLoading } =
      commonFunctions();
    const { openFiles } = file();

    const orderList = ref([]);
    const selectedType = ref("ทั้งหมด");
    const allLength = ref(0);
    const mustShippedLength = ref(0);
    const succeedLength = ref(0);
    const loading = ref(true);
    const fetchInformation = async (deliveryStatus = null) => {
      showSpinnerIosLoading();
      loading.value = true;
      if (deliveryStatus === null) {
        selectedType.value = "ทั้งหมด";
      } else if (deliveryStatus === "กำลังดำเนินการ") {
        selectedType.value = "ที่ต้องจัดส่ง";
      } else if (deliveryStatus === "สำเร็จ") {
        selectedType.value = "สำเร็จ";
      }
      orderList.value = [];
      let totalAmount = 0;
      let step = 0;
      let stepName = "";
      let showFinishForm = false;
      let finishForm = {
        trackingNumber: "",
        deliveredBy: "",
      };
      const allLengthRes = await $api.orders.getByParams({
        user_id: store.getters.userInfo.id,
      });
      allLength.value = allLengthRes.length;
      const mustShippedRes = await $api.orders.getByParams({
        delivery_status: "กำลังดำเนินการ",
        user_id: store.getters.userInfo.id,
      });
      mustShippedLength.value = mustShippedRes.length;
      const succeedRes = await $api.orders.getByParams({
        delivery_status: "สำเร็จ",
        user_id: store.getters.userInfo.id,
      });
      succeedLength.value = succeedRes.length;
      const response = await $api.orders.getByParams({
        delivery_status: deliveryStatus,
        user_id: store.getters.userInfo.id,
      });
      if (response && response.length) {
        for (const order of response) {
          let products = [];
          let files = [];
          const fileInformation = await $api.files.getByParams({
            key_ref: order.id,
            origin: "payment-method",
          });
          if (fileInformation && fileInformation.length) {
            files.push({
              ...fileInformation[0],
              name: fileInformation[0].filename,
            });
          }
          const orderProducts = await $api.order_products.getByParams({
            order_id: order.id,
          });
          if (orderProducts && orderProducts.length) {
            for (const product of orderProducts) {
              const additionalProductInformation = await $api.products.getById(
                product.product_id
              );
              totalAmount =
                totalAmount +
                additionalProductInformation.price * product.quantity;
              products.push({
                ...product,
                ...additionalProductInformation,
              });
            }
          }
          const statuses = await $api.order_statuses.getByParams({
            order_id: order.id,
          });
          if (statuses && statuses.length) {
            const orderStatusMatched = statuses.find(
              (status) => status.is_active === true
            );
            if (orderStatusMatched) {
              step = orderStatusMatched.id;
              stepName = orderStatusMatched.title;
            } else {
              step = 0;
              stepName = "สำเร็จ";
            }
          }
          const shippingAddresses = await $api.shipping_addresses.getById(
            order.shipping_address_id
          );
          orderList.value.push({
            files: files,
            step: step,
            stepName: stepName,
            showFinishForm: showFinishForm,
            finishForm: finishForm,
            products: products,
            statuses: statuses,
            shippingAddresses: shippingAddresses,
            total_amount: totalAmount,
            ...order,
          });
        }
      }
      loading.value = false;
      hideSpinnerIosLoading();
    };
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", ["รายการคำสั่งซื้อ"]);
      await fetchInformation();
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {
      orderList,
      fetchInformation,
      allLength,
      mustShippedLength,
      succeedLength,
      selectedType,
      currencyFormat,
      loading,
      openFiles,
    };
  },
};
</script>
