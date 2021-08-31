<template>
  <div class="row justify-center items-center">
    <div class="q-mt-xl q-pa-sm login-card">
      <q-toolbar class="bg-grey-1 text-indigo q-mb-lg">
        <div>ورود کد دومرحله ای</div>
      </q-toolbar>
      <div class="col-12 q-mt-md q-pa-sm">
        <q-img src="../assets/medicine.svg" />
      </div>
      <q-input
        outlined
        autofocus
        class="q-mt-md"
        v-model="otpModel"
        dir="ltr"
        mask=" #  #  #  #  #  # "
        color="indigo"
      />
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
  width: 400px;
  height: 500px;
}
</style>
