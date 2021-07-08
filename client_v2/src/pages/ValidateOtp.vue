<template>
  <div class="row justify-center items-center">
    <q-input
      outlined
      autofocus
      v-model="otpModel"
      dir="ltr"
      mask=" #  #  #  #  #  # "
      color="grey-8"
      style="width: 120px;"
    />
    <div class="col-12 q-mt-xl q-pa-sm login-card">
      <q-img class="q-mt-xl" src="../assets/doctor.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useMembership } from '../hooks/useMembership';

export default defineComponent({
  name: 'SignUp',
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    const { validateOtp } = useMembership();

    onMounted(async () => {
      if (!$q.cookies.get('phone')) {
        await $router.push({ path: '/signup' });
      }
    });

    const otpModel = ref<string>('');
    const otp = computed(() => {
      return otpModel.value
        .split(' ')
        .map((word) => word.trim())
        .join('');
    });

    watch(otp, async (val: string) => {
      if (val.length == 6)
        await validateOtp($route.query['type'] as string, val);
    });

    return { otpModel };
  },
});
</script>

<style scoped>
.login-card {
  width: 300px;
  height: 400px;
}
</style>
