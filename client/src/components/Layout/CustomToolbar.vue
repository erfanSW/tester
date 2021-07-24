<template>
  <q-toolbar class="custom-main-toolbar">
    <div class="toolbar-btn-container">
      <q-btn
        flat
        round
        dense
        icon="menu"
        class="menu-btn text-indigo-6 q-mr-md"
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
        round
        flat
        dense
        icon="iconly:boldCall"
        class="text-indigo-6 q-mr-md md-menu-btn"
      />
      <q-btn
        round
        flat
        dense
        icon="iconly:boldProfile"
        class="text-indigo-6 md-menu-btn"
      />
      <q-btn
        class="text-indigo-6 sm-menu-btn"
        icon="more_vert"
        round
        flat
        dense
      >
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>عرفان چگینی</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>تماس تلفنی</q-item-section>
            </q-item></q-list
          >
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "CustomToolbar",
  components: {},
  setup(props) {
    const drawer = ref<boolean>(false);
    const miniState = ref<boolean>(true);

    return { drawer, miniState };
  }
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
