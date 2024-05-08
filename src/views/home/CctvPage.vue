<template>
  <q-page padding>
    <div class="row">
      <!-- <div class="col-3">
        <div class="row items-center q-mx-md q-mb-md">
          <q-icon name="tune" size="32px" />
          <span class="q-ml-sm font-size-16">ตัวกรอง</span>
        </div>
        <div class="q-px-md" style="max-width: 350px">
          <q-list bordered class="rounded-borders">
            <q-expansion-item>
              <template v-slot:header="{ expanded }">
                <q-item-section> ราคา {{ expanded ? "" : "" }} </q-item-section>
              </template>

              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item>
              <template v-slot:header="{ expanded }">
                <q-item-section>
                  เรียงลำดับ {{ expanded ? "" : "" }}
                </q-item-section>
              </template>

              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item>
              <template v-slot:header="{ expanded }">
                <q-item-section>
                  แบรนด์ {{ expanded ? "" : "" }}
                </q-item-section>
              </template>

              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item>
              <template v-slot:header="{ expanded }">
                <q-item-section> สี {{ expanded ? "" : "" }} </q-item-section>
              </template>

              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item>
              <template v-slot:header="{ expanded }">
                <q-item-section>
                  ประเภท {{ expanded ? "" : "" }}
                </q-item-section>
              </template>

              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div> -->
      <div class="row col-12 justify-end q-px-sm">
        <q-input
          v-model="searchString"
          outlined
          dense
          color="dark"
          label="ค้นหาสินค้า"
          @keydown.enter.prevent="fetchProducts()"
        >
          <template v-slot:append
            ><q-icon
              name="search"
              class="cursor-pointer"
              @click="fetchProducts()"
            ></q-icon
          ></template>
        </q-input>
      </div>
      <div class="row col-12" v-if="products.length">
        <div
          v-for="(item, index) in products"
          :key="index"
          class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12 q-px-sm"
        >
          <q-card
            class="card-radius q-mt-md cursor-pointer"
            @click="redirect('/view-product', item.id)"
            v-if="item.is_active"
          >
            <q-card-section align="center" class="q-pa-lg">
              <q-img
                :src="createUrlFromBase64(item.content)"
              />
            </q-card-section>
            <q-separator inset />
            <q-card-section style="min-height: 176px">
              <div class="text-weight-bold font-size-16 ellipsis-2-lines">
                {{ item.name }}
                <q-tooltip transition-show="scale" transition-hide="scale">
                  {{ item.name }}
                </q-tooltip>
              </div>
              <div class="font-size-16">
                {{ item.brand }}
              </div>
              <div class="font-size-16 ellipsis-2-lines">
                {{ item.model }}
                <q-tooltip transition-show="scale" transition-hide="scale">
                  {{ item.model }}
                </q-tooltip>
              </div>
              <div class="text-weight-bold font-size-16 text-pumping-spice">
                ราคา {{ currencyFormat(item.price) }} บาท
              </div>
            </q-card-section>
          </q-card>
          <q-card class="card-radius q-mt-md" v-if="!item.is_active">
            <div
              style="
                position: absolute;
                top: 45%;
                left: 12%;
                z-index: 2;
                rotate: -30deg;
              "
              class="text-red text-weight-bold font-size-24"
            >
              สินค้ายกเลิกการขาย
            </div>
            <q-card-section align="center" class="q-pa-lg">
              <q-img
                width="180px"
                height="180px"
                :src="createUrlFromBase64(item.content)"
              />
            </q-card-section>
            <q-separator inset />
            <q-card-section style="min-height: 176px">
              <div class="text-weight-bold font-size-16 ellipsis-2-lines">
                {{ item.name }}
                <q-tooltip transition-show="scale" transition-hide="scale">
                  {{ item.name }}
                </q-tooltip>
              </div>
              <div class="font-size-16">
                {{ item.brand }}
              </div>
              <div class="font-size-16 ellipsis-2-lines">
                {{ item.model }}
                <q-tooltip transition-show="scale" transition-hide="scale">
                  {{ item.model }}
                </q-tooltip>
              </div>
              <div class="text-weight-bold font-size-16 text-pumping-spice">
                ราคา {{ currencyFormat(item.price) }} บาท
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div v-else class="col-12 text-center">
        <div class="font-size-24" style="margin-top: 200px">
          ไม่มีสินค้าในหมวดนี้
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import store from "@/store";
import commonFunctions from "@/utils/common-function";
import { $api } from "@/services/api";
import { ref, onMounted, onUnmounted } from "vue";
import handleFile from "@/utils/file";
export default {
  setup() {
    const { handleImageSrc, currencyFormat, redirect, showSpinnerIosLoading, hideSpinnerIosLoading } = commonFunctions();
    const { createUrlFromBase64 } = handleFile();
    const products = ref([]);
    const searchString = ref("");
    const fetchProducts = async () => {
      showSpinnerIosLoading();
      products.value = [];
      const productsRes = await $api.products.getByParams({
        category: "กล้อง",
        name: searchString.value ? { $regex: searchString.value } : null, 
        is_active: true
      });
      for (const product of productsRes) {
        const imageRes = await $api.files.getByParams({
          key_ref: product.id,
          origin: "product",
        });
        products.value.push({
          ...product,
          content: imageRes && imageRes[0] ? imageRes[0].content : null,
        });
      }
      hideSpinnerIosLoading();
    };
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", ["กล้องวงจรปิด"]);
      await fetchProducts();
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {
      products,
      handleImageSrc,
      currencyFormat,
      redirect,
      fetchProducts,
      searchString,
      createUrlFromBase64,
    };
  },
};
</script>
