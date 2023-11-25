<template>
  <q-page class="row">
    <div class="col-7">
      <div class="row items-center q-mt-md q-mb-xl" style="padding-left: 40px">
        <div class="font-size-24 text-weight-bold text-black">
          วิธีการชำระเงิน
        </div>
      </div>
      <div class="q-my-lg">
        <div class="row justify-between items-center q-px-md">
          <div class="row items-center">
            <div>
              <q-radio v-model="paymentMethod" val="bank-transfer" color="dark"
                ><div class="font-size-18 text-weight-bold">
                  ชำระโดยการโอนเงิน
                </div></q-radio
              >
            </div>
          </div>
        </div>
        <div class="row items-center q-gutter-sm" style="padding-left: 54px">
          <q-img src="@/assets/kasikorn.png" width="20px" />
          <div>123-4-56789-0</div>
          <div>ชื่อบัญชี</div>
          <div>บริษัท คงศักดิ์ จำกัด</div>
        </div>
        <div
          class="row items-center q-gutter-sm q-mt-sm"
          style="padding-left: 54px"
        >
          <q-img src="@/assets/thai-panich.png" width="20px" height="20px" />
          <div>123-4-56789-0</div>
          <div>ชื่อบัญชี</div>
          <div>บริษัท คงศักดิ์ จำกัด</div>
        </div>
      </div>
      <div class="q-my-lg">
        <div class="row justify-between items-center q-px-md">
          <div class="row items-center">
            <div>
              <q-radio v-model="paymentMethod" val="qr-code" color="dark"
                ><div class="font-size-18 text-weight-bold">
                  QR Code พร้อมเพย์
                </div></q-radio
              >
            </div>
          </div>
        </div>
        <div class="row" style="padding-left: 54px">
          <q-img src="@/assets/prompt-pay.jpg" width="80px"></q-img>
        </div>
      </div>
    </div>
    <div class="col-5 row justify-center">
      <div class="wrapper-cart-bill q-mt-xl q-pa-md">
        <div class="row q-mt-sm">
          <div class="font-size-18 text-weight-bold">ยอดสั่งซื้อรวม</div>
        </div>
        <div class="row q-my-sm justify-between">
          <div class="font-size-18">ราคา</div>
          <div class="font-size-18">{{ currencyFormat(totalPrice) }} บาท</div>
        </div>
        <div class="row q-my-sm justify-between">
          <div class="font-size-18">ส่วนลด</div>
          <div class="font-size-18 text-green">{{ currencyFormat(0) }} บาท</div>
        </div>
        <div class="row q-my-sm justify-between">
          <div class="font-size-18">ค่าจัดส่ง</div>
          <div class="font-size-18 text-green">ฟรี</div>
        </div>
        <div class="col-12 q-my-sm">
          <q-separator />
        </div>
        <div class="row justify-between q-mt-lg q-mb-sm">
          <div class="font-size-18 text-weight-bold">ยอดรวม</div>
          <div class="font-size-18 text-weight-bold">
            {{ currencyFormat(totalPrice) }} บาท
          </div>
        </div>
        <div class="row items-center justify-between">
          <div class="font-size-18">สินค้าจัดส่งประมาณวันที่</div>
          <div class="font-size-18">{{ deliveryDate }}</div>
        </div>
        <div class="row q-mt-lg">
          <q-btn
            class="bg-trapped-darkness text-white full-width"
            @click="pay()"
            >ชำระเงิน</q-btn
          >
        </div>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="showBankTransferPaymentDialog">
    <div
      class="q-py-md q-px-xl bg-white"
      style="width: 640px; max-width: 640px; height: 560px; border-radius: 16px"
    >
      <div class="row justify-between items-center">
        <div class="text-trapped-darkness font-size-18 q-mt-md">
          ชำระเงินโดยการโอนเงิน
        </div>
        <q-btn
          icon="close"
          flat
          size="16px"
          @click="showBankTransferPaymentDialog = false"
        ></q-btn>
      </div>

      <div class="text-trapped-darkness q-px-md q-mt-xl">
        เมื่อโอนเงินเรียบร้อยแล้ว โปรดแจ้งการชำระเงิน โดยการกรอกฟอร์มข้างล่าง
      </div>
      <div class="row q-pa-md">
        <div class="col-3 row q-pt-sm">
          <div class="text-trapped-darkness">
            ธนาคารที่โอนเข้า<span class="text-red">*</span>
          </div>
        </div>
        <div class="col-9">
          <div class="row items-center q-gutter-sm">
            <q-radio
              v-model="bankTransferForm.bankType"
              val="kasikorn"
              color="dark"
            /><q-img src="@/assets/kasikorn.png" width="20px" />
            <div>123-4-56789-0</div>
            <div>ชื่อบัญชี</div>
            <div>บริษัท คงศักดิ์ จำกัด</div>
          </div>
          <div class="row items-center q-gutter-sm q-mt-sm">
            <q-radio
              v-model="bankTransferForm.bankType"
              val="thai-panich"
              color="dark"
            /><q-img
              src="@/assets/thai-panich.png"
              width="20px"
              height="20px"
            />
            <div>123-4-56789-0</div>
            <div>ชื่อบัญชี</div>
            <div>บริษัท คงศักดิ์ จำกัด</div>
          </div>
        </div>
      </div>
      <div class="row items-center q-px-md q-mb-md">
        <div class="col-3">
          <div class="text-trapped-darkness">
            จำนวนเงินที่โอนเข้า<span class="text-red">*</span>
          </div>
        </div>
        <div class="col-9 row items-center">
          <q-input
            outlined
            dense
            style="width: 200px"
            v-model="bankTransferForm.transferAmount"
          />
          <div class="q-ml-sm">บาท</div>
        </div>
      </div>
      <div class="row items-center q-my-sm q-px-md">
        <div class="col-3">
          <div class="text-trapped-darkness">
            วันเวลาที่โอนเข้า<span class="text-red">*</span>
          </div>
        </div>
        <div class="col-9">
          <q-input
            outlined
            color="gold"
            dense
            v-model="bankTransferForm.transferDate"
            style="width: 200px"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    minimal
                    mask="DD/MM/YYYY"
                    color="gold"
                    v-model="bankTransferForm.transferDate"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="gold" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row items-center q-px-md">
        <div class="col-3">
          <div class="text-trapped-darkness">
            สลิปหลักฐานการโอน<span class="text-red">*</span>
          </div>
        </div>
        <div class="row col-9">
          <q-file
            v-model="bankTransferForm.transferFiles"
            class="text-black"
            borderless
            label="Upload File"
            label-color="gold"
            dense
            multiple
            append
            use-chips
          >
            <template v-slot:prepend>
              <q-icon name="attachment" color="smokey-grey" />
            </template>
          </q-file>
        </div>
      </div>
      <div class="text-center q-mt-xl q-mb-sm">
        <q-btn
          class="bg-green text-white"
          style="width: 160px"
          @click="createOrder()"
        >
          แจ้งโอน
        </q-btn>
      </div>
    </div>
  </q-dialog>
  <q-dialog v-model="showQrCodePaymentDialog">
    <q-card class="q-pa-lg" style="width: 800px">
      <div class="row justify-between items-center">
        <div class="text-trapped-darkness font-size-18 q-mt-md">
          QR Code พร้อมเพย์
        </div>
        <q-btn
          icon="close"
          flat
          size="16px"
          @click="showQrCodePaymentDialog = false"
        ></q-btn>
      </div>
      <div class="text-center q-pa-xl">
        <q-img src="@/assets/google-qr.png" width="200px"></q-img>
      </div>
      <div class="text-trapped-darkness text-center font-size-16 q-mb-md">
        ชำระเงินให้แก่ : บริษัท คงศักดิ์ จำกัด
      </div>
      <div class="row items-center q-px-md q-mb-md">
        <div class="col-3">
          <div class="text-trapped-darkness">
            จำนวนเงินที่โอนเข้า<span class="text-red">*</span>
          </div>
        </div>
        <div class="col-9 row items-center">
          <q-input
            outlined
            dense
            style="width: 200px"
            v-model="qrCodeTransferForm.transferAmount"
          />
          <div class="q-ml-sm">บาท</div>
        </div>
      </div>
      <div class="row items-center q-my-sm q-px-md">
        <div class="col-3">
          <div class="text-trapped-darkness">
            วันเวลาที่โอนเข้า<span class="text-red">*</span>
          </div>
        </div>
        <div class="col-9">
          <q-input
            outlined
            color="gold"
            dense
            v-model="qrCodeTransferForm.transferDate"
            style="width: 200px"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    minimal
                    mask="DD/MM/YYYY"
                    color="gold"
                    v-model="qrCodeTransferForm.transferDate"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="gold" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row items-center q-px-md">
        <div class="col-3">
          <div class="text-trapped-darkness">
            สลิปการโอน<span class="text-red">*</span>
          </div>
        </div>
        <div class="row col-9">
          <q-file
            class="text-black"
            borderless
            label="Upload File"
            label-color="gold"
            dense
            multiple
            append
            use-chips
            v-model="qrCodeTransferForm.transferFiles"
          >
            <template v-slot:prepend>
              <q-icon name="attachment" color="smokey-grey" />
            </template>
          </q-file>
        </div>
      </div>
      <div class="text-center q-mt-xl q-mb-sm">
        <q-btn
          class="bg-green text-white"
          style="width: 160px"
          @click="createOrder()"
        >
          แจ้งโอน
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import store from "@/store";
import { onMounted, ref, computed, onUnmounted, reactive, watch } from "vue";
import commonFunctions from "@/utils/commonFunctions";
import date from "@/utils/date";
import { $api } from "@/services/api";
export default {
  props: ["shippingAddressId"],
  setup(props) {
    const { currencyFormat, showNotification, redirect } = commonFunctions();
    const { getCurrentDateInDDMMYYYYFormat, increaseDateByDays } = date();
    const deliveryDate = computed(() =>
      increaseDateByDays(getCurrentDateInDDMMYYYYFormat(), 7)
    );
    const paymentMethod = ref("bank-transfer");
    const bankTransferForm = reactive({
      bankType: "kasikorn",
      transferAmount: "",
      transferDate: "",
      transferFiles: [],
    });
    const qrCodeTransferForm = reactive({
      transferAmount: "",
      transferDate: "",
      transferFiles: [],
    });
    const showBankTransferPaymentDialog = ref(false);
    const showQrCodePaymentDialog = ref(false);
    const totalPrice = computed(() =>
      store.getters.cart.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    );
    const orderStatusTitles = ref([
      "ตรวจสอบการชำระเงิน",
      "เตรียมการจัดส่งสินค้า",
      "ยืนยันการจัดส่ง",
    ]);
    const pay = () => {
      if (paymentMethod.value === "bank-transfer") {
        showBankTransferPaymentDialog.value = true;
      } else if (paymentMethod.value === "qr-code") {
        showQrCodePaymentDialog.value = true;
      }
    };
    const validateInformation = () => {
      if (paymentMethod.value === "bank-transfer") {
        if (
          bankTransferForm.bankType &&
          bankTransferForm.transferAmount &&
          bankTransferForm.transferDate &&
          bankTransferForm.transferFiles.length
        ) {
          return true;
        } else {
          return false;
        }
      } else if (paymentMethod.value === "qr-code") {
        if (
          qrCodeTransferForm.transferAmount &&
          qrCodeTransferForm.transferDate &&
          qrCodeTransferForm.transferFiles.length
        ) {
          return true;
        } else {
          return false;
        }
      }
    };
    const createOrder = async () => {
      // create order
      try {
        const isValid = validateInformation();
        if (isValid) {
          const response = await $api.orders.create({
            tracking_number: "",
            tracking_url: "",
            order_number: "",
            delivered_by: "",
            delivery_status: "กำลังดำเนินการ",
            shipping_address_id: props.shippingAddressId,
            user_id: store.getters.userInfo.id,
            created_by: `${store.getters.userInfo.first_name} ${store.getters.userInfo.last_name}`,
            is_active: true,
          });
          if (response && response.status === 201) {
            // Create file
            const formData = new FormData();
            if (bankTransferForm.transferFiles.length) {
              formData.append("file", bankTransferForm.transferFiles[0]);          
            } else if (qrCodeTransferForm.transferAmount.length) {
              formData.append("file", qrCodeTransferForm.transferAmount[0]);  
            }
            formData.append("key_ref", response.data.id);
            formData.append("origin", "payment-method");
            await $api.files.create(formData);
            // patch order number
            await $api.orders.update({
              id: response.data.id,
              order_number: `A${response.data.id}`,
            });
            // create order products
            for (const product of store.getters.cart) {
              await $api.order_products.create({
                order_id: response.data.id,
                product_id: product.id,
                quantity: Number(product.quantity),
                is_active: true,
              });
              for (let i = 0; i < product.quantity; i++) {
                await $api.warranty_cards.create({
                  user_id: store.getters.userInfo.id,
                  product_id: product.id,
                  product_code: "",
                  start_date: getCurrentDateInDDMMYYYYFormat(),
                  expiry_date: increaseDateByDays(
                    getCurrentDateInDDMMYYYYFormat(),
                    720
                  ),
                  product_history: "",
                  created_by: `${store.getters.userInfo.first_name} ${store.getters.userInfo.last_name}`,
                  is_active: true,
                });
              }
            }
            // create order statuses
            for (const [index, status] of orderStatusTitles.value.entries()) {
              await $api.order_statuses.create({
                order_id: response.data.id,
                title: status,
                status: index === 0 ? "Waiting" : "",
                sequence: index + 1,
                is_active: index === 0 ? true : false,
              });
            }
          }
          store.dispatch("clearCart");
          redirect("/track-orders");
          showNotification("positive", "แจ้งโอนสำเร็จ!");
        } else {
          showNotification("negative", "กรุณากรอกข้อมูลให้ครบก่อนแจ้งโอน!");
          return;
        }
      } catch (error) {
        console.log(error);
        showNotification("positive", "แจ้งโอนล้มเหลว!");
      }
      showBankTransferPaymentDialog.value = false;
      showQrCodePaymentDialog.value = false;
    };
    onMounted(() => {
      store.dispatch("updateBreadCrumbs", [
        "ตะกร้าสินค้าของฉัน",
        "ที่อยู่จัดส่ง",
        "วิธีการชำระเงิน",
      ]);
      bankTransferForm.transferDate = getCurrentDateInDDMMYYYYFormat();
      qrCodeTransferForm.transferDate = getCurrentDateInDDMMYYYYFormat();
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    watch(() => bankTransferForm.transferFiles, (value) =>
      console.log("value: ", value)
    );
    return {
      products,
      paymentMethod,
      pay,
      showBankTransferPaymentDialog,
      showQrCodePaymentDialog,
      totalPrice,
      currencyFormat,
      createOrder,
      bankTransferForm,
      qrCodeTransferForm,
      deliveryDate,
    };
  },
};
const products = [
  {
    id: 1,
    name: "HA-923D50ML",
    src: "@/assets/products/HA-923D50ML.png",
    description: "lorem ipsum",
    price: "15,000",
  },
  {
    id: 2,
    name: "HA-923D50M",
    src: "@/assets/products/HA-923D50M.png",
    description: "lorem ipsum",
    price: "15,000",
  },
  {
    id: 3,
    name: "HA-923B50ML",
    src: "@/assets/products/HA-923B50ML.jpg",
    description: "lorem ipsum",
    price: "15,000",
  },
  {
    id: 4,
    name: "HA-554D50",
    src: "@/assets/products/HA-554D50.jpg",
    description: "lorem ipsum",
    price: "15,000",
  },
  {
    id: 5,
    name: "HA-754B20M",
    src: "@/assets/products/HA-754B20M.jpg",
    description: "lorem ipsum",
    price: "19,999",
  },
];
</script>
