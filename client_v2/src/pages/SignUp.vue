<template>
  <div>
    <div class="row justify-center items-center">
      <div class="q-mt-lg q-pa-sm login-card">
        <q-toolbar class="bg-grey-1 text-indigo q-mb-lg">
          <div>ثبت نام</div>
        </q-toolbar>
        <q-img class="q-mt-md" src="../assets/medicine.svg" />

        <q-input
          outlined
          stack-label
          color="indigo"
          class="ltr q-mt-md"
          prefix="+98"
          mask=" ### - ### - ####"
          v-model="phone"
        />
        <q-input
          stack-label
          outlined
          dense
          color="indigo"
          class="ltr q-mt-md"
          v-model="user.fullname"
          label="نام کامل"
        />
        <q-select
          borderless
          :options="role_list"
          map-options
          emit-value
          v-model="user.role"
          label="انتخاب کنید"
          class="q-mt-md"
        />
        <div>
          <q-btn
            :disable="!areAllFieldsFilledIn"
            @click="signup(user)"
            :class="
              areAllFieldsFilledIn
                ? 'bg-indigo text-white'
                : 'bg-indigo-1 text-indigo'
            "
            class="full-width q-mt-lg"
            label="ثبت نام"
            flat
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from 'vue';

import { UserDto } from '../interfaces/User';

import { usePhone } from '../hooks/usePhone';
import { useMembership } from '../hooks/useMembership';

import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SignUp',
  setup() {
    const { phone, formattedPhone } = usePhone();

    const $route = useRoute();

    const user = ref<UserDto>({
      phone: '',
      role: 1,
      fullname: '',
    });

    watch(formattedPhone, (val: string) => {
      user.value.phone = val;
    });

    const { signup } = useMembership();

    const role_list = computed(() => [
      { label: 'بیمار', value: 1 },
      { label: 'دکتر', value: 2 },
    ]);
    const areAllFieldsFilledIn = computed(() =>
      Object.getOwnPropertyNames(user.value).every((field) => user.value[field])
    );
    onMounted(() => {
      if ($route.query.phone) phone.value = $route.query.phone as string;
    });

    return { role_list, user, areAllFieldsFilledIn, signup, phone };
  },
});
</script>

<style scoped>
.login-card {
  width: 400px;
  height: 500px;
}
</style>
