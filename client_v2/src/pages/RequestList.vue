<template>
  <q-page padding class="q-pa-lg rounded-borders shadow-24">
    <div
      class="row request-container rounded-borders q-pa-md q-mt-md"
      v-for="request in requestList"
      :key="request.id"
    >
      <div class="doc-description-container row text-indigo-6">
        <div class="q-pa-sm">
          {{ request.text }}
        </div>
        <div class="q-mx-md q-pa-sm"><q-icon name="hdr_strong" /></div>
        <div class="doc-created-at q-pa-sm">
          <q-icon
            name="iconly:boldProfile"
            color="indigo-6"
            size="xs"
            class="q-mr-sm"
          />
          {{ request.applicant.fullname }}
        </div>
        <div class="q-mx-md q-pa-sm"><q-icon name="hdr_strong" /></div>
        <div class="doc-created-at q-pa-sm">
          <q-icon
            name="iconly:boldCalendar"
            color="indigo-6"
            size="xs"
            class="q-mr-sm"
          />
          {{ formattedPersianDate(request.created_at) }}
        </div>
        <div class="q-mx-md q-pa-sm"><q-icon name="hdr_strong" /></div>
        <div class="doc-created-at q-pa-sm">
          <q-icon
            name="iconly:boldTime-Circle"
            size="xs"
            class="q-mr-sm"
            color="indigo-6"
          />
          {{ formattedPersianTime(request.created_at) }}
        </div>
        <div class="q-mx-md q-pa-sm" v-if="request.document.tag && user.tag">
          <q-icon name="hdr_strong" />
        </div>
        <div class="q-pa-sm" v-if="request.document.tag && user.tag">
          <q-badge
            v-if="request.document.tag.id !== user.tag.id"
            label="نامرتبط"
            class="bg-red-1 text-redq-pa-sm"
          />
        </div>
      </div>
      <q-space />
      <div class="card-document-action">
        <q-badge
          v-if="request.state !== 0"
          :label="requestStateOptions[request.state]"
          :class="
            request.state == 1
              ? 'bg-red-1 text-red'
              : 'bg-green-1 text-positive'
          "
          class="q-pa-sm"
          flat
          dense
        />
        <div v-if="request.state === 0 && request.doctor">
          <q-btn
            v-if="request.state !== 2 && request.doctor.id === user.id"
            icon="check_circle_outline"
            color="positive"
            @click="changeRequestState(request.id, 2)"
            class="q-mx-sm"
            flat
            dense
          />
          <q-btn
            v-if="request.state !== 1 && request.doctor.id === user.id"
            icon="highlight_off"
            color="red"
            @click="changeRequestState(request.id, 1)"
            class="q-mx-sm"
            flat
            dense
          />
        </div>
      </div>
      <div class="col-12">
        <q-expansion-item
          class="col-12 q-mt-lg"
          icon="list"
          label="لیست داده ها"
          :caption="objectPropertyCounter(request.document.data) + ' مورد'"
          header-class="bg-grey-1 text-indigo-6"
        >
          <q-table
            class="q-mt-md"
            :rows="convertDataToTable(request.document.data)"
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
import { useRequest } from '../hooks/useRequest';
import { usePdate } from '../hooks/usePdate';
import { DocumentData } from '../interfaces/User';
import { useQuasar } from 'quasar';
import { UserDto } from '../interfaces/User';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const user = $q.cookies.get('user') as UserDto;

    const {
      requestList,
      getRequests,
      deleteDocument,
      requestStateOptions,
      changeRequestState,
    } = useRequest();
    onMounted(() => getRequests());

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
      requestList,
      formattedPersianDate,
      formattedPersianTime,
      objectPropertyCounter,
      dataColumns,
      convertDataToTable,
      deleteDocument,
      changeRequestState,
      requestStateOptions,
      user,
    };
  },
});
</script>

<style lang="scss">
.router-link {
  text-decoration: none;
}

.request-container {
  border: 2px dashed #eeeeee;
}
</style>
