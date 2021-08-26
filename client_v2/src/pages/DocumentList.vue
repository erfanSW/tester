<template>
  <q-page padding class="q-pa-lg rounded-borders shadow-24">
    <div
      class="row document-container rounded-borders q-pa-md q-mt-md"
      v-for="doc in documents"
      :key="doc.id"
    >
      <div class="doc-description-container row text-indigo-6">
        <div class="q-pa-sm">
          <router-link class="router-link" :to="`/documents/${doc.id}`">
            {{ doc.name }}
          </router-link>
        </div>
        <div class="q-mx-md q-pa-sm"><q-icon name="hdr_strong" /></div>
        <div class="doc-created-at q-pa-sm">
          <q-icon
            name="iconly:boldCalendar"
            color="indigo-6"
            size="xs"
            class="q-mr-sm"
          />
          {{ formattedPersianDate(doc.created_at) }}
        </div>
        <div class="q-mx-md q-pa-sm"><q-icon name="hdr_strong" /></div>
        <div class="doc-created-at q-pa-sm">
          <q-icon
            name="iconly:boldTime-Circle"
            size="xs"
            class="q-mr-sm"
            color="indigo-6"
          />
          {{ formattedPersianTime(doc.created_at) }}
        </div>
        <div class="q-mx-md q-pa-sm"><q-icon name="hdr_strong" /></div>
        <div class="doc-data-comments q-pa-sm">
          <q-icon
            name="iconly:boldChat"
            size="xs"
            class="q-mr-sm"
            color="indigo-6"
          />
          4
        </div>
      </div>
      <q-space />
      <div class="card-document-action">
        <q-btn
          label="حذف"
          size="sm"
          class="bg-red-1 text-red q-mx-xs"
          flat
          @click="deleteDocument(doc.id)"
        />
        <q-btn
          label="ویرایش"
          size="sm"
          class="bg-indigo-1 text-indigo-6 q-mx-xs"
          flat
        />
      </div>
      <div class="col-12">
        <q-expansion-item
          class="col-12 q-mt-lg"
          icon="list"
          label="لیست داده ها"
          :caption="objectPropertyCounter(doc.data) + ' مورد'"
          header-class="bg-grey-1 text-indigo-6"
        >
          <q-table
            class="q-mt-md"
            :rows="convertDataToTable(doc.data)"
            :columns="dataColumns"
            row-key="name"
            separator="none"
            table-header-class="bg-indigo-1 text-indigo-6"
            flat
          >
            <template v-slot:body="props">
              <q-tr :props="props" class="bg-grey-1">
                <q-td key="value" :props="props">{{ props.row.value }}</q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              </q-tr>
            </template>
          </q-table>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useDocument } from '../hooks/useDocument';
import { usePdate } from '../hooks/usePdate';
import { DocumentData } from '../interfaces/Document';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const { documents, getDocuments, deleteDocument } = useDocument();
    onMounted(() => getDocuments());

    const { formattedPersianDate, formattedPersianTime } = usePdate();

    const objectPropertyCounter = function (obj: DocumentData) {
      return Object.getOwnPropertyNames(obj).length;
    };

    const dataColumns = [
      {
        name: 'value',
        label: 'مقدار',
        align: 'center',
      },
      {
        name: 'name',
        label: 'نام',
        align: 'center',
      },
    ];

    const convertDataToTable = function (obj: DocumentData): DocumentData[] {
      return Object.getOwnPropertyNames(obj).map(
        (key: string): DocumentData => {
          return {
            name: key,
            value: obj[key],
          };
        }
      );
    };

    return {
      documents,
      formattedPersianDate,
      formattedPersianTime,
      objectPropertyCounter,
      dataColumns,
      convertDataToTable,
      deleteDocument,
    };
  },
});
</script>

<style lang="scss">
.router-link {
  text-decoration: none;
}
.document-container {
  box-shadow: 0 0 5px #eeeeee;
  border-radius: 10px;
}
</style>
