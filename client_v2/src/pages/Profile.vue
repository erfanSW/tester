<template>
    <q-page padding>
      <div class="row justify-center">
        <q-img src="../assets/profile.svg" width="200px" height="200px" />
      </div>
      <div v-if="userProfile" class="row q-mt-lg">
        <div class="col-6 q-pa-sm">
          <label>نام و نام خانوادگی</label>
          <q-field class="q-mt-sm" readonly outlined dense>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ userProfile.fullname }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="col-6 q-pa-sm">
          <label>تاریخ عضویت</label>
          <q-field class="q-mt-sm" readonly outlined dense>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ formattedPersianDateTime(userProfile.created_at) }}
              </div>
            </template>
          </q-field>
        </div>
        <div v-if="userProfile.role" class="col-6 q-pa-sm q-mt-md">
          <label>نوع کاربر</label>
          <q-field class="q-mt-sm" readonly outlined dense>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ userProfile.role.name }}
              </div>
            </template>
          </q-field>
        </div>
        <div v-if="userProfile.tag" class="col-6 q-pa-sm q-mt-md">
          <label>تخصص</label>
          <q-field class="q-mt-sm" readonly outlined dense>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ userProfile.tag.name }}
              </div>
            </template>
          </q-field>
        </div>
      </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { usePdate } from '../hooks/usePdate';
import { useMembership } from '../hooks/useMembership';
import { useTag } from '../hooks/useTag';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Profile',
  components: {},
  setup() {
    const { getUserProfile, userProfile, updateProfile, updateProfileLoading } =
      useMembership();

    const { formattedPersianDateTime } = usePdate();

    const { tagList, getTags } = useTag();

    const requestUserId = useRoute().params.id as unknown as number;

    onMounted(() => getUserProfile(requestUserId));
    onMounted(() => getTags());

    return {
      formattedPersianDateTime,
      userProfile,
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
