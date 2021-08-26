import { ref, computed } from 'vue';
import User from '../services/UserService';
import { ActivityInterface } from '../interfaces/User';

function useActivity() {
  const activityList = ref<ActivityInterface[]>([]);
  const activityListLoading = ref<boolean>(false);
  const ActivityType = {
    1: 'کامنت',
    2: 'آزمایش',
    3: 'درخواست',
    4: 'احراز هویت',
  };

  async function getActivityList() {
    try {
      activityListLoading.value = true;
      const result = await User.getActivity();
      activityList.value = result.data as ActivityInterface[];
    } catch (error) {
    } finally {
      activityListLoading.value = false;
    }
  }



  const groupByActivity = computed(() =>{
    return [
      {
        name: 'کامنت',
        y: activityList.value.filter((activity) => activity.type === 1).length,
        color: '#F4C608',
      },
      {
        name: 'آزمایش',
        y: activityList.value.filter((activity) => activity.type === 2).length,
        color: '#7E0FDF',
      },
      {
        name: 'درخواست',
        y: activityList.value.filter((activity) => activity.type === 3).length,
        color: '#E11BA0',
      },
      {
        name: 'احراز هویت',
        y: activityList.value.filter((activity) => activity.type === 4).length,
        color: '#07E07C',
      },
    ];
  }
  );

  return {
    activityList,
    activityListLoading,
    ActivityType,
    getActivityList,
    groupByActivity,
  };
}

export { useActivity };
