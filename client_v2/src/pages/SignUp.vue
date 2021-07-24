<template>
  <div class="row justify-center items-center">
    <div class="q-mt-xs q-pa-sm login-card">
      <q-input
        outlined
        stack-label
        prefix="+98"
        mask=" ### - ### - ####"
        class="ltr"
        v-model="phone"
      />
      <q-input
        stack-label
        borderless
        class="ltr"
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
          color="grey"
          class="full-width q-mt-lg"
          label="ثبت نام"
        />
        <q-img class="q-mt-xl" src="../assets/doctor.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from 'vue';

import { UserDto } from '../interfaces/User';

import { usePhone } from '../hooks/usePhone';
import { useMembership } from '../hooks/useMembership';

export default defineComponent({
  name: 'SignUp',
  setup() {
    const { phone, formattedPhone } = usePhone();

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
      // user.value.phone = context.root.$store.state.user.phone.value;
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
