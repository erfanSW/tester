import { ref } from 'vue';
import User from '../services/UserService';
import { NotificationInterface } from '../interfaces/User';

function useNotification() {
  const notificationList = ref<NotificationInterface[]>([]);
  const notificationListLoading = ref<boolean>(false);
  const messageList = ref<NotificationInterface[]>([]);
  const messageListLoading = ref<boolean>(false);
  const NotificationType = {
    1: 'کامنت',
    2: 'آزمایش',
    3: 'درخواست',
    4: 'احراز هویت',
  };

  async function getNotificationList() {
    try {
      notificationListLoading.value = true;
      const result = await User.getNotification();
      notificationList.value = result.data as NotificationInterface[];
    } catch (error) {
    } finally {
      notificationListLoading.value = false;
    }
  }

  async function seenNotification(id: number) {
    try {
      const result = await User.seenNotification(id);
      if (result) {
        await getNotificationList();
      }
    } catch (error) {}
  }

  async function getMessageList() {
    try {
      messageListLoading.value = true;
      const result = await User.getMessage();
      messageList.value = result.data as NotificationInterface[];
    } catch (error) {
    } finally {
      messageListLoading.value = false;
    }
  }

  return {
    notificationList,
    notificationListLoading,
    NotificationType,
    getNotificationList,
    messageList,
    messageListLoading,
    getMessageList,
    seenNotification,
  };
}

export { useNotification };
