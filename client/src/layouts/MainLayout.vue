<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      :width="300"
      :breakpoint="500"
      side="left"
      content-class="bg-indigo-6"
    >
      <q-list class="q-mt-xl">
        <router-link class="router-link" to="/">
          <q-item>
            <q-item-section avatar>
              <q-icon
                flat
                name="create_new_folder"
                :color="$route.path == '/' ? 'indigo-1' : 'indigo-4'"
                size="25px"
              />
            </q-item-section>
          </q-item>
        </router-link>
        <router-link class="router-link" to="/documents">
          <q-item>
            <q-item-section avatar>
              <q-icon
                flat
                name="view_list"
                :color="$route.path == '/documents' ? 'indigo-1' : 'indigo-4'"
                size="25px"
              />
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>
    <q-page-container>
      <CustomToolbar />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import CustomToolbar from "../components/Layout/CustomToolbar.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    CustomToolbar
  },
  setup() {
    const drawer = ref<boolean>(false);
    const miniState = ref<boolean>(true);

    return { drawer, miniState };
  }
});
</script>
