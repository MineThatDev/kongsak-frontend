<template>
    <q-page padding>
      <div class="row q-mt-lg">
        <div class="col-3">
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
        </div>
        <div class="row col-9" v-if="products.length">
          <div
            v-for="(item, index) in products"
            :key="index"
            class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 q-px-sm"
          >
            <q-card
              class="card-radius q-mt-md cursor-pointer"
              @click="redirect('/view-product', item.id)"
              v-if="item.is_active"
            >
              <q-card-section align="center" class="q-pa-lg">
                <q-img :src="handleImageSrc(item.src)" />
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <div class="text-weight-bold font-size-16 ellipsis-2-lines">
                  {{ item.name }}
                  <q-tooltip transition-show="scale" transition-hide="scale">
                    {{ item.name }}
                  </q-tooltip>
                </div>
                <div class="font-size-16">
                  {{ item.brand }}
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
                <q-img :src="handleImageSrc(item.src)" />
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <div class="text-weight-bold font-size-16 ellipsis-2-lines">
                  {{ item.name }}
                  <q-tooltip transition-show="scale" transition-hide="scale">
                    {{ item.name }}
                  </q-tooltip>
                </div>
                <div class="font-size-16">
                  {{ item.brand }}
                </div>
                <div class="text-weight-bold font-size-16 text-pumping-spice">
                  ราคา {{ currencyFormat(item.price) }} บาท
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div v-else class="col-9 flex flex-center">
          <div class="font-size-24">ไม่มีสินค้าในหมวดนี้</div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import store from "@/store";
  import commonFunctions from "@/utils/common-function";
  import { $api } from "@/services/api";
  import { ref, onMounted, onUnmounted, watch } from "vue";
  export default {
    props: ["searchKeyword"],
    setup(props) {
      const { handleImageSrc, currencyFormat, redirect } = commonFunctions();
      const products = ref([]);
      const fetchProducts = async () => {
        const { data: response } = await $api.products.getByParams({
          name: props.searchKeyword ? { $regex: props.searchKeyword} : null, 
        });
        products.value = response
      };
      watch(() => props.searchKeyword, async() => {
        await fetchProducts();
      })
      onMounted(async () => {
        store.dispatch("updateBreadCrumbs", ["ผลลัพธ์การค้นหา"]);
        await fetchProducts();
      });
      onUnmounted(() => {
        store.dispatch("clearBreadCrumbs");
      });
      return { products, handleImageSrc, currencyFormat, redirect };
    },
  };
  </script>
  