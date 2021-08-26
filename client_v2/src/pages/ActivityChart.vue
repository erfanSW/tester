<template>
  <q-page padding>
    <q-toolbar class="bg-grey-1 text-indigo">
      <div>
        گزارش فعالیت های کاربر
      </div>
    </q-toolbar>
    <highcharts
      v-if="activityList.length !== 0"
      :series="[{ name: 'فعالیت ها', data: groupByActivity }]"
      class="q-mt-xl"
    ></highcharts>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useActivity } from '../hooks/useActivity';
import { usePdate } from '../hooks/usePdate';
import Chart from '../components/Chart.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    highcharts: Chart,
  },
  setup() {
    const {
      activityList,
      activityListLoading,
      getActivityList,
      ActivityType,
      groupByActivity,
    } = useActivity();

    const { diffDateText } = usePdate();

    onMounted(() => getActivityList());

    return {
      activityList,
      activityListLoading,
      ActivityType,
      diffDateText,
      groupByActivity,
    };
  },
});
</script>
