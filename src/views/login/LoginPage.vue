<template>
  <q-page padding class="bg-kongsak-color">
    <div class="row" style="min-height: 640px">
      <div
        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
        :style="
          $q.screen.gt.xs
            ? `padding: 80px 100px 0 100px`
            : 'padding: 0 10px; margin-top: 10px; text-align: center'
        "
      >
        <div class="text-pumping-spice" :class="$q.screen.gt.md ? 'font-size-40' : 'font-size-28'">
          รู้สึกมั่นใจในทุกช่วงเวลา
        </div>
        <div :class="$q.screen.gt.md ? 'font-size-40' : 'font-size-28'">ด้วยกล้องวงจรปิด</div>
        <div :class="$q.screen.gt.md ? 'font-size-40' : 'font-size-28'">เครื่องบันทึกเสียง</div>
        <div :class="$q.screen.gt.md ? 'font-size-40' : 'font-size-28'">และอุปกรณ์คุณภาพจากเรา</div>
        <div class="q-mt-md font-size-28">
          <q-img
            height="80px"
            style="width: 80%"
            fit
            :ratio="1"
            src="../../assets/logos.png"
          ></q-img>
        </div>
      </div>
      <div
        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 flex flex-center"
      >
        <div
          v-if="showPage === 'login'"
          class="bg-white"
          :style="$q.screen.gt.xs ? 'width: 60%;' : 'width: 80%'"
        >
          <div
            class="q-mt-lg text-weight-bold text-trapped-darkness text-center"
            :class="$q.screen.gt.xs ? 'font-size-28' : 'font-size-20'"
          >
            เข้าสู่ระบบเพื่อเลือกซื้อสินค้า
          </div>
          <div class="row col-12 justify-center q-mt-md">
            <div style="width: 80%">
              <form @submit.prevent.stop="login()">
                <q-input
                  class="q-mt-md"
                  label="ชื่อผู้ใช้หรืออีเมล"
                  filled
                  outlined
                  v-model="loginInformation.username"
                  dense
                  ref="loginUsernameRef"
                  :rules="[(val) => val?.length || 'ชื่อผู้ใช้หรืออีเมล']"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="loginUsernameRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle"></q-icon>
                  </template>
                </q-input>
                <q-input
                  label="รหัสผ่าน"
                  type="password"
                  dense
                  outlined
                  filled
                  class="q-mt-md"
                  v-model="loginInformation.password"
                  ref="loginPasswordRef"
                  :rules="[(val) => val?.length || 'กรุณากรอกรหัสผ่าน']"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="loginPasswordRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="key"></q-icon>
                  </template>
                </q-input>
                <div
                  class="text-right font-size-16 q-mb-md cursor-pointer"
                  style="text-decoration: underline"
                  @click="forgotPassword()"
                >
                  ลืมรหัสผ่าน
                </div>
                <q-btn
                  class="bg-trapped-darkness text-white font-size-20 full-width btn-radius"
                  type="submit"
                  :dense="!$q.screen.gt.xs"
                  >เข้าสู่ระบบ</q-btn
                >
                <div
                  class="text-center font-size-16 text-cedar-plank q-my-md"
                  style="text-decoration: underline"
                >
                  หรือ
                </div>
                <div class="row col-12 justify-center q-mt-md">
                  <div
                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-my-sm text-center font-size-20"
                  >
                    <q-btn
                      label="เข้าสู่ระบบด้วย Google"
                      style="width: 100% !important"
                      icon="img:data:image/png;base64,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"
                      @click="loginGoogle()"
                    >
                    </q-btn>
                    <!-- Google Sign-in (new) -->
                  </div>
                </div>
                <div class="row q-my-md">
                  <div
                    class="row col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 justify-center items-center text-trapped-darkness"
                    :class="$q.screen.gt.xs ? 'font-size-20' : 'font-size-16'"
                  >
                    ยังไม่ได้เป็นสมาชิก ?
                  </div>
                  <div
                    class="row col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 justify-center items-center text-weight-bold text-trapped-darkness cursor-pointer"
                    @click="togglePage('signup')"
                    :class="$q.screen.gt.xs ? 'font-size-20' : 'font-size-16'"
                  >
                    สมัครสมาชิก
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          v-else-if="showPage === 'signup'"
          class="bg-white"
          :style="$q.screen.gt.xs ? 'width: 60%;' : 'width: 80%'"
        >
          <div
            class="text-weight-bold q-mt-sm text-trapped-darkness font-size-28 text-center"
          >
            สมัครสมาชิก
          </div>
          <div class="row col-12 justify-center q-mt-md">
            <div style="width: 80%">
              <form @submit.prevent.stop="signUp()">
                <q-input
                  label="ชื่อ"
                  filled
                  outlined
                  v-model="signupInformation.firstName"
                  dense
                  class="q-mt-md"
                  :rules="[(val) => val?.length || 'กรุณากรอกชื่อ']"
                  ref="signUpFirstNameRef"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="signUpFirstNameRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="person"></q-icon>
                  </template>
                </q-input>
                <q-input
                  label="นามสกุล"
                  filled
                  outlined
                  v-model="signupInformation.lastName"
                  dense
                  class="q-mt-md"
                  :rules="[(val) => val?.length || 'กรุณากรอกนามสกุล']"
                  ref="signUpLastNameRef"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="signUpLastNameRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="person"></q-icon>
                  </template>
                </q-input>
                <q-input
                  label="ชื่อผู้ใช้"
                  outlined
                  filled
                  dense
                  class="q-mt-md"
                  v-model="signupInformation.username"
                  :rules="[(val) => val?.length || 'กรุณากรอกชื่อผู้ใช้']"
                  ref="signUpUsernameRef"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="signUpUsernameRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle"></q-icon>
                  </template>
                </q-input>
                <q-input
                  label="อีเมล"
                  outlined
                  filled
                  class="q-mt-md"
                  dense
                  v-model="signupInformation.email"
                  :rules="[
                    (val) =>
                      (val?.length &&
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          val
                        )) ||
                      'รูปแบบอีเมลไม่ถูกต้อง (ตัวอย่าง example@gmail.com)',
                  ]"
                  ref="signUpEmailRef"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="signUpEmailRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="mail"></q-icon>
                  </template>
                </q-input>
                <q-input
                  label="รหัสผ่าน"
                  type="password"
                  outlined
                  filled
                  dense
                  class="q-mt-md"
                  v-model="signupInformation.password"
                  :rules="[
                    (val) =>
                      val?.length > 7 || 'รหัสผ่านต้องไม่ต่ำกว่า 8 ตัวอักษร',
                  ]"
                  ref="signUpPasswordRef"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="signUpPasswordRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="key"></q-icon>
                  </template>
                </q-input>
                <q-input
                  label="ยืนยันรหัสผ่าน"
                  type="password"
                  outlined
                  filled
                  dense
                  class="q-my-md"
                  v-model="signupInformation.confirmPassword"
                  :rules="[
                    (val) =>
                      val?.length > 7 || 'รหัสผ่านต้องไม่ต่ำกว่า 8 ตัวอักษร',
                  ]"
                  ref="signUpConfirmPasswordRef"
                  hide-bottom-space
                  lazy-rules="ondemand"
                  @focus="signUpConfirmPasswordRef.resetValidation()"
                >
                  <template v-slot:prepend>
                    <q-icon name="key"></q-icon>
                  </template>
                </q-input>
                <q-btn
                  class="bg-trapped-darkness text-white font-size-20 full-width btn-radius q-mt-md"
                  dense
                  type="submit"
                  >สมัครสมาชิก</q-btn
                >
                <div
                  class="text-center font-size-16 text-cedar-plank q-my-md"
                  style="text-decoration: underline"
                >
                  หรือ
                </div>
                <div class="row col-12">
                  <div
                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-my-sm text-center font-size-20"
                  >
                    <q-btn
                      label="เข้าสู่ระบบด้วย Google"
                      style="width: 100% !important"
                      icon="img:data:image/png;base64,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"
                      @click="loginGoogle()"
                    >
                    </q-btn>
                    <!-- Google Sign-in (new) -->
                  </div>
                </div>
                <div class="row q-my-md">
                  <div
                    class="row col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 justify-center items-center text-trapped-darkness"
                    :class="$q.screen.gt.xs ? 'font-size-20' : 'font-size-16'"
                  >
                    เป็นสมาชิกแล้ว
                  </div>
                  <div
                    class="row col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 justify-center items-center text-weight-bold text-trapped-darkness cursor-pointer"
                    :class="$q.screen.gt.xs ? 'font-size-20' : 'font-size-16'"
                    @click="togglePage('login')"
                  >
                    เข้าสู่ระบบ
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="activeForgotPassword">
      <q-card
        class="q-pa-md"
        style="height: 240px; border-radius: 16px"
        :style="$q.screen.gt.xs ? 'min-width: 40%;' : 'min-width: 80%;'"
      >
        <div class="row justify-between items-center">
          <div class="q-pl-md q-pt-md text-trapped-darkness font-size-16">
            หากคุณลืมรหัสผ่าน กรุณากรอกอีเมล
          </div>
          <q-btn
            icon="close"
            flat
            size="16px"
            @click="activeForgotPassword = false"
          ></q-btn>
        </div>
        <div class="q-px-md">
          <div class="q-mt-md">
            <span>อีเมล: <span class="text-red">*</span></span>
            <q-input v-model="email" dense outlined> </q-input>
          </div>
        </div>
        <div class="q-mt-lg row items-center justify-center">
          <q-btn
            class="bg-green text-white btn-radius"
            @click="sendPasswordToEmail()"
            :disable="!email.length"
            >ยืนยัน</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import commonFunctions from "@/utils/common-function";
import { reactive, ref, onMounted } from "vue";
import store from "@/store";
import { $api } from "@/services/api";
import { googleSdkLoaded } from "vue3-google-login";
import emailing from "@/utils/email.js";
import axios from "axios";
export default {
  setup() {
    const {
      redirect,
      showNotification,
      showSpinnerIosLoading,
      hideSpinnerIosLoading,
      $q,
    } = commonFunctions();
    const { sendEmail } = emailing();
    const showPage = ref("login");
    const activeForgotPassword = ref(false);
    const forgotPassword = () => {
      activeForgotPassword.value = true;
    };
    const togglePage = (page) => {
      signupInformation.firstName = "";
      signupInformation.lastName = "";
      // signupInformation.telephone = "";
      signupInformation.email = "";
      signupInformation.password = "";
      signupInformation.confirmPassword = "";
      loginInformation.username = "";
      loginInformation.password = "";
      showPage.value = page;
    };
    const signupInformation = reactive({
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    const loginInformation = reactive({
      username: "",
      password: "",
    });
    const loginUsernameRef = ref(null);
    const loginPasswordRef = ref(null);
    const login = async () => {
      showSpinnerIosLoading();
      loginUsernameRef.value.validate();
      loginPasswordRef.value.validate();
      if (loginUsernameRef.value.hasError || loginPasswordRef.value.hasError) {
        hideSpinnerIosLoading();
        return;
      }
      const userInfo = await $api.users.login({
        username: loginInformation.username,
        password: loginInformation.password,
      });
      if (userInfo) {
        store.dispatch("setUser", userInfo);
        hideSpinnerIosLoading();
        showNotification("positive", "เข้าสู่ระบบสำเร็จ !");
        redirect("/home");
      } else {
        hideSpinnerIosLoading();
        showNotification(
          "negative",
          "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง โปรดตรวจสอบอีกครั้ง"
        );
      }
    };
    const validateSignupInformation = async () => {
      const { is_exiting: isAccountExiting } =
        await $api.users.checkExistingAccount({
          email: signupInformation.email,
          username: signupInformation.username,
        });
      if (isAccountExiting) return [false, "อีเมลหรือชื่อผู้ใช้มีในระบบแล้ว"];
      if (signupInformation.password !== signupInformation.confirmPassword)
        return [false, "รหัสผ่านไม่ตรงกัน"];
      if (signupInformation.password.length < 8)
        return [false, "รหัสผ่านต้องไม่ต่ำกว่า 8 ตัวอักษร"];
      return [true, null];
    };
    const signUpUsernameRef = ref(null);
    const signUpPasswordRef = ref(null);
    const signUpConfirmPasswordRef = ref(null);
    const signUpEmailRef = ref(null);
    const signUpFirstNameRef = ref(null);
    const signUpLastNameRef = ref(null);
    const signUp = async () => {
      signUpUsernameRef.value.validate();
      signUpPasswordRef.value.validate();
      signUpConfirmPasswordRef.value.validate();
      signUpEmailRef.value.validate();
      signUpFirstNameRef.value.validate();
      signUpLastNameRef.value.validate();
      if (
        signUpUsernameRef.value.hasError ||
        signUpPasswordRef.value.hasError ||
        signUpConfirmPasswordRef.value.hasError ||
        signUpEmailRef.value.hasError ||
        signUpFirstNameRef.value.hasError ||
        signUpLastNameRef.value.hasError
      ) {
        return;
      }
      const [isValid, errorText] = await validateSignupInformation();
      if (!isValid) {
        showNotification("negative", errorText);
        return;
      }
      $q.dialog({
        title: "สมัครสมาชิก",
        message: "ยืนยันการสมัครสมาชิก ?",
        ok: "ยืนยัน",
        cancel: "ยกเลิก",
      }).onOk(async () => {
        showSpinnerIosLoading();
        await $api.users.registration({
          username: signupInformation.username,
          password: signupInformation.password,
          email: signupInformation.email,
          first_name: signupInformation.firstName,
          last_name: signupInformation.lastName,
        });
        hideSpinnerIosLoading();
        showNotification("positive", "สมัครสมาชิกสำเร็จ !");
        togglePage("login");
      });
    };

    const loginGoogle = () => {
      // eslint-disable-next-line no-undef
      googleSdkLoaded((google) => {
        google.accounts.oauth2
          .initCodeClient({
            client_id: `${process.env.VUE_APP_GOOGLE_CLIENT_ID}`,
            scope: "email profile openid",
            callback: async (response) => {
              const googleUserInfo = await getGoogleUserInfo(response.code);
              const userInfo = await $api.users.login({
                username: googleUserInfo.data.email,
                login_method: "google",
              });
              if (userInfo) {
                store.dispatch("setUser", userInfo);
              } else {
                const registeredUser = await $api.users.registration({
                  email: googleUserInfo.data.email,
                  first_name: googleUserInfo.data.given_name,
                  last_name: googleUserInfo.data.family_name,
                  register_method: "google",
                });
                const loginInfo = await $api.users.login({
                  username: registeredUser.email,
                  login_method: "google",
                });

                store.dispatch("setUser", loginInfo);
              }
              showNotification("positive", "เข้าสู่ระบบสำเร็จ !");
              redirect("/home");
            },
          })
          .requestCode();
      });
    };
    const getGoogleUserInfo = async (code) => {
      const response = await axios.get(
        `${process.env.VUE_APP_XSERVICE_URL}/google-auth`,
        // `/xapi/google-auth`,
        {
          params: {
            code: code,
            client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
            client_secret: process.env.VUE_APP_GOOGLE_CLIENT_SECRET,
            redirect_uri: "https://kongsak-shop.onrender.com",
            // redirect_uri: "https://localhost:8080",
            grant_type: "authorization_code",
          },
        }
      );
      return response;
    };
    const email = ref("");
    const sendPasswordToEmail = async () => {
      showSpinnerIosLoading();
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email.value)) {
        const userInfo = await $api.users.getByParams({
          email: email.value,
        });
        if (userInfo && userInfo.length) {
          await sendEmail(
            "service_6xntwtu",
            "template_b08ahwk",
            {
              subject: "ข้อมูลรหัสผ่านสำหรับบัญชีของคุณ",
              to_email: userInfo[0].email,
              from_name: "",
              message: `เรียน คุณ ${userInfo[0].first_name} ${userInfo[0].last_name},

เราขอแจ้งให้ทราบว่าเราได้ส่งรหัสผ่านสำหรับบัญชีของคุณไปยังที่อยู่อีเมลนี้ เพื่อความปลอดภัย, กรุณาเก็บข้อมูลนี้ไว้ในที่ปลอดภัยและไม่แชร์กับผู้อื่น.

รหัสผ่านของคุณคือ: ${userInfo[0].password}

หากคุณไม่ได้ทำคำขอนี้หรือมีคำถามใดๆ เกี่ยวกับบัญชีของคุณ, กรุณาติดต่อทีมสนับสนุนของเรา.

ขอบคุณที่ให้ความสนใจ, KongsakShop`,
            },
            "Bnzo6dG5nRlgeMOTH"
          );
          showNotification(
            "positive",
            "รหัสผ่านคุณถูกส่งไปยังอีเมลที่กรอกเรียบร้อยแล้ว"
          );
          activeForgotPassword.value = false;
        } else {
          showNotification("negative", "ไม่มีอีเมลดังกล่างในระบบ");
        }
      } else {
        showNotification("negative", "รูปแบบอีเมลไม่ถูกต้อง");
      }
      hideSpinnerIosLoading();
    };
    onMounted(() => {
      togglePage("login");
    });
    return {
      redirect,
      loginInformation,
      login,
      showPage,
      togglePage,
      signupInformation,
      signUp,
      loginGoogle,
      activeForgotPassword,
      forgotPassword,
      email,
      sendPasswordToEmail,
      loginUsernameRef,
      loginPasswordRef,
      signUpUsernameRef,
      signUpPasswordRef,
      signUpConfirmPasswordRef,
      signUpEmailRef,
      signUpFirstNameRef,
      signUpLastNameRef,
    };
  },
};
</script>
