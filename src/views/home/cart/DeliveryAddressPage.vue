<template>
  <q-page class="row">
    <div class="col-7-xl col-lg-7 col-md-6 col-sm-12 col-xs-12">
      <div class="row items-center q-mt-md q-mb-xl" style="padding-left: 40px">
        <div class="font-size-24 text-weight-bold text-black">
          ที่อยู่จัดส่ง
        </div>
      </div>
      <div
        class="q-my-lg"
        v-for="(detail, index) in deliveryAddress"
        :key="index"
      >
        <div class="row justify-between items-center q-px-md">
          <div class="row items-center">
            <q-radio v-model="radioSelected" :val="detail.id" color="dark"
              ><span class="font-size-18 text-weight-bold">
                {{ detail.firstName }} {{ detail.lastName }} </span
              ><span> | {{ detail.phone }}</span></q-radio
            >
          </div>
          <div class="row items-center">
            <div
              class="font-size-18 text-weight-bold cursor-pointer"
              @click="popUpDeliveryAddressForm(detail.id)"
            >
              แก้ไข
            </div>
            <div class="q-mx-sm font-size-18">|</div>
            <div
              class="text-pumping-spice font-size-18 text-weight-bold cursor-pointer"
              @click="removeDeliveryAddress(detail.id)"
            >
              ลบที่อยู่
            </div>
          </div>
        </div>
        <div class="row q-px-xl">
          <div class="text-cedar-plank">
            {{ detail.address }}
          </div>
        </div>
      </div>
      <div>
        <q-separator inset />
      </div>
      <div class="row items-center q-my-md q-px-xl">
        <div
          class="font-size-18 text-weight text-green cursor-pointer"
          @click="popUpDeliveryAddressForm()"
        >
          + เพิ่มที่อยู่ใหม่
        </div>
      </div>
    </div>
    <div class="col-5-xl col-lg-5 col-md-6 col-sm-12 col-xs-12 row justify-center">
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
            @click="choosePaymentMethod()"
            >เลือกวิธีชำระเงิน</q-btn
          >
        </div>
      </div>
    </div>
    <q-dialog v-model="activeDeliveryPopup">
      <q-card
        class="q-pa-md"
        style="min-width: 540px; height: 480px; border-radius: 16px"
      >
        <div class="row justify-between items-center">
          <div class="q-pl-md q-pt-md text-trapped-darkness font-size-16">
            เพิ่มที่อยู่การจัดส่งใหม่
          </div>
          <q-btn
            icon="close"
            flat
            size="16px"
            @click="activeDeliveryPopup = false"
          ></q-btn>
        </div>
        <div class="q-px-md">
          <div class="row q-mt-lg">
          <div class="col-6">
            <span>ชื่อ: <span class="text-red">*</span></span>
            <q-input
              v-model="entryFirstName"
              dense
              outlined
              style="max-width: 95%"
            >
            </q-input>
          </div>
          <div class="col-6">
            <span>นามสกุล: <span class="text-red">*</span></span>
            <q-input
              v-model="entryLastName"
              dense
              outlined
            >
            </q-input>
          </div>
        </div>
        <div class="q-mt-md">
          <span>เบอร์โทรศัพท์: <span class="text-red">*</span></span>
          <q-input
            v-model="entryPhoneNumber"
            dense
            outlined
          >
          </q-input>
        </div>
        <div class="q-mt-md">
          <span>รายละเอียดที่อยู่: <span class="text-red">*</span></span>
          <q-input
            type="textarea"
            v-model="address"
            dense
            outlined
          ></q-input>
        </div>
        </div>
        <div class="q-mt-lg row items-center justify-center">
          <q-btn
            @click="
              entryId ? editDeliveryAddress(entryId) : addNewDeliveryAddress()
            "
            class="bg-green text-white btn-radius"
            >{{ entryId ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่" }}</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import store from "@/store";
import commonFunctions from "@/utils/commonFunctions";
import date from "@/utils/date";
import { onMounted, ref, computed, onUnmounted } from "vue";
import { $api } from "@/services/api";
export default {
  setup() {
    const { redirect, currencyFormat, showNotification, showSpinnerIosLoading, hideSpinnerIosLoading } = commonFunctions();
    const { getCurrentDateInDDMMYYYYFormat, increaseDateByDays } = date();
    const totalPrice = computed(() =>
      store.getters.cart.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    );
    const deliveryDate = computed(() =>
      increaseDateByDays(getCurrentDateInDDMMYYYYFormat(), 7)
    );
    const radioSelected = ref("");
    const deliveryAddress = ref([]);
    const entryId = ref();
    const entryFirstName = ref("");
    const entryLastName = ref("");
    const entryPhoneNumber = ref("");
    const address = ref("");
    const fetchInformation = async () => {
      showSpinnerIosLoading();
      deliveryAddress.value = [];
      const response = await $api.shipping_addresses.getByParams({
        user_id: store.getters.userInfo._id,
      });
      if (response && response.length) {
        for (const info of response)
          deliveryAddress.value.push({
            ...info,
            firstName: info.first_name,
            lastName: info.last_name,
            phone: info.phone,
          });
      }
      hideSpinnerIosLoading();
    };
    const validateDeliveryAddressForm = () => {
      if (
        entryFirstName.value &&
        entryLastName.value &&
        entryPhoneNumber.value &&
        address.value
      ) {
        return true;
      } else {
        return false;
      }
    };
    const addNewDeliveryAddress = async () => {
      const isValid = validateDeliveryAddressForm();
      if (isValid) {
        const response = await $api.shipping_addresses.create({
          first_name: entryFirstName.value,
          last_name: entryLastName.value,
          phone: entryPhoneNumber.value,
          address: address.value,
          user_id: store.getters.userInfo._id,
          is_active: true
        });
        if (response && response.status === 201) {
          entryId.value = "";
          entryFirstName.value = "";
          entryLastName.value = "";
          entryPhoneNumber.value = "";
          address.value = "";
          activeDeliveryPopup.value = false;
          showNotification("positive", "เพิ่มที่อยู่สำเร็จ!");
          await fetchInformation();
        } else {
          showNotification("negative", "เพิ่มที่อยู่ล้มเหลว!");
        }
      } else {
        showNotification("negative", "กรุณากรอกข้อมูลให้ครบ!");
      }
    };
    const removeDeliveryAddress = async (id) => {
      const response = await $api.shipping_addresses.delete(id);
      if (response && response.status === 200) {
        showNotification("positive", "ลบที่อยู่สำเร็จ!");
        radioSelected.value = "";
        await fetchInformation();
      } else {
        showNotification("negative", "ลบที่อยู่ล้มเหลว!");
      }
    };
    const editDeliveryAddress = async (id) => {
      const isValid = validateDeliveryAddressForm();
      if (isValid) {
        const response = await $api.shipping_addresses.update({
          id: id,
          first_name: entryFirstName.value,
          last_name: entryLastName.value,
          phone: entryPhoneNumber.value,
          address: address.value,
        });
        if (response) {
          showNotification("positive", "แก้ไขที่อยู่สำเร็จ!");
          await fetchInformation();
          activeDeliveryPopup.value = false;
        } else {
          showNotification("negative", "แก้ไขที่อยู่ล้มเหลว!");
        }
      } else {
        showNotification("negative", "กรุณากรอกข้อมูลให้ครบ!");
      }
    };
    const activeDeliveryPopup = ref(false);
    const popUpDeliveryAddressForm = async (id) => {
      if (id) {
        // Edit
        const shippingAddress = await $api.shipping_addresses.getById(id);
        if (shippingAddress) {
          entryId.value = shippingAddress.id;
          entryFirstName.value = shippingAddress.first_name;
          entryLastName.value = shippingAddress.last_name;
          entryPhoneNumber.value = shippingAddress.phone;
          address.value = shippingAddress.address;
        }
      } else {
        // Create
        entryId.value = "";
        entryFirstName.value = "";
        entryLastName.value = "";
        entryPhoneNumber.value = "";
        address.value = "";
      }
      activeDeliveryPopup.value = true;
    };
    const choosePaymentMethod = () => {
      if (radioSelected.value) {
        redirect("/cart/payment-method", radioSelected.value);
      } else {
        showNotification("negative", "กรุณาเลือกที่อยู่จัดส่ง!");
      }
    };
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", [
        "ตะกร้าสินค้าของฉัน",
        "ที่อยู่จัดส่ง",
      ]);
      await fetchInformation();
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {
      redirect,
      radioSelected,
      deliveryAddress,
      addNewDeliveryAddress,
      popUpDeliveryAddressForm,
      activeDeliveryPopup,
      entryFirstName,
      entryLastName,
      entryPhoneNumber,
      entryId,
      address,
      totalPrice,
      currencyFormat,
      removeDeliveryAddress,
      editDeliveryAddress,
      choosePaymentMethod,
      deliveryDate,
    };
  },
};
</script>
