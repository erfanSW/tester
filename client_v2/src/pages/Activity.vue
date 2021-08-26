<template>
  <div>
    <q-page padding>
      <q-toolbar class="bg-grey-1 text-indigo">
      <div>
        فعالیت های کاربر
      </div>
    </q-toolbar>
      <q-timeline class="q-mt-lg" color="indigo">
        <q-timeline-entry
          v-for="activity in activityList"
          :key="activity.id"
          :title="ActivityType[activity.type]"
          :subtitle="diffDateText(activity.created_at)"
        >
          <div>{{ activity.text }}</div>
        </q-timeline-entry>
      </q-timeline>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useActivity } from '../hooks/useActivity';
import { usePdate } from '../hooks/usePdate';

export default defineComponent({
  name: 'PageIndex',
  components: {},
  setup() {
    const { activityList, activityListLoading, getActivityList, ActivityType } =
      useActivity();

    const { diffDateText } = usePdate();

    onMounted(() => getActivityList());
    return {
      activityList,
      activityListLoading,
      ActivityType,
      diffDateText
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
