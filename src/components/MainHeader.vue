<template>
  <q-toolbar class="shadow-1">
    <div @click="redirect('/')" class="cursor-pointer">
      <span class="text-trapped-darkness font-size-28 text-weight-bold"
        >KONG</span
      ><span class="text-pumping-spice font-size-28 text-weight-bold">SAK</span>
    </div>
    <q-space />
    <q-tabs v-model="tab" v-if="!userInfo || userInfo.role === 'user'">
      <q-tab
        v-for="(info, index) in userTabsInformation"
        :key="index"
        :name="info.path"
        :label="info.name"
        @click="redirect(info.path)"
      />
      <!-- <div>
        <q-btn icon="search" flat v-if="!toggleSearch" @click="toggleSearch = true;"></q-btn>
        <q-input v-else color="dark" v-model="searchKeyword" dense outlined autofocus @blur="toggleSearch = false; searchKeyword = '';" @keydown.enter.prevent="redirect('/search-page', searchKeyword);">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div> -->
      <q-separator vertical inset />
      <div>
        <q-btn icon="shopping_bag" @click="redirect('/cart')" flat>
          <q-badge class="bg-pumping-spice" floating transparent>
            {{ cartLength }}
          </q-badge>
        </q-btn>
      </div>
      <q-separator vertical inset />
      <!-- <q-tab name="favorite" icon="favorite_border"></q-tab> -->
      <div v-if="!userInfo" class="q-pl-md">
        <q-btn
          class="bg-trapped-darkness text-white btn-radius"
          @click="redirect('/login')"
          ><span class="font-size-12">เข้าสู่ระบบ</span></q-btn
        >
      </div>
      <div v-else>
        <q-btn-dropdown auto-close flat icon="account_circle">
          <q-list>
            <q-item clickable @click="redirect('/track-orders')">
              <q-item-section>ติดตามคำสั่งซื้อ</q-item-section>
            </q-item>

            <q-item clickable @click="redirect('/warranty-card')">
              <q-item-section>ใบประกันสินค้า</q-item-section>
            </q-item>

            <q-item clickable @click="logout()">
              <q-item-section>ออกจากระบบ</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-tabs>
    <q-tabs v-model="tab" v-if="userInfo.role === 'admin'">
      <q-tab
        v-for="(info, index) in adminTabsInformation"
        :key="index"
        :name="info.path"
        :label="info.name"
        @click="redirect(info.path)"
      />
      <q-separator vertical inset />
      <q-separator vertical inset />
      <div v-if="!userInfo" class="q-pl-md">
        <q-btn
          class="bg-trapped-darkness text-white btn-radius"
          @click="redirect('/login')"
          ><span class="font-size-12">เข้าสู่ระบบ</span></q-btn
        >
      </div>
      <div v-else>
        <q-btn-dropdown auto-close flat icon="account_circle">
          <q-list>
            <q-item clickable @click="logout()">
              <q-item-section>ออกจากระบบ</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-tabs>
  </q-toolbar>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import commonFunctions from "@/utils/commonFunctions";
import role from "@/utils/role";
import store from "@/store";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import auth from "@/utils/auth";
const { checkLoginState } = auth();

export default {
  setup() {
    const { redirect } = commonFunctions();
    const { permission } = role();
    const $q = useQuasar();
    const route = useRoute();
    const userInfo = computed(() => store.getters.userInfo);
    const cartLength = computed(() => store.getters.cart.length);
    const currentPath = computed(() => route.path);
    const toggleSearch = ref(false);
    const tab = ref("");
    //const searchKeyword = ref("");
    const handlePathActive = () => {
      const isUserPathMatched = userTabsInformation.some(
        (tab) => tab.path === currentPath.value
      );
      const isAdminPathMatched = adminTabsInformation.some(
        (tab) => tab.path === currentPath.value
      );
      if (isUserPathMatched || isAdminPathMatched) {
        tab.value = currentPath.value;
      } else {
        tab.value = "";
      }
    };
    const logout = async () => {
      $q.dialog({
        title: "ออกจากระบบ",
        message: "ต้องการออกจากระบบหรือไม่?",
        ok: "ยืนยัน",
        cancel: "ยกเลิก",
      }).onOk(() => {
        checkLoginState((response => {
          if (response && response.status === "connected") {
            // eslint-disable-next-line no-undef
            FB.logout();
          }
          store.dispatch("logout");
        }))
        $q.notify({
          message: "ออกจากระบบสำเร็จ!",
          position: "top",
          type: "positive",
        });
        redirect("/home");
        store.dispatch("clearCart");
      });
    };
    watch(currentPath, () => {
      handlePathActive();
    });
    onMounted(() => {
      handlePathActive();
    });
    return {
      tab,
      userTabsInformation,
      adminTabsInformation,
      permission,
      redirect,
      userInfo,
      cartLength,
      logout,
      toggleSearch,
      //searchKeyword
    };
  },
};

const userTabsInformation = [
  {
    name: "กล้องวงจรปิด",
    path: "/cctv",
  },
  {
    name: "เครื่องบันทึกภาพ",
    path: "/dvr",
  },
  {
    name: "อุปกรณ์อื่นๆ",
    path: "/etc",
  },
  {
    name: "ติดต่อเรา",
    path: "/contact-us",
  },
];
const adminTabsInformation = [
  {
    name: "รายการคำสั่งซื้อ",
    path: "/admin-track-orders",
  },
  {
    name: "ใบรับประกัน",
    path: "/admin-warranty-card",
  },
  {
    name: "สินค้าทั้งหมด",
    path: "/all-products",
  },
  // {
  //   name: "ข้อมูลสมาชิก",
  //   path: "/member-information",
  // },
  // {
  //   name: "ข้อมูลสถิติ",
  //   path: "/statistical-information",
  // },
];
</script>
