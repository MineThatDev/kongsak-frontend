<template>
  <q-page padding class="bg-kongsak-color">
    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="q-mt-lg font-size-44 text-pumping-spice">
          ศูนย์รวมกล้องวงจรปิด
        </div>
        <div class="font-size-44">คุณภาพระดับมืออาชีพ</div>
        <div class="font-size-44">ในราคาที่คุ้มค่า</div>
        <div class="q-mt-md font-size-24">
          เรามีกล้องวงจรปิดที่มีคุณภาพสูงและเทคโนโลยีที่ล้ำสมัย
        </div>
        <div class="font-size-24">ให้คุณในราคาที่เหมาะสมกับงบประมาณของคุณ</div>
      </div>
      <div class="col">
        <div class="full-width text-right">
          <q-img
            style="max-width: 360px"
            height="360px"
            :ratio="1"
            src="../../assets/banner.png"
          ></q-img>
        </div>
        <div class="full-width text-right">
          <q-img height="80px" :ratio="1" src="../../assets/logos.svg"></q-img>
        </div>
      </div>
    </div>

    <div v-if="userInfo.role !== 'admin'">
      <div class="row q-mt-lg font-size-28 text-pumping-spice">สินค้าแนะนำ</div>
      <div class="row q-mt-lg">
        <div
          v-for="(item, index) in products"
          :key="index"
          class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12 q-px-sm q-mt-md"
        >
          <q-card
            class="card-radius"
            @click="redirect('/view-product', item.id)"
          >
            <div class="cursor-pointer">
              <q-card-section align="center" class="q-pa-lg">
                <q-img :src="createUrlFromBase64(item.content)" />
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
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <div class="font-size-28 text-pumping-spice q-mt-xl q-mb-md">
      บริการของเรา
    </div>
    <div style="background-color: #f9f7f7" class="q-pb-md">
      <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-12 text-center">
          <div class="q-my-md">
            <q-icon name="settings" size="48px"></q-icon>
          </div>
          <div class="text-trapped-darkness text-weight-bold font-size-16">
            รับติดตั้งกล้องวงจรปิด
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            ให้บริการการติดตั้งกล้องวงจรปิด
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            และปรับแต่งระบบให้เหมาะสมกับ
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            ความต้องการของคุณ
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-12 text-center">
          <div class="q-my-md">
            <q-icon name="forum" size="48px"></q-icon>
          </div>
          <div class="text-trapped-darkness text-weight-bold font-size-16">
            ให้คำปรึกษาทางเทคนิค
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            โดยทีมงานที่เชี่ยวชาญทางเทคนิคที่
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            พร้อมให้คำแนะนำเกี่ยวกับ
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            การเลือกและการใช้งาน
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            กล้องวงจรปิดอย่างมีประสิทธิภาพ
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-12 text-center">
          <div class="q-my-md">
            <q-icon name="thumb_up" size="48px"></q-icon>
          </div>
          <div class="text-trapped-darkness text-weight-bold font-size-16">
            รับประกันคุณภาพ
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            คุณภาพที่มั่นใจ
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            บริการที่เชื่อถือได้
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            พร้อมการรับประกันที่ดีที่สุด
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-12 text-center">
          <div class="q-my-md">
            <q-icon name="support_agent" size="48px"></q-icon>
          </div>
          <div class="text-trapped-darkness text-weight-bold font-size-16">
            บริการหลังการขาย
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            ความเอาใจใส่และความพร้อม
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            ให้บริการหลังการขาย
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            ที่มีมาตรฐานสูงเพื่อ
          </div>
          <div class="q-mt-sm text-grey text-weight-bold font-size-16">
            ความพึงพอใจของลูกค้า
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import commonFunctions from "@/utils/common-function";
import store from "@/store";
import { computed, ref, onMounted } from "vue";
import { $api } from "@/services/api";
import handleFile from "@/utils/file";
export default {
  setup() {
    const {
      handleImageSrc,
      currencyFormat,
      redirect,
      showSpinnerIosLoading,
      hideSpinnerIosLoading,
    } = commonFunctions();
    const { createUrlFromBase64 } = handleFile();
    const userInfo = computed(() => store.getters.userInfo);
    const products = ref([]);
    const fetchInformation = async () => {
      showSpinnerIosLoading();
      products.value = [];

      const productsRes = await $api.products.getByParams({
        is_active: true,
      });
      let randomizedProductIndex;
      while (products.value.length < 6) {
        randomizedProductIndex =
          Math.floor(Math.random() * productsRes.length);
        if (
          products.value.some(
            (product) => product.id === productsRes[randomizedProductIndex].id
          )
        ) {
          continue;
        } else {
          const imageRes = await $api.files.getByParams({
            key_ref: productsRes[randomizedProductIndex].id,
            origin: "product",
          });
          products.value.push({
            ...productsRes[randomizedProductIndex],
            content: imageRes && imageRes[0] ? imageRes[0].content : null,
          });
        }
      }
      hideSpinnerIosLoading();
    };
    onMounted(async () => {
      await fetchInformation();
    });
    return {
      products,
      handleImageSrc,
      userInfo,
      currencyFormat,
      redirect,
      createUrlFromBase64,
    };
  },
};
</script>
