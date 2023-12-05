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
      <div class="row col-12 items-center">
        <div class="col-6">
          <q-btn
            icon="add"
            class="bg-cedar-plank text-white"
            @click="openAddProductDialog()"
            ><span>เพิ่มสินค้า</span></q-btn
          >
        </div>
        <div class="row col-6 justify-end">
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
      </div>
      <div class="row col-12" v-if="products.length">
        <div
          v-for="(item, index) in products"
          :key="index"
          class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12 q-px-sm"
        >
          <q-card class="card-radius q-mt-md" v-if="item.is_active">
            <q-btn
              size="10px"
              style="position: absolute; z-index: 1"
              icon="edit"
              flat
              class="text-pumping-spice"
              fab
              @click="openAddProductDialog(item.id)"
            >
            </q-btn>
            <q-btn
              size="10px"
              style="position: absolute; z-index: 1; top: 0; right: 0"
              icon="delete"
              flat
              class="text-pumping-spice"
              fab
              @click="showDeleteDialog(item.id)"
            >
            </q-btn>
            <div>
              <q-card-section align="center" class="q-pa-lg">
                <q-img :src="createUrlFromBase64(item.content)" />
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
            </div>
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
            <q-btn
              size="10px"
              style="position: absolute; z-index: 1"
              icon="edit"
              flat
              class="text-pumping-spice"
              fab
              @click="openAddProductDialog(item.id)"
              disable
            >
            </q-btn>
            <q-btn
              size="10px"
              style="position: absolute; z-index: 1; top: 0; right: 0"
              icon="delete"
              flat
              class="text-pumping-spice"
              fab
              disable
              @click="showDeleteDialog(item.id)"
            >
            </q-btn>
            <div>
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
            </div>
          </q-card>
        </div>
      </div>
      <div v-else class="col-12 flex flex-center">
        <div class="font-size-24">ไม่มีสินค้าในหมวดนี้</div>
      </div>
    </div>
    <q-dialog v-model="showAddProductDialog">
      <q-card
        style="height: 600px"
        :style="$q.screen.gt.xs ? 'min-width: 60%;' : 'min-width: 80%;'"
      >
        <div class="row">
          <div
            class="row col-12 items-center justify-between q-px-md q-my-md"
            style="height: 30px"
          >
            <div
              class="text-weight-bold"
              :class="$q.screen.gt.sm ? 'font-size-20' : 'font-size-16'"
            >
              กรอกรายละเอียดสินค้าและเพิ่มรูป
            </div>
            <q-btn
              icon="close"
              flat
              size="16px"
              @click="showAddProductDialog = false"
            ></q-btn>
          </div>
          <div class="row col-12">
            <div
              class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 flex flex-center q-px-sm"
            >
              <q-img v-if="imgSrc" :src="imgSrc" fit>
                <q-badge class="cursor-pointer" rounded @click="file = null">
                  <q-icon name="close" color="white" />
                </q-badge>
              </q-img>
              <div v-else class="flex flex-center">
                <q-file
                  v-model="file"
                  class="text-black"
                  borderless
                  label="Upload Image"
                  label-color="gold"
                  dense
                  append
                  use-chips
                >
                  <template v-slot:prepend>
                    <q-icon name="attachment" color="smokey-grey" />
                  </template>
                </q-file>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="row col-12 items-center q-mt-xl">
                <div class="col-3 text-right">
                  <span>ชื่อสินค้า :</span><span class="text-red">*</span>
                </div>
                <div class="col-9 q-px-lg">
                  <q-input v-model="productInformation.name" outlined dense />
                </div>
              </div>
              <div class="row col-12 q-mt-md items-start">
                <div class="col-3 text-right">
                  <span>โมเดล :</span><span class="text-red">*</span>
                </div>
                <div class="col-9 q-px-lg">
                  <q-input
                    v-model="productInformation.model"
                    type="textarea"
                    outlined
                    dense
                  />
                </div>
              </div>
              <div class="row col-12 q-mt-md items-center">
                <div class="col-3 text-right">
                  <span>แบรนด์ :</span><span class="text-red">*</span>
                </div>
                <div class="col-9 q-px-lg">
                  <q-input v-model="productInformation.brand" outlined dense />
                </div>
              </div>
              <div class="row col-12 q-mt-md items-center">
                <div class="col-3 text-right">
                  <span>ราคา :</span><span class="text-red">*</span>
                </div>
                <div class="col-9 q-px-lg">
                  <q-input
                    v-model="productInformation.price"
                    outlined
                    dense
                    type="number"
                  />
                </div>
              </div>
              <div class="row col-12 q-mt-md items-center">
                <div class="col-3 text-right">
                  <span>หมวดหมู่ :</span><span class="text-red">*</span>
                </div>
                <div class="col-9 q-px-lg">
                  <q-select
                    v-model="productInformation.category"
                    outlined
                    dense
                    :options="categoryOptions"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row col-12 justify-center q-mt-xl">
            <q-btn
              class="bg-green text-white btn-radius"
              style="min-width: 140px"
              @click="addProduct()"
              >เพิ่มสินค้า</q-btn
            >
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import store from "@/store";
import commonFunctions from "@/utils/commonFunctions";
import { $api } from "@/services/api";
import { ref, onMounted, onUnmounted, watch, reactive } from "vue";
import { Dialog } from "quasar";
import handleFile from "@/utils/file";
export default {
  setup() {
    const {
      handleImageSrc,
      currencyFormat,
      redirect,
      showNotification,
      showSpinnerIosLoading,
      hideSpinnerIosLoading,
    } = commonFunctions();
    const { createUrlFromFile, createUrlFromBase64 } = handleFile();
    const categoryOptions = ref(["กล้อง", "เครื่องบันทึกภาพ", "อื่นๆ"]);
    const products = ref([]);
    const imgSrc = ref("");
    const file = ref();
    watch(
      () => file.value,
      async () => {
        imgSrc.value = await createUrlFromFile(file.value);
      }
    );
    const testUpload = async () => {};
    const searchString = ref("");
    const fetchProducts = async () => {
      showSpinnerIosLoading();
      products.value = [];
      const productsRes = await $api.products.getByParams({
        name_like: searchString.value ? searchString.value : null,
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
    const showDeleteDialog = async (id) => {
      Dialog.create({
        title: "ยืนยันการลบสินค้า",
        message: "ต้องการลบสินค้าหรือไม่?",
        ok: "ยืนยัน",
        cancel: "ยกเลิก",
      }).onOk(async () => {
        await deleteProduct(id);
      });
    };
    const deleteProduct = async (id) => {
      showSpinnerIosLoading();
      const response = await $api.products.update({
        id: id,
        is_active: false,
      });
      if (response) {
        showNotification("positive", "ลบลบสินค้าสำเร็จ");
      } else {
        showNotification("negative", "ลบสินค้าล้มเหลว");
      }
      hideSpinnerIosLoading();
      await fetchProducts();
    };
    const showAddProductDialog = ref(false);
    const openAddProductDialog = async (id) => {
      productInformation.id = "";
      productInformation.name = "";
      productInformation.model = "";
      productInformation.brand = "";
      productInformation.price = "";
      productInformation.category = "";
      file.value = null;
      imgSrc.value = null;
      if (!id) {
        showAddProductDialog.value = true;
      } else {
        const productRes = await $api.products.getByParams({
          _id: id,
        });
        productInformation.id = productRes[0].id;
        productInformation.name = productRes[0].name;
        productInformation.model = productRes[0].model;
        productInformation.brand = productRes[0].brand;
        productInformation.price = productRes[0].price;
        productInformation.category = productRes[0].category;
        const fileRes = await $api.files.getByParams({
          key_ref: productRes[0].id,
          origin: "product",
        });
        if (fileRes && fileRes.length) {
          const binaryData = atob(fileRes[0].content);
          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const uint8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
          }

          const blob = new Blob([uint8Array], { type: "image/png" });

          // Create a File object from the Blob
          const buffredFile = new File([blob], fileRes[0].filename, {
            type: "image/png",
          });

          file.value = buffredFile;
          imgSrc.value = await createUrlFromFile(buffredFile);
        }
        showAddProductDialog.value = true;
      }
    };
    const productInformation = reactive({
      id: "",
      name: "",
      model: "",
      brand: "",
      price: "",
      category: "",
    });
    const validateInformation = async () => {
      if (
        !productInformation.name ||
        !productInformation.model ||
        !productInformation.brand ||
        !productInformation.price ||
        !productInformation.category
      ) {
        return [false, "กรุณากรอกข้อมูลให้ครบ"];
      }
      if (!file.value && !Object.keys(file.value).length || file.value && !Object.keys(file.value).length)
        return [false, "กรุณาอัพโหลดไฟล์"];
      const productRes = await $api.products.getByParams({
        name: productInformation.name,
      });
      // 'id' used for seperate update case and create case
      if (productRes && productRes.length && !productInformation.id)
        return [false, "มีสินค้านี้ในระบบแล้ว"];
      return [true, null];
    };
    const addProduct = async () => {
      const [isValid, errorText] = await validateInformation();
      if (isValid) {
        showSpinnerIosLoading();
        if (!productInformation.id) {
          const createdProductRes = await $api.products.create({
            name: productInformation.name,
            model: productInformation.model,
            brand: productInformation.brand,
            price: Number(productInformation.price),
            category: productInformation.category,
            is_active: true,
          });
          if (createdProductRes && createdProductRes.status === 201) {
            const formData = new FormData();
            formData.append("file", file.value);
            formData.append("key_ref", createdProductRes.data.id);
            formData.append("origin", "product");
            await $api.files.create(formData);
            showNotification("positive", "เพิ่มสินค้าสำเร็จ");
            showAddProductDialog.value = false;
          }
          hideSpinnerIosLoading();
        } else {
          const updatedProductRes = await $api.products.update({
            id: productInformation.id,
            name: productInformation.name,
            model: productInformation.model,
            brand: productInformation.brand,
            price: Number(productInformation.price),
            category: productInformation.category,
            is_active: true,
          });
          const fileRes = await $api.files.getByParams({
            key_ref: productInformation.id,
          });
          const formData = new FormData();
          formData.append("file", file.value);
          formData.append("key_ref", updatedProductRes.data.id);
          formData.append("origin", "product");
          if (fileRes && fileRes.length) {
            formData.append("id", fileRes[0].id);
            await $api.files.update(formData);
          } else {
            await $api.files.create(formData);
          }
          showNotification("positive", "แก้ไขสินค้าสำเร็จ");
          showAddProductDialog.value = false;
        }
        await fetchProducts();
      } else {
        showNotification("negative", errorText);
      }
    };
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", ["สินค้าทั้งหมด"]);
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
      deleteProduct,
      fetchProducts,
      showDeleteDialog,
      searchString,
      showAddProductDialog,
      file,
      testUpload,
      createUrlFromFile,
      imgSrc,
      categoryOptions,
      addProduct,
      productInformation,
      createUrlFromBase64,
      openAddProductDialog,
    };
  },
};
</script>
