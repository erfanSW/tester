<template>
  <div padding class="row justify-center items-center">
    <div class="q-mt-lg q-pa-sm login-card">
      <q-toolbar class="bg-grey-1 text-indigo q-mb-lg">
        <div>ورود به سیستم</div>
      </q-toolbar>
      <q-img class="q-mt-md" src="../assets/medicine.svg" />
      <div class="ltr">
        <q-input
          outlined
          stack-label
          class="q-mt-lg"
          color="indigo"
          prefix="+98"
          mask=" ### - ### - ####"
          :hint="hintMessage"
          v-model="phone"
        />
      </div>
      <transition name="fade">
        <q-btn
          v-if="isPhoneNumberEntered"
          label="ورود"
          class="full-width q-mt-md shake bg-indigo text-white"
          flat
          @click="register({ phone: formattedPhone })"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { usePhone } from '../hooks/usePhone';
import { useMembership } from '../hooks/useMembership';

export default defineComponent({
  name: 'Login',
  props: {
    user: String,
  },
  setup() {
    const { phone, formattedPhone, isPhoneNumberEntered } = usePhone();
    const { register } = useMembership();

    const hintMessage = computed((): string => {
      if (formattedPhone.value.length == 10) {
        return 'بر روی دکمه ورود کلیک کنید';
      }
      return 'شماره تماس خود را وارد کنید';
    });

    return {
      phone,
      formattedPhone,
      isPhoneNumberEntered,
      hintMessage,
      register,
    };
  },
});
</script>

<style scoped>
.login-card {
  width: 400px;
  height: 500px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
