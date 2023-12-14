import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import role from "@/utils/role";
import { Dialog } from "quasar";
const { permission } = role();
const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/HomePage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      },
      {
        path: "/contact-us",
        component: () => import("@/views/home/ContactUsPage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      },
      {
        path: "/cctv",
        component: () => import("@/views/home/CctvPage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      },
      {
        path: "/dvr",
        component: () => import("@/views/home/DvrPage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      },
      {
        path: "/etc",
        component: () => import("@/views/home/EtcPage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      },
      {
        path: "/search-page/:searchKeyword",
        props: true,
        component: () => import("@/views/home/SearchPage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      },
      {
        path: "/track-orders",
        component: () => import("@/views/home/TrackOrdersPage.vue"),
        meta: {
          requireRoles: permission(2),
        },
      },
      {
        path: "/warranty-card",
        component: () => import("@/views/home/WarrantyCardPage.vue"),
        meta: {
          requireRoles: permission(2),
        },
      },
      {
        path: "/view-product/:productId",
        props: true,
        component: () => import("@/views/home/ViewProductPage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      },
      {
        path: "/cart",
        component: () => import("@/views/home/cart/CartPage.vue"),
        meta: {
          requireRoles: permission(2),
        },
      },
      {
        path: "/cart/delivery-address",
        component: () => import("@/views/home/cart/DeliveryAddressPage.vue"),
        meta: {
          requireRoles: permission(2),
        },
      },
      {
        path: "/cart/payment-method/:shippingAddressId",
        props: true,
        component: () => import("@/views/home/cart/PaymentMethodPage.vue"),
        meta: {
          requireRoles: permission(2),
        },
      },
      {
        path: "/admin-track-orders",
        component: () => import("@/views/admin/AdminTrackOrdersPage.vue"),
        meta: {
          requireRoles: permission(3),
        },
      },
      {
        path: "/admin-warranty-card",
        component: () => import("@/views/admin/AdminWarrantyCardPage.vue"),
        meta: {
          requireRoles: permission(3),
        },
      },
      {
        path: "/all-products",
        component: () => import("@/views/admin/AllProductsPage.vue"),
        meta: {
          requireRoles: permission(3),
        },
      },
      {
        path: "/member-information",
        component: () => import("@/views/admin/MemberInformationPage.vue"),
        meta: {
          requireRoles: permission(3),
        },
      },
      {
        path: "/statistical-information",
        component: () => import("@/views/admin/StatisticalInformationPage.vue"),
        meta: {
          requireRoles: permission(3),
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/LoginLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("@/views/login/LoginPage.vue"),
        meta: {
          requireRoles: permission(1),
        },
      }
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireRoles.length) {
    const userRole = store.getters.userInfo.role
      ? store.getters.userInfo.role
      : "guest";
    const isRoleMatched = to.meta.requireRoles.some(
      (role) => role === userRole
    );
    if (isRoleMatched) {
      next();
    } else {
      Dialog.create({
        title: "กรุณาเข้าสู่ระบบ",
        message: "ต้องการไปยังหน้าเข้าสู่ระบบหรือไม่?",
        ok: "เข้าสู่ระบบ",
        cancel: "ยกเลิก",
      }).onOk(() => {
        router.push("/login")
      });
    }
  } else {
    next();
  }
});

export default router;
