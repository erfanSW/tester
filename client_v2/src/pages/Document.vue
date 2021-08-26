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
              <q-item-section class="text-grey" side>{{
                requestedDoc.archive ? 'بله' : 'خیر'
              }}</q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="request-list q-mt-md">
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
                <q-item-section class="text-grey" side
                  ><q-badge
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
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="q-mt-md">
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
          />
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
        <div class="q-mt-xl row justify-center" v-if="1">
          <q-timeline color="indigo-6" layout="loose">
            <q-timeline-entry
              v-for="comment in userComments"
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
                :name="
                  comment.author.fullname + ` ( ${comment.author.role.name} )`
                "
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
              v-for="comment in othersComment"
              :key="comment.id"
              :subtitle="
                formattedPersianDate(comment.created_at) +
                ' ' +
                formattedPersianTime(comment.created_at)
              "
              side="right"
            >
              <q-chat-message
                :name="
                  comment.author
                    ? comment.author.fullname +
                      ` ( ${comment.author.role.name} )`
                    : ''
                "
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
                    {{ diffDateText(comment.created_at) }}
                  </div>
                </template>
              </q-chat-message>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDocument } from '../hooks/useDocument';
import { usePdate } from '../hooks/usePdate';
import { DocumentData } from '../interfaces/Document';
import { useComment } from '../hooks/useComments';
import { useMembership } from '../hooks/useMembership';
import { useRequest } from '../hooks/useRequest';
import { useQuasar } from 'quasar';
import { UserDto } from '../interfaces/User';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $route = useRoute();
    const $q = useQuasar();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const user = $q.cookies.get('user') as UserDto;
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
    const { getOneDocument, deleteDocument, requestedDoc } = useDocument();
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
    } = useRequest();

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
      user,
      userComments,
      othersComment,
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
