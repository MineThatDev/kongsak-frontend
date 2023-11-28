<template>
  <q-page class="row">
    <div class="col-7-xl col-lg-7 col-md-6 col-sm-12 col-xs-12">
      <div class="row items-center q-mt-md q-mb-xl" style="padding-left: 40px">
        <div class="font-size-24 text-weight-bold text-black">
          ตะกร้าสินค้าของฉัน
        </div>
      </div>
      <div
        v-for="(product, index) in cart"
        :key="index"
        class="row items-center q-mt-lg q-mb-md"
      >
        <div v-if="index !== 0" class="col-12">
          <q-separator />
        </div>
        <div class="col-3 flex flex-center">
          <q-img
            :src="createUrlFromBase64(product.content)"
            height="100px"
            width="100px"
            :ratio="1"
          />
        </div>
        <div class="col-9 q-px-xl q-pt-md">
          <div class="row justify-between">
            <div class="text-trapped-darkness text-weight-bold font-size-18">
              {{ product.name }}
            </div>
            <div class="text-pumping-spice text-weight-bold font-size-18">
              ราคา {{ currencyFormat(product.price * product.quantity) }} บาท
            </div>
          </div>
          <div class="row items-center q-mt-sm">
            <div class="text-cedar-plank font-size-16">
              ยี่ห้อ: {{ product.brand }}
            </div>
          </div>
          <div class="row items-center q-mb-sm">
            <div class="text-cedar-plank font-size-16">
              รุ่น: {{ product.model }}
            </div>
          </div>
          <div class="row items-center q-gutter-md">
            <div
              style="height: 40px; width: 120px"
              class="row wrapper-add-remove-icon"
            >
              <div
                class="col-4 flex flex-center cursor-pointer"
                @click="decreaseQuantity(product.id)"
              >
                <q-icon name="remove" size="18px" />
              </div>
              <div class="col-4 flex flex-center">
                <div class="text-weight-bold font-size-16">
                  {{ product.quantity }}
                </div>
              </div>
              <div
                class="col-4 flex flex-center cursor-pointer"
                @click="increaseQuantity(product.id)"
              >
                <q-icon name="add" size="18px" />
              </div>
            </div>
            <div
              class="text-pumping-spice text-weight-bold font-size-16 cursor-pointer"
              @click="removeItemInCart(product.id)"
            >
              ลบสินค้า
            </div>
          </div>
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
          <div class="font-size-18" v-if="cart.length">{{ deliveryDate }}</div>
        </div>
        <div class="row q-mt-lg">
          <q-btn
            class="bg-trapped-darkness text-white full-width"
            @click="confirmOrder()"
            >สั่งซื้อสินค้า</q-btn
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import store from "@/store";
import commonFunctions from "@/utils/commonFunctions";
import date from "@/utils/date";
import { onMounted, onUnmounted, computed } from "vue";
import handleFile from "@/utils/file";
export default {
  setup() {
    const { handleImageSrc, redirect, currencyFormat, showNotification } =
      commonFunctions();
    const { createUrlFromBase64 } = handleFile();
    const { increaseDateByDays, getCurrentDateInDDMMYYYYFormat } = date();
    const cart = computed(() => store.getters.cart);
    const totalPrice = computed(() =>
      store.getters.cart.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    );
    const deliveryDate = computed(() =>
      increaseDateByDays(getCurrentDateInDDMMYYYYFormat(), 7)
    );
    const removeItemInCart = (id) => {
      store.dispatch("removeItemInCart", id);
    };
    const increaseQuantity = (id) => {
      store.dispatch("increaseQuantity", id);
    };
    const decreaseQuantity = (id) => {
      store.dispatch("decreaseQuantity", id);
    };
    const confirmOrder = () => {
      if (store.getters.cart.length) {
        redirect("/cart/delivery-address");
      } else {
        showNotification("negative", "กรุณาเลือกสินค้าก่อนสั่งซื้อ!");
      }
    };
    onMounted(() => {
      store.dispatch("updateBreadCrumbs", ["ตะกร้าสินค้าของฉัน"]);
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {
      handleImageSrc,
      redirect,
      cart,
      removeItemInCart,
      currencyFormat,
      increaseQuantity,
      decreaseQuantity,
      totalPrice,
      deliveryDate,
      confirmOrder,
      createUrlFromBase64
    };
  },
};
</script>
