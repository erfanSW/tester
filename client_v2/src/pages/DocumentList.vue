<template>
  <q-page padding class="q-pa-lg rounded-borders shadow-24">
    <q-table grid :rows="filteredDocuments" row-key="id">
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="جست و جو"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div
          class="row col-12 document-container rounded-borders q-pa-md q-mt-md"
        >
          <div class="doc-description-container row text-indigo-6">
            <div class="q-pa-sm">
              <router-link
                class="router-link"
                :to="`/documents/${props.row.id}`"
              >
                {{ props.row.name }}
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
              {{ formattedPersianDate(props.row.created_at) }}
            </div>
            <div class="q-mx-md q-pa-sm"><q-icon name="hdr_strong" /></div>
            <div class="doc-created-at q-pa-sm">
              <q-icon
                name="iconly:boldTime-Circle"
                size="xs"
                class="q-mr-sm"
                color="indigo-6"
              />
              {{ formattedPersianTime(props.row.created_at) }}
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
          <div
            class="card-document-action"
            v-if="user.id === props.row.patient.id"
          >
            <q-btn
              label="حذف"
              size="sm"
              class="bg-red-1 text-red q-mx-xs"
              flat
              @click="deleteDocument(props.row.id)"
            />
          </div>
          <div class="col-12">
            <q-expansion-item
              class="col-12 q-mt-lg"
              icon="list"
              label="لیست داده ها"
              :caption="objectPropertyCounter(props.row.data) + ' مورد'"
              header-class="bg-grey-1 text-indigo-6"
            >
              <q-table
                class="q-mt-md"
                :rows="convertDataToTable(props.row.data)"
                :columns="dataColumns"
                row-key="name"
                separator="none"
                table-header-class="bg-indigo-1 text-indigo-6"
                flat
              >
                <template v-slot:body="dataProps">
                  <q-tr :props="dataProps" class="bg-grey-1">
                    <q-td key="value" :props="dataProps">{{
                      dataProps.row.value
                    }}</q-td>
                    <q-td key="name" :props="dataProps">{{
                      dataProps.row.name
                    }}</q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-expansion-item>
          </div>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useDocument } from '../hooks/useDocument';
import { usePdate } from '../hooks/usePdate';
import { DocumentData, DocumentInterface } from '../interfaces/User';
import { useUser } from '../hooks/useUser';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = useUser();

    const filter = ref<string>('');

    const { documents, getDocuments, deleteDocument } = useDocument();
    onMounted(() => getDocuments());

    const filteredDocuments = computed((): DocumentInterface[] =>
      documents.value.filter((doc: DocumentInterface) =>
        doc.name.indexOf(filter.value) > -1
      )
    );

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
      user,
      filter,
      filteredDocuments
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
