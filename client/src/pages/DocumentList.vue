<template>
  <q-page padding class="q-ma-xl rounded-borders shadow-4">
    <div
      class="row shadow-2 q-pa-md q-mt-md"
      v-for="doc in documents"
      :key="doc.id"
    >
      <div class="col-xs-12 col-sm-1 row justify-content-center">
        <q-btn icon="pause_circle_filled" color="indigo-5" size="lg" flat />
      </div>
      <div class="card-document-description col-9">
        <div class="row">
          <div class="doc-title">
            {{ doc.name }}
          </div>
          <q-space />
        </div>
        <div
          class="doc-description-container row q-mt-lg text-caption text-blue-grey-5"
        >
          <div class="doc-created-at">
            <q-icon name="calendar_today" size="xs" class="q-mr-sm" />
            {{ formattedPersianDate(doc.created_at) }}
          </div>
        </div>
        <div
          class="doc-description-container row q-mt-md text-caption text-blue-grey-5"
        >
          <div class="doc-data-comments">
            <q-icon name="comment" size="xs" class="q-mr-sm" />
            4
          </div>
          <div class="q-mx-md">|</div>
          <div class="doc-data-count">
            {{ objectPropertyCounter(doc.data) }} مورد در این آزمایش
          </div>
        </div>
      </div>
      <div class="card-document-action col-2" dir="ltr">
        <q-btn
          label="حذف"
          size="sm"
          class="bg-red-1 text-red q-mx-xs q-mt-sm"
          flat
          @click="deleteDocument(doc.id)"
        />
        <q-btn
          label="ویرایش"
          size="sm"
          class="bg-indigo-1 text-indigo-6 q-mx-xs q-mt-sm"
          flat
        />
      </div>
      <div class="col-12">
        <q-expansion-item
          class="col-12 q-mt-lg"
          icon="list"
          label="لیست داده ها"
          header-class="bg-grey-1 text-indigo-6"
        >
          <q-table
            class="q-mt-md"
            :data="convertDataToTable(doc.data)"
            :columns="dataColumns"
            row-key="name"
            separator="none"
            table-header-class="bg-blue-grey-8 text-white"
            flat
            hide-pagination
            dir="ltr"
          >
            <template v-slot:body="props">
              <q-tr :props="props" class="bg-grey-1">
                <q-td key="name" :props="props">{{ props.row.key }}</q-td>
                <q-td key="value" :props="props">{{ props.row.value }}</q-td>
              </q-tr>
            </template>
          </q-table>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  computed,
  reactive
} from "@vue/composition-api";
import { LoadingBar, Notify } from "quasar";
import { mapActions } from "vuex";
import { useDocument } from "../hooks/useDocument";
import { usePdate } from "../hooks/usePdate";

export default defineComponent({
  name: "PageIndex",
  components: {},
  setup(props, context) {
    const { documents, getDocuments, deleteDocument } = useDocument(context);
    onMounted(() => getDocuments());

    const { formattedPersianDate } = usePdate();

    const objectPropertyCounter = function(obj: object) {
      return Object.getOwnPropertyNames(obj).length;
    };

    const dataColumns = [
      {
        name: "name",
        label: "نام",
        align: "center"
      },
      {
        name: "value",
        label: "مقدار",
        align: "center"
      }
    ];

    interface DocumentData {
      key: string;
      value: string | number;
    }

    const convertDataToTable = function(obj: object): DocumentData[] {
      return Object.getOwnPropertyNames(obj).map(key => {
        return {
          key,
          value: obj[key] as string | number
        };
      });
    };

    return {
      documents,
      formattedPersianDate,
      objectPropertyCounter,
      dataColumns,
      convertDataToTable,
      deleteDocument
    };
  }
});
</script>

<style lang="scss">
.router-link {
  text-decoration: none;
}
</style>
