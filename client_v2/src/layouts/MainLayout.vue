<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      v-model="drawer"
      :mini="miniState"
      show-if-above
      :width="200"
      :breakpoint="500"
      content-class="bg-indigo-6 drawer-content"
    >
      <q-list class="q-mt-xl">
        <router-link class="router-link" to="/">
          <q-item>
            <q-item-section avatar>
              <q-icon
                flat
                name="create_new_folder"
                :color="$route.path == '/' ? 'indigo-6' : 'indigo-2'"
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
                :color="$route.path == '/documents' ? 'indigo-6' : 'indigo-2'"
                size="25px"
              />
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container class="row bg-grey-3">
      <div class="custom-main-container col-12 q-pa-xl">
        <CustomToolbar />
        <router-view class="q-mt-lg bg-white rounded-borders q-pa-md" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import CustomToolbar from '../components/Layout/CustomToolbar.vue';
import { useIconly } from '../hooks/useIconly';

export default defineComponent({
  name: 'MainLayout',

  components: {
    CustomToolbar,
  },

  setup() {
    const drawer = ref<boolean>(false);
    const miniState = ref<boolean>(true);

    onMounted(useIconly);

    return { drawer, miniState };
  },
});
</script>
