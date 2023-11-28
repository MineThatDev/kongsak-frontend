<template>
  <q-page padding>
    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 flex flex-center" style="padding: 120px">
        <q-img :src="createUrlFromBase64(product.content)" :ratio="1" />
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-px-lg" style="padding-top: 20px">
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
            name="remove_circle"
            size="40px"
            class="q-mx-lg cursor-pointer"
            @click="decreaseQuantity()"
          /><span
            class="font-kongsak-bold font-size-18 q-my-xl text-pumping-spice"
            >{{ quantity }}</span
          >
          <q-icon
            name="add_circle"
            size="40px"
            class="q-mx-lg cursor-pointer"
            @click="increaseQuantity()"
          />
        </div>
        <div class="row q-mt-xl">
          <div class="col-6 flex flex-center">
            <q-btn
              class="bg-cedar-plank text-white btn-radius"
              icon="shopping_cart"
              style="min-width: 160px"
              @click="addItemToCart(product)"
              >เพิ่มไปยังรถเข็น</q-btn
            >
          </div>
          <div class="col-6 flex flex-center">
            <q-btn
              class="bg-pumping-spice text-white btn-radius"
              style="min-width: 160px"
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
import commonFunctions from "@/utils/commonFunctions";
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
      store.dispatch("addItemToCart", { ...item, quantity: quantity.value });
      if (path) {
        redirect(path);
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
