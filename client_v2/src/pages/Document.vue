<template>
  <q-page padding class="q-px-xl q-py-sm rounded-borders shadow-24">
    <div class="text-h6 q-pa-md">
      {{ requestedDoc.name }}
    </div>

    <div class="row">
      <div class="doc-description col-3 q-pa-md">
        <div class="doc-box">
          <q-img src="../assets/online-doctor.svg" fit="fill" />
          <q-list>
            <q-item clickable v-ripple :active="active">
              <q-item-section avatar>
                <q-icon
                  name="iconly:boldTime-Circle"
                  size="20px"
                  class="text-indigo-6"
                />
              </q-item-section>
              <q-item-section class="text-grey">تاریخ ایجاد</q-item-section>
              <q-item-section class="text-grey" side>{{
                diffDateText(requestedDoc.created_at)
              }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="active">
              <q-item-section avatar>
                <q-icon
                  name="iconly:boldChat"
                  size="20px"
                  class="text-indigo-6"
                />
              </q-item-section>
              <q-item-section class="text-grey">گفت و گو</q-item-section>
              <q-item-section class="text-grey" side>{{
                comments.length
              }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="active">
              <q-item-section avatar>
                <q-icon
                  name="iconly:boldBookmark"
                  size="20px"
                  class="text-indigo-6"
                />
              </q-item-section>
              <q-item-section class="text-grey">آرشیو</q-item-section>
              <q-item-section class="text-grey" side>{{
                requestedDoc.archive ? 'بله' : 'خیر'
              }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="doc-detail col-9 q-pa-md" v-if="requestedDoc.data">
        <q-table
          :rows="convertDataToTable(requestedDoc.data)"
          :columns="dataColumns"
          :rows-per-page-options="[0]"
          row-key="name"
          separator="none"
          table-header-class="bg-indigo-1 text-indigo-6"
          flat
          hide-pagination
        >
          <template v-slot:body="props">
            <q-tr :props="props" class="bg-grey-1">
              <q-td key="value" :props="props">{{ props.row.value }}</q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            </q-tr>
          </template>
        </q-table>

        <div class="q-mt-xl row justify-center">
          <q-timeline color="indigo-6" layout="loose">
            <q-timeline-entry
              v-for="comment in comments"
              :key="comment.id"
              :subtitle="
                formattedPersianDate(comment.created_at) +
                ' ' +
                formattedPersianTime(comment.created_at)
              "
              side="left"
            >
              <q-chat-message
                sent
                class="q-pa-md"
                text-color="black"
                bg-color="indigo-1"
              >
                <template v-slot:default>
                  <div class="text-left">
                    {{ comment.text }}
                  </div>
                </template>
                <template v-slot:stamp>
                  <div class="q-mt-md">
                    <q-btn
                      @click="deleteComment(comment.id, requestedDoc.id)"
                      class="bg-indigo-1 text-indigo-6 q-mr-xs"
                      icon="delete"
                      size="xs"
                      flat
                    />
                    {{ diffDateText(comment.created_at) }}
                  </div>
                </template>
              </q-chat-message>
            </q-timeline-entry>
            <q-timeline-entry side="left">
              <q-input
                v-model="commentText"
                :rows="3"
                label="متن"
                type="textarea"
                filled
              />
              <q-btn
                @click="
                  createComment({
                    title: '',
                    text: commentText,
                    author: requestedDoc.patient.id,
                    document: requestedDoc.id,
                  })
                "
                :loading="createCommentLoading"
                label="ارسال"
                class="q-mt-sm bg-indigo-1 text-indigo-6"
                flat
              >
                <template v-slot:loading>
                  <q-spinner-orbit color="white" />
                </template>
              </q-btn>
            </q-timeline-entry>
            <q-timeline-entry subtitle="۱۴۰۰/۴/۱۷ ‏ ۲۲:۴۲:۴۹" side="right">
              <q-chat-message
                :text="[
                  'سلام ممنون شما مدارکتون رو ارسال کنید و منتظر خبر من بمونید تا بگم چه کنید و موفق باشید',
                ]"
                stamp="۷ ساعت قبل"
                class="q-pa-md"
                text-color="black"
                bg-color="indigo-1"
              />
            </q-timeline-entry>
          </q-timeline>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDocument } from '../hooks/useDocument';
import { usePdate } from '../hooks/usePdate';
import { DocumentData } from '../interfaces/Document';
import { useComment } from '../hooks/useComments';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $route = useRoute();
    const { getOneDocument, deleteDocument, requestedDoc } = useDocument();
    const {
      getCommentsByDocument,
      createComment,
      comments,
      commentText,
      createCommentLoading,
      deleteComment,
    } = useComment();

    onMounted(() => getOneDocument($route.params.id as string));
    onMounted(() => getCommentsByDocument($route.params.id as string));

    const { formattedPersianDate, formattedPersianTime, diffDateText } =
      usePdate();

    const objectPropertyCounter = function (obj: DocumentData) {
      return Object.getOwnPropertyNames(obj).length;
    };

    const dataColumns = [
      {
        name: 'value',
        label: 'مقدار',
        align: 'right',
      },
      {
        name: 'name',
        label: 'نام',
        align: 'right',
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
      formattedPersianDate,
      formattedPersianTime,
      diffDateText,
      objectPropertyCounter,
      dataColumns,
      convertDataToTable,
      deleteDocument,
      comments,
      createComment,
      deleteComment,
      commentText,
      createCommentLoading,
      requestedDoc,
    };
  },
});
</script>

<style lang="scss">
.doc-box {
  box-shadow: 0px 1px 39px 11px #eeeeee;
  border-radius: 8px;
}
</style>
