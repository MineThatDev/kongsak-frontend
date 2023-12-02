<template>
  <q-page padding>
    <div class="row justify-end items-center">
      <q-select
        v-model="monthModel"
        :options="monthOptions"
        :option-label="(monthOption) => monthOption.month"
        color="dark"
        dense
        outlined
      >
        <template v-slot:selected-item="scope">
          <div class="ellipsis">
            {{ scope.opt.month }}
          </div>
        </template>
      </q-select>
      <q-select
        class="q-ml-md"
        v-model="yearModel"
        :options="yearOptions"
        color="dark"
        dense
        outlined
      >
      </q-select>
    </div>
    <q-table
      class="q-mt-md"
      :columns="columns"
      :rows="information"
      :rows-per-page-options="[0]"
      hide-pagination
    >
      <template v-slot:bottom>
        <div class="full-width text-right text-weight-bold font-size-14">
          ยอดรวมทั้งหมด
          <span class="q-mx-sm">{{ currencyFormat(totalAmount) }}</span> บาท
        </div>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
import store from "@/store";
import { $api } from "@/services/api";
import commonFunctions from "@/utils/commonFunctions";
export default {
  setup() {
    const { showSpinnerIosLoading, hideSpinnerIosLoading, currencyFormat, convertISOFormatToDDMMYYYY } =
      commonFunctions();
    const monthOptions = ref([
      {
        month: "มกราคม",
        start_date: "01-01T00:00:00.000Z",
        end_date: "01-31T00:00:00.000Z",
      },
      {
        month: "กุมภาพันธ์",
        start_date: "02-01T00:00:00.000Z",
        end_date: "02-28T00:00:00.000Z",
      },
      {
        month: "มีนาคม",
        start_date: "03-01T00:00:00.000Z",
        end_date: "03-31T00:00:00.000Z",
      },
      {
        month: "เมษายน",
        start_date: "04-01T00:00:00.000Z",
        end_date: "04-30T00:00:00.000Z",
      },
      {
        month: "พฤษภาคม",
        start_date: "05-01T00:00:00.000Z",
        end_date: "05-31T00:00:00.000Z",
      },
      {
        month: "มิถุนายน",
        start_date: "06-01T00:00:00.000Z",
        end_date: "06-31T00:00:00.000Z",
      },
      {
        month: "กรกฎาคม",
        start_date: "07-01T00:00:00.000Z",
        end_date: "07-31T00:00:00.000Z",
      },
      {
        month: "สิงหาคม",
        start_date: "08-01T00:00:00.000Z",
        end_date: "08-31T00:00:00.000Z",
      },
      {
        month: "กันยายน",
        start_date: "09-01T00:00:00.000Z",
        end_date: "09-31T00:00:00.000Z",
      },
      {
        month: "ตุลาคม",
        start_date: "10-01T00:00:00.000Z",
        end_date: "10-31T00:00:00.000Z",
      },
      {
        month: "พฤศจิกายน",
        start_date: "11-01T00:00:00.000Z",
        end_date: "11-31T00:00:00.000Z",
      },
      {
        month: "ธันวาคม",
        start_date: "12-01T00:00:00.000Z",
        end_date: "12-31T00:00:00.000Z",
      },
    ]);
    const yearOptions = ref([
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
      "2033",
    ]);
    const yearModel = ref(yearOptions.value[0]);
    const monthModel = ref(monthOptions.value[0]);
    const information = ref([]);
    const totalAmount = ref();
    const fetchInformation = async () => {
      showSpinnerIosLoading();
      information.value = [];
      totalAmount.value = 0;
      const response = await $api.order_products.getByParams({
        start_date: `${yearModel.value}-${monthModel.value.start_date}`,
        end_date: `${yearModel.value}-${monthModel.value.end_date}`,
      });
      for (const op of response) {
        const product = await $api.products.getById(op.product_id);
        totalAmount.value = totalAmount.value + op.quantity * product.price;
        const isProductDup = information.value.some(
          (info) => info.name === product.name
        );
        if (!isProductDup) {
          information.value.push({
            name: product.name,
            quantity: op.quantity,
            price: currencyFormat(product.price),
            created_at: convertISOFormatToDDMMYYYY(op.created_at),
          });
        } else {
          information.value = information.value.map((info) => {
            return info.name === product.name
              ? { ...info, quantity: info.quantity + op.quantity }
              : { ...info };
          });
        }
      }
      hideSpinnerIosLoading();
    };
    watch(
      () => monthModel.value,
      async () => {
        await fetchInformation();
      }
    );
    watch(
      () => yearModel.value,
      async () => {
        await fetchInformation();
      }
    );
    onMounted(async () => {
      store.dispatch("updateBreadCrumbs", ["ข้อมูลสถิติ"]);
      await fetchInformation();
    });
    onUnmounted(() => {
      store.dispatch("clearBreadCrumbs");
    });
    return {
      monthOptions,
      monthModel,
      yearOptions,
      yearModel,
      columns,
      information,
      currencyFormat,
      totalAmount,
    };
  },
};
const columns = [
  {
    name: "created_at",
    label: "วัน",
    align: "left",
    field: "created_at",
  },
  {
    name: "name",
    label: "สินค้า",
    align: "left",
    field: "name",
  },
  {
    name: "quantity",
    label: "จำนวน",
    align: "right",
    field: "quantity",
  },
  {
    name: "price",
    label: "ราคา",
    align: "right",
    field: "price",
  },
];
</script>
