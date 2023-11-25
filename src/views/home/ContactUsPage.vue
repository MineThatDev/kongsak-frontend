<template>
  <q-page padding class="bg-kongsak-color">
    <div
      class="q-mt-md text-center text-trapped-darkness font-size-28 text-weight-bold"
    >
      ไม่ว่าคำถามหรือปัญหาของคุณจะเป็นอย่างไร
    </div>
    <div
      class="q-mt-sm text-center text-pumping-spice font-size-28 text-weight-bold"
    >
      เราพร้อมให้บริการและตอบคำถามของคุณ
    </div>
    <div class="row q-mt-xl">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 flex flex-center q-my-md">
        <q-card class="card-contact-us card-radius cursor-pointer">
          <q-card-section style="height: 40%" class="flex flex-center">
            <div class="text-center">
              <div><q-icon name="mail" size="46px" color="red-12"></q-icon></div>
            </div>
          </q-card-section>
          <q-card-section style="height: 60%" class="text-center">
            <div class="text-center">
              <div class="q-mb-md">kongsak_2517@hotmail.com</div>
              <div>ส่งคำถามหรือข้อสงสัยของคุณมาที่</div>
              <div>kongsak_2517@hotmail.com</div>
              <div>เราหวังว่าจะได้ช่วยเสมอและตอบโจทย์</div>
              <div>ทุกความต้องการของคุณ</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 flex flex-center q-my-md">
        <q-card class="card-contact-us card-radius cursor-pointer">
          <q-card-section style="height: 40%" class="flex flex-center">
            <div class="text-center">
              <div><q-icon name="phone" size="46px" color="red-12"></q-icon></div>
            </div>
          </q-card-section>
          <q-card-section style="height: 60%" class="text-center">
            <div class="text-center">
              <div class="q-mb-md">081-234-5678</div>
              <div>เวลาทำการ:</div>
              <div>จันทร์-ศุกร์: 09.00-18.00 น.</div>
              <div>เสาร์: 10.00 - 16.00 น.</div>
              <div>อาทิตย์: ปิดทำการ</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 flex flex-center q-my-md">
        <q-card class="card-contact-us card-radius cursor-pointer">
          <q-card-section style="height: 40%" class="flex flex-center">
            <div class="text-center">
              <div><q-icon name="place" size="46px" color="red-12"></q-icon></div>
            </div>
          </q-card-section>
          <q-card-section style="height: 60%" class="text-center">
            <div class="text-center">
              <div>เลขที่ 2 ซอยสมเด็จพระเจ้าตากสิน25</div>
              <div>แขวงบุคคโล ถนนสมเด็จพระเจ้าตากสิน</div>
              <div>เขตธนบุรี กรุงเทพมหานคร</div>
              <div class="q-mt-lg">
                <q-btn class="bg-trapped-darkness text-white btn-radius" href="https://www.google.co.th/maps/search/%E0%B9%80%E0%B8%A5%E0%B8%82%E0%B8%97%E0%B8%B5%E0%B9%88+2+%E0%B8%8B%E0%B8%AD%E0%B8%A2%E0%B8%AA%E0%B8%A1%E0%B9%80%E0%B8%94%E0%B9%87%E0%B8%88%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%95%E0%B8%B2%E0%B8%81%E0%B8%AA%E0%B8%B4%E0%B8%99+25+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B9%80%E0%B8%94%E0%B9%87%E0%B8%88%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%95%E0%B8%B2%E0%B8%81%E0%B8%AA%E0%B8%B4%E0%B8%99+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B9%82%E0%B8%A5+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%98%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5+%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3/@13.7067472,100.484624,17z/data=!3m1!4b1?hl=th&entry=ttu" target="_blank">นำทางโดย Google Maps</q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import store from "@/store";
import { onMounted, onUnmounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      store.dispatch("updateBreadCrumbs", ["ติดต่อเรา"]);
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {};
  },
};
</script>
