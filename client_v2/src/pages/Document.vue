<template>
  <q-page
    padding
    class="q-px-xl q-py-sm rounded-borders shadow-24"
    v-if="requestedDoc"
  >
    <div class="row">
      <div class="text-h6 q-pa-md">
        {{ requestedDoc.name }}
      </div>
      <q-space />
      <q-btn
        v-if="requestedDoc.data"
        color="indigo"
        icon-right="iconly:boldPaper-Download"
        no-caps
        @click="exportTable(dataColumns, convertDataToTable(requestedDoc.data))"
        flat
      >
        <q-tooltip> دانلود جداول </q-tooltip>
      </q-btn>
      <q-btn
        color="indigo"
        icon="iconly:boldDocument"
        @click="printScreen"
        flat
        no-caps
      >
        <q-tooltip> پرینت صفحه </q-tooltip>
      </q-btn>
    </div>

    <div class="row">
      <div class="doc-description col-sm-6 col-md-3 q-pa-md">
        <div class="doc-box">
          <q-img src="../assets/online-doctor.svg" fit="fill" />
          <q-list>
            <q-item clickable v-ripple>
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
            <q-item clickable v-ripple>
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
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon
                  name="iconly:boldBookmark"
                  size="20px"
                  class="text-indigo-6"
                />
              </q-item-section>
              <q-item-section class="text-grey">آرشیو</q-item-section>
              <q-item-section class="text-grey" side>
                <q-toggle
                  v-if="user.id == requestedDoc.patient.id"
                  v-model="requestedDoc.archived"
                  @click="
                    () => updateArchived(requestedDoc.id, requestedDoc.archived)
                  "
                  color="indigo"
                  keep-color
                  dense
                />
                <div v-else>{{ requestedDoc.archived ? 'بله' : 'خیر' }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div
          class="q-mt-lg"
          v-if="user.id == requestedDoc.patient.id && !requestedDoc.archived"
        >
          <q-select
            v-model="requestedDoc.tag"
            :options="tagList"
            class="q-mt-sm q-pa-sm"
            label="حوزه آزمایش"
            option-label="name"
            option-value="id"
            map-options
            emit-value
            dense
            outlined
          />
          <div class="q-pa-sm" dir="ltr">
            <q-btn
              @click="updateTag(requestedDoc.id, requestedDoc.tag)"
              :loading="updateTagLoading"
              class="bg-indigo-6 text-white"
              label="تغییر موضوع"
              flat
            >
              <template v-slot:loading>
                <q-spinner-orbit color="white" />
              </template>
            </q-btn>
          </div>
        </div>
        <div
          class="request-list q-mt-md"
          v-if="user.id == requestedDoc.patient.id"
        >
          <label>درخواست ها</label>
          <div
            class="request-card doc-box bg-white q-mt-md q-pa-sm"
            v-for="request in requestList"
            :key="request.id"
          >
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon
                    name="iconly:boldMessage"
                    size="20px"
                    class="text-indigo-6"
                  />
                </q-item-section>
                <q-item-section class="text-grey">{{
                  request.text
                }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon
                    name="iconly:boldTime-Circle"
                    size="20px"
                    class="text-indigo-6"
                  />
                </q-item-section>
                <q-item-section class="text-grey">{{
                  diffDateText(request.created_at)
                }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon
                    name="iconly:boldProfile"
                    size="20px"
                    class="text-indigo-6"
                  />
                </q-item-section>
                <q-item-section class="text-grey">{{
                  request.doctor ? request.doctor.fullname : ''
                }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon
                    name="iconly:boldInfo-Circle"
                    size="20px"
                    class="text-indigo-6"
                  />
                </q-item-section>
                <q-item-section class="text-grey overflow-hidden" side
                  ><q-badge
                    :label="requestStateOptions[request.state]"
                    :color="requestStateColors[request.state]"
                    class="q-pa-sm"
                    flat
                    dense
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div
          class="q-mt-md"
          v-if="user.id == requestedDoc.patient.id && !requestedDoc.archived"
        >
          <q-select
            v-model="newRequest.doctor"
            :options="doctors"
            label="انتخاب دکتر"
            class="q-pa-sm"
            map-options
            option-label="fullname"
            option-value="id"
            emit-value
            borderless
            dense
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label v-html="scope.opt.fullname" />
                  <q-item-label caption>{{
                    scope.opt.tag ? scope.opt.tag.name : 'تخصص نا مشخص'
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            v-model="newRequest.text"
            class="q-pa-sm"
            type="textarea"
            filled
          />
          <div class="q-pa-sm" dir="ltr">
            <q-btn
              @click="createRequest(newRequest)"
              label="ارسال درخواست"
              class="bg-indigo-1 text-indigo-6"
              flat
            />
          </div>
        </div>
      </div>
      <div
        class="doc-detail col-sm-6 col-md-9 q-pa-md"
        v-if="requestedDoc.data"
      >
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
          <q-timeline layout="loose" color="indigo-6">
            <q-timeline-entry
              side="left"
              v-if="
                requestedDoc.doctor
                  ? requestedDoc.doctor.id == user.id ||
                    requestedDoc.patient.id == user.id
                  : requestedDoc.patient.id == user.id
              "
            >
              <q-input
                v-if="!requestedDoc.archived"
                v-model="commentText"
                :rows="3"
                label="متن"
                type="textarea"
                filled
              />
              <q-btn
                v-if="!requestedDoc.archived"
                @click="
                  createComment({
                    title: '',
                    text: commentText,
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
            <q-timeline-entry
              v-for="comment in comments"
              :key="comment.id"
              :side="comment.author.id === user.id ? 'left' : 'right'"
            >
              <CommentChat
                :username="comment.author ? comment.author.fullname : ''"
                :userid="comment.id ? comment.author.id : 0"
                :description="comment.text"
                :date="comment.created_at"
                :side="comment.author.id === user.id ? 'left' : 'right'"
                @remove="() => deleteComment(comment.id, requestedDoc.id)"
              />
            </q-timeline-entry>
          </q-timeline>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDocument } from '../hooks/useDocument';
import { usePdate } from '../hooks/usePdate';
import { DocumentData } from '../interfaces/User';
import { useComment } from '../hooks/useComments';
import { useMembership } from '../hooks/useMembership';
import { useRequest } from '../hooks/useRequest';
import { useTag } from '../hooks/useTag';
import { useUser } from '../hooks/useUser';
import { useExport } from '../hooks/useExport';
import CommentChat from '../components/Document/CommentChat.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    CommentChat,
  },
  setup() {
    const $route = useRoute();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = useUser();
    const userComments = computed(function () {
      return comments.value.length === 0
        ? []
        : comments.value.filter((comment) => comment.author.id == user.id);
    });
    const othersComment = computed(function () {
      return comments.value.length === 0
        ? []
        : comments.value.filter((comment) => comment.author.id != user.id);
    });
    const {
      getOneDocument,
      deleteDocument,
      requestedDoc,
      updateTag,
      updateTagLoading,
      updateArchived,
      updateArchivedLoading,
    } = useDocument();
    const {
      getCommentsByDocument,
      createComment,
      comments,
      commentText,
      createCommentLoading,
      deleteComment,
    } = useComment();

    const { getDoctors, doctors } = useMembership();

    const {
      newRequest,
      createRequest,
      requestList,
      getRequestsByDocument,
      requestStateOptions,
      requestStateColors,
    } = useRequest();

    const archived = ref<boolean>(false);

    onMounted(() => getOneDocument($route.params.id as string));
    onMounted(() => getCommentsByDocument($route.params.id as string));
    onMounted(() => getDoctors());
    onMounted(
      () => (newRequest.value.document = $route.params.id as unknown as number)
    );
    onMounted(() =>
      getRequestsByDocument($route.params.id as unknown as number)
    );

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

    const { tagList, getTags } = useTag();
    onMounted(() => getTags());

    const { exportTable } = useExport();

    const printScreen = function () {
      window.print();
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
      doctors,
      newRequest,
      createRequest,
      requestList,
      requestStateOptions,
      requestStateColors,
      user,
      userComments,
      othersComment,
      tagList,
      updateTag,
      updateTagLoading,
      archived,
      updateArchived,
      updateArchivedLoading,
      exportTable,
      printScreen,
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
