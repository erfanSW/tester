<template>
  <q-toolbar class="custom-main-toolbar">
    <div class="toolbar-btn-container">
      <q-btn
        flat
        round
        dense
        icon="menu"
        class="text-indigo-6 q-mr-md"
        @click="$emit('toggle-menu')"
      />
      <q-btn
        flat
        round
        dense
        icon="iconly:boldMessage"
        class="text-indigo-6 q-mr-md"
        :loading="messageListLoading"
      >
        <template v-slot:loading>
          <q-spinner-orbit />
        </template>
        <q-menu>
          <q-list>
            <div v-for="notification in messageList" :key="notification.id">
              <q-item
                :to="
                  notification.type === 1
                    ? `/documents/${notification.notificationElementId}`
                    : '/requests'
                "
                clickable
              >
                <q-item-section avatar
                  ><q-icon
                    :name="
                      notification.type === 1
                        ? 'iconly:boldChat'
                        : 'iconly:boldInfo-Circle'
                    "
                    color="indigo-6"
                /></q-item-section>
                <q-item-section>
                  {{ notification.sender ? notification.sender.fullname : '' }}
                  {{ notification.text }}</q-item-section
                >
                <q-item-section side></q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn
        flat
        round
        dense
        icon="iconly:boldNotification"
        class="text-indigo-6"
        :loading="notificationListLoading"
      >
        <template v-slot:loading>
          <q-spinner-orbit />
        </template>
        <q-badge color="red" floating>{{ notificationList.length }}</q-badge>
        <q-menu>
          <q-list>
            <div
              v-for="notification in notificationList"
              :key="notification.id"
              class="row"
            >
              <q-item
                :to="
                  notification.type === 1
                    ? `/documents/${notification.notificationElementId}`
                    : '/requests'
                "
                clickable
              >
                <q-item-section avatar
                  ><q-icon
                    :name="
                      notification.type === 1
                        ? 'iconly:boldChat'
                        : 'iconly:boldInfo-Circle'
                    "
                    color="indigo-6"
                /></q-item-section>
                <q-item-section
                  >{{
                    notification.sender ? notification.sender.fullname : ''
                  }}
                  {{ notification.text }}</q-item-section
                >
                <q-item-section side></q-item-section>
              </q-item>
              <q-space />
              <div class="q-pa-sm">
                <q-btn
                  @click="seenNotification(notification.id)"
                  class="bg-indigo-1 text-indigo-6"
                  label="دیدم"
                  flat
                />
              </div>
            </div>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <q-space />
    <div class="toolbar-btn-container">
      <q-btn
        flat
        round
        dense
        icon="iconly:boldCall"
        class="text-indigo-6 q-mr-md"
      />
      <q-btn flat round dense icon="iconly:boldProfile" class="text-indigo-6">
        <q-menu>
          <q-card style="width: 200px">
            <q-list>
              <q-item to="/profile">
                <q-item-section avatar>
                  <q-icon name="iconly:boldProfile" color="indigo" />
                </q-item-section>
                <q-item-section>
                  {{ user.fullname }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="iconly:boldCall" color="indigo" />
                </q-item-section>
                <q-item-section>
                  {{ user.phone }}
                </q-item-section>
              </q-item>
              <q-item @click="logout" clickable>
                <q-item-section avatar>
                  <q-icon name="iconly:boldLogout" color="indigo" />
                </q-item-section>
                <q-item-section> خروج </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useNotification } from '../../hooks/useNotification';
import { useUser } from '../../hooks/useUser';
import { useMembership } from '../../hooks/useMembership';

export default defineComponent({
  name: 'CustomToolbar',
  components: {},
  setup() {
    const drawer = ref<boolean>(false);
    const miniState = ref<boolean>(true);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = useUser();

    const {
      notificationList,
      notificationListLoading,
      getNotificationList,
      messageList,
      messageListLoading,
      getMessageList,
      seenNotification,
    } = useNotification();

    const { logout } = useMembership();

    onMounted(() => getNotificationList());
    onMounted(() => getMessageList());

    return {
      drawer,
      miniState,
      notificationList,
      notificationListLoading,
      messageList,
      messageListLoading,
      getMessageList,
      seenNotification,
      user,
      logout
    };
  },
});
</script>

<style lang="scss" scoped>
.show-in-700 {
  display: none !important;

  @media screen and (max-width: 700px) {
    display: inline-block !important;
  }
}

.hide-in-700 {
  display: inline-block !important;

  @media screen and (max-width: 700px) {
    display: none !important;
  }
}

.toolbar-btn-container {
  background: white;
  padding: 1px 23px 1px 19px;
  border-radius: 8px;
}

.custom-main-toolbar {
  padding: 0px;
}

.submenu-btn {
  @extend .show-in-700;

  .submenu-fab-btn {
    width: 140px;
  }
}

.menu-btn,
.sm-menu-btn {
  @extend .show-in-700;
}

.md-menu-btn {
  @extend .hide-in-700;
}
</style>
