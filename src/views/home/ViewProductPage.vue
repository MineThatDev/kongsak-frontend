<template>
  <q-page padding>
    <div class="row">
      <div
        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 flex flex-center"
        style="padding: 120px"
      >
        <q-img
          :src="createUrlFromBase64(product.content)"
          :ratio="1"
          style="min-width: 240px"
          :style="$q.screen.gt.xs ? '' : 'height:120px'"
        />
      </div>
      <div
        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-lg"
        style="padding-top: 20px"
      >
        <div class="font-kongsak-bold font-size-24">{{ product.name }}</div>
        <div class="font-kongsak-bold font-size-18 q-my-md text-cedar-plank">
          {{ product.brand }}
        </div>
        <div
          v-for="(detail, index) in details"
          :key="index"
          class="font-kongsak-bold font-size-18 text-cedar-plank"
        >
          - {{ detail }}
        </div>
        <div class="font-kongsak-bold font-size-24 q-my-xl text-pumping-spice">
          ราคา: {{ product.price }} บาท
        </div>
        <div class="text-center">
          <span class="font-kongsak-bold font-size-18 text-cedar-plank"
            >จำนวน</span
          ><q-icon
            v-if="$q.screen.gt.xs"
            name="remove_circle"
            size="40px"
            class="q-mx-lg cursor-pointer"
            @click="decreaseQuantity()"
          />
          <q-icon
            v-else
            name="remove_circle"
            size="24px"
            class="q-mx-md cursor-pointer"
            @click="decreaseQuantity()"
          />
          <span
            class="font-kongsak-bold font-size-18 q-my-xl text-pumping-spice"
            >{{ quantity }}</span
          >
          <q-icon
            v-if="$q.screen.gt.xs"
            name="add_circle"
            size="40px"
            class="q-mx-lg cursor-pointer"
            @click="increaseQuantity()"
          />
          <q-icon
            v-else
            name="add_circle"
            size="24px"
            class="q-mx-md cursor-pointer"
            @click="increaseQuantity()"
          />
        </div>
        <div class="row q-mt-xl">
          <div class="col-6 flex flex-center">
            <q-btn
              v-if="$q.screen.gt.xs"
              class="bg-cedar-plank text-white btn-radius"
              icon="shopping_cart"
              style="min-width: 160px"
              @click="addItemToCart(product)"
              >เพิ่มไปยังรถเข็น</q-btn
            >
            <q-btn
              v-else
              class="bg-cedar-plank text-white btn-radius"
              icon="shopping_cart"
              style="min-width: 80px"
              @click="addItemToCart(product)"
              >เพิ่ม</q-btn
            >
          </div>
          <div class="col-6 flex flex-center">
            <q-btn
              v-if="$q.screen.gt.xs"
              class="bg-pumping-spice text-white btn-radius"
              style="min-width: 160px"
              @click="addItemToCart(product, '/cart')"
              >ซื้อเลย</q-btn
            >
            <q-btn
              v-else
              class="bg-pumping-spice text-white btn-radius"
              style="min-width: 80px"
              @click="addItemToCart(product, '/cart')"
              >ซื้อเลย</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { $api } from "@/services/api";
import { ref, onMounted, onUnmounted } from "vue";
import commonFunctions from "@/utils/common-function";
import store from "@/store";
import handleFile from "@/utils/file";
export default {
  props: ["productId"],
  setup(props) {
    const {
      handleImageSrc,
      redirect,
      showSpinnerIosLoading,
      hideSpinnerIosLoading,
      showNotification,
    } = commonFunctions();
    const { createUrlFromBase64 } = handleFile();
    const product = ref({});
    const quantity = ref(1);
    const details = ref([]);
    const getProduct = async (id) => {
      showSpinnerIosLoading();
      const productRes = await $api.products.getById(id);
      const imageRes = await $api.files.getByParams({
        key_ref: productRes.id,
        origin: "product",
      });
      product.value = {
        ...productRes,
        content: imageRes && imageRes[0] ? imageRes[0].content : null,
      };
      details.value = product.value.model
        .split("-")
        .filter(Boolean)
        .map((item) => item.trim());
      hideSpinnerIosLoading();
    };
    const addItemToCart = (item, path = "") => {
      if (quantity.value > 10) {
        showNotification(
          "negative",
          "เนื่องจากสั่งซื้อเกิน 10 ชิ้น กรุณาติดต่อทางร้าน !"
        );
      } else {
        if (path) {
          if (Object.keys(store.getters.userInfo).length) {
            store.dispatch("addItemToCart", {
              ...item,
              quantity: quantity.value,
            });
            showNotification("positive", "เพิ่มสินค้าเรียบร้อยแล้ว !");
          }
          redirect(path); 
        } else {
          store.dispatch("addItemToCart", {
            ...item,
            quantity: quantity.value,
          });
          showNotification("positive", "เพิ่มสินค้าเรียบร้อยแล้ว !");
        }
      }
    };
    const increaseQuantity = () => {
      quantity.value++;
    };
    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", ["รายละเอียดสินค้า"]);
      await getProduct(props.productId);
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {
      product,
      handleImageSrc,
      quantity,
      increaseQuantity,
      decreaseQuantity,
      addItemToCart,
      details,
      createUrlFromBase64,
    };
  },
};
</script>
