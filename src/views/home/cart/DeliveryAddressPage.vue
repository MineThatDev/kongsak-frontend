<template>
  <q-page class="row">
    <div class="col-7-xl col-lg-7 col-md-6 col-sm-12 col-xs-12">
      <div
        class="row items-center q-mt-md q-mb-xl"
        :style="$q.screen.gt.xs ? 'padding-left: 40px' : ''"
        :class="$q.screen.gt.xs ? '' : 'justify-center'"
      >
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
            {{ detail.address }} {{ detail.district }} {{ detail.province }} {{ detail.zip_code }}
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
    <div
      class="col-5-xl col-lg-5 col-md-6 col-sm-12 col-xs-12 row justify-center"
    >
      <div class="wrapper-cart-bill q-mt-md q-pa-md">
        <div class="row q-mt-sm">
          <div class="font-size-18 text-weight-bold">ยอดสั่งซื้อรวม</div>
        </div>
        <div class="row q-my-sm justify-between">
          <div class="font-size-18">ราคา</div>
          <div class="font-size-18">
            {{ currencyFormat(totalPrice - totalPrice * 0.07) }}
            บาท
          </div>
        </div>
        <div class="row q-my-sm justify-between">
          <div class="font-size-18">VAT 7%</div>
          <div class="font-size-18 text-green">
            {{ currencyFormat(totalPrice * 0.07) }} บาท
          </div>
        </div>
        <!-- <div class="row q-my-sm justify-between">
          <div class="font-size-18">ส่วนลด</div>
          <div class="font-size-18 text-green">{{ currencyFormat(0) }} บาท</div>
        </div> -->
        <div class="row q-my-sm justify-between">
          <div class="font-size-18">ค่าจัดส่ง</div>
          <div class="font-size-18 text-green">150.00 บาท</div>
        </div>
        <div class="col-12 q-my-sm">
          <q-separator />
        </div>
        <div class="row justify-between q-mt-lg q-mb-sm">
          <div class="font-size-18 text-weight-bold">ยอดรวม</div>
          <div class="font-size-18 text-weight-bold">
            {{ currencyFormat(totalPrice + 150) }} บาท
          </div>
        </div>
        <div class="row items-center justify-between">
          <div class="font-size-18">จัดส่งสินค้าภายในวันที่</div>
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
        style="height: 540px; border-radius: 16px"
        :style="$q.screen.gt.xs ? 'min-width: 40%;' : 'min-width: 80%;'"
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
              <q-input v-model="entryLastName" dense outlined> </q-input>
            </div>
          </div>
          <div class="q-mt-md">
            <span>เบอร์โทรศัพท์: <span class="text-red">*</span></span>
            <q-input v-model="entryPhoneNumber" dense outlined> </q-input>
          </div>
          <div class="q-mt-md">
            <span>รายละเอียดที่อยู่: <span class="text-red">*</span></span>
            <q-input v-model="address" dense outlined></q-input>
          </div>
          <div class="q-mt-md">
            <span>อำเภอ: <span class="text-red">*</span></span>
            <q-input v-model="entryDistrict" dense outlined> </q-input>
          </div>
          <div class="row q-mt-lg">
            <div class="col-6">
              <span>จังหวัด: <span class="text-red">*</span></span>
              <q-input v-model="entryProvince" dense outlined style="max-width: 95%"> </q-input>
            </div>
            <div class="col-6">
              <span>รหัสไปรณีย์: <span class="text-red">*</span></span>
              <q-input v-model="entryZipCode" dense outlined> </q-input>
            </div>
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
import commonFunctions from "@/utils/common-function";
import date from "@/utils/date";
import { onMounted, ref, computed, onUnmounted } from "vue";
import { $api } from "@/services/api";
export default {
  setup() {
    const {
      redirect,
      currencyFormat,
      showNotification,
      showSpinnerIosLoading,
      hideSpinnerIosLoading,
    } = commonFunctions();
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
    const entryDistrict = ref("");
    const entryProvince = ref("");
    const entryZipCode = ref("");
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
        address.value &&
        entryDistrict.value &&
        entryProvince.value &&
        entryZipCode.value
      ) {
        return true;
      } else {
        return false;
      }
    };
    const addNewDeliveryAddress = async () => {
      const isValid = validateDeliveryAddressForm();
      if (isValid) {
        showSpinnerIosLoading();
        const response = await $api.shipping_addresses.create({
          first_name: entryFirstName.value,
          last_name: entryLastName.value,
          phone: entryPhoneNumber.value,
          address: address.value,
          district: entryDistrict.value,
          province: entryProvince.value,
          zip_code: entryZipCode.value,
          user_id: store.getters.userInfo._id,
          is_active: true,
        });
        if (response && response.status === 201) {
          entryId.value = "";
          entryFirstName.value = "";
          entryLastName.value = "";
          entryPhoneNumber.value = "";
          address.value = "";
          entryDistrict.value = "";
          entryProvince.value = "";
          entryZipCode.value = "";
          activeDeliveryPopup.value = false;
          showNotification("positive", "เพิ่มที่อยู่สำเร็จ!");
          await fetchInformation();
        } else {
          showNotification("negative", "เพิ่มที่อยู่ล้มเหลว!");
        }
        hideSpinnerIosLoading();
      } else {
        showNotification("negative", "กรุณากรอกข้อมูลให้ครบ!");
      }
    };
    const removeDeliveryAddress = async (id) => {
      showSpinnerIosLoading();
      const response = await $api.shipping_addresses.delete(id);
      if (response && response.status === 200) {
        showNotification("positive", "ลบที่อยู่สำเร็จ!");
        radioSelected.value = "";
        await fetchInformation();
      } else {
        showNotification("negative", "ลบที่อยู่ล้มเหลว!");
      }
      hideSpinnerIosLoading();
    };
    const editDeliveryAddress = async (id) => {
      const isValid = validateDeliveryAddressForm();
      if (isValid) {
        showSpinnerIosLoading();
        const response = await $api.shipping_addresses.update({
          id: id,
          first_name: entryFirstName.value,
          last_name: entryLastName.value,
          phone: entryPhoneNumber.value,
          address: address.value,
          district: entryDistrict.value,
          province: entryProvince.value,
          zip_code: entryZipCode.value,
        });
        if (response) {
          showNotification("positive", "แก้ไขที่อยู่สำเร็จ!");
          await fetchInformation();
          activeDeliveryPopup.value = false;
        } else {
          showNotification("negative", "แก้ไขที่อยู่ล้มเหลว!");
        }
        hideSpinnerIosLoading();
      } else {
        showNotification("negative", "กรุณากรอกข้อมูลให้ครบ!");
      }
    };
    const activeDeliveryPopup = ref(false);
    const popUpDeliveryAddressForm = async (id) => {
      if (id) {
        // Edit
        showSpinnerIosLoading();
        const shippingAddress = await $api.shipping_addresses.getById(id);
        if (shippingAddress) {
          entryId.value = shippingAddress.id;
          entryFirstName.value = shippingAddress.first_name;
          entryLastName.value = shippingAddress.last_name;
          entryPhoneNumber.value = shippingAddress.phone;
          address.value = shippingAddress.address;
          entryDistrict.value = shippingAddress.district;
          entryProvince.value = shippingAddress.province;
          entryZipCode.value = shippingAddress.zip_code;
        }
        hideSpinnerIosLoading();
      } else {
        // Create
        const user = await $api.users.getById(store.getters.userInfo.id)
        entryId.value = "";
        entryFirstName.value = user.first_name;
        entryLastName.value = user.last_name;
        entryPhoneNumber.value = "";
        address.value = "";
        entryDistrict.value = "";
        entryProvince.value = "";
        entryZipCode.value = "";
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
      entryDistrict,
      entryProvince,
      entryZipCode,
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
