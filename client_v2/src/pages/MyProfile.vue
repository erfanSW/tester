<template>
  <div>
    <q-page padding>
      <div class="row justify-center">
        <q-img src="../assets/profile.svg" width="200px" height="200px" />
      </div>
      <div v-if="myProfile" class="row q-mt-lg">
        <div class="col-6 q-pa-sm">
          <label>نام و نام خانوادگی</label>
          <q-input v-model="myProfile.fullname" class="q-mt-sm" dense filled />
        </div>
        <div class="col-6 q-pa-sm">
          <label>شماره تلفن</label>
          <q-field class="q-mt-sm" readonly outlined dense>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ myProfile.phone }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="col-6 q-pa-sm q-mt-md">
          <label>تاریخ عضویت</label>
          <q-field class="q-mt-sm" readonly outlined dense>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ formattedPersianDateTime(myProfile.created_at) }}
              </div>
            </template>
          </q-field>
        </div>
        <div v-if="myProfile.role" class="col-6 q-pa-sm q-mt-md">
          <label>نوع کاربر</label>
          <q-field class="q-mt-sm" readonly outlined dense>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ myProfile.role.name }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="col-12 q-pa-sm q-mt-md" v-if="myProfile.role.id === 2">
          <label>تخصص</label>
          <q-select
            v-model="myProfile.tag"
            :options="tagList"
            class="q-mt-sm"
            option-label="name"
            option-value="id"
            map-options
            emit-value
            dense
            filled
          />
        </div>
        <div class="col-12 q-pa-sm q-mt-lg" dir="ltr">
          <q-btn
            @click="
              updateProfile({
                id: myProfile.id,
                fullname: myProfile.fullname,
                tag: myProfile.tag,
              })
            "
            :loading="updateProfileLoading"
            class="bg-indigo text-white"
            label="ذخیره اطلاعات"
            flat
          >
            <template v-slot:loading>
              <q-spinner-orbit color="white" />
            </template>
          </q-btn>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { usePdate } from '../hooks/usePdate';
import { useMembership } from '../hooks/useMembership';
import { useTag } from '../hooks/useTag';

export default defineComponent({
  name: 'MyProfile',
  components: {},
  setup() {
    const { getMyProfile, myProfile, updateProfile, updateProfileLoading } =
      useMembership();

    const { formattedPersianDateTime } = usePdate();

    const { tagList, getTags } = useTag();

    onMounted(() => getMyProfile());
    onMounted(() => getTags());

    return {
      formattedPersianDateTime,
      myProfile,
      tagList,
      getTags,
      updateProfile,
      updateProfileLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.badge {
  border-radius: 6px;
}

.key {
  @extend .badge;
}

.value {
  @extend .badge;
}
</style>
