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
      />
      <q-btn
        flat
        round
        dense
        icon="iconly:boldNotification"
        class="text-indigo-6"
      />
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
      <q-btn flat round dense icon="iconly:boldProfile" class="text-indigo-6" />
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CustomToolbar',
  components: {},
  setup() {
    const drawer = ref<boolean>(false);
    const miniState = ref<boolean>(true);

    return { drawer, miniState };
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
