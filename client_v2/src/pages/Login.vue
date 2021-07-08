<template>
  <div padding class="row justify-center items-center">
    <div class="q-mt-lg q-pa-sm login-card ltr">
      <q-input
        outlined
        stack-label
        prefix="+98"
        mask=" ### - ### - ####"
        :hint="hintMessage"
        v-model="phone"
      />
      <transition name="fade">
        <q-btn
          v-if="isPhoneNumberEntered"
          label="ورود"
          class="full-width q-mt-md shake"
          color="blue"
          outline
          @click="register({ phone: formattedPhone })"
        />
      </transition>
      <q-img class="q-mt-md" src="../assets/medicine.svg" />
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
