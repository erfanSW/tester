<template>
  <q-page padding class="row justify-center items-center">
    <div class="q-mt-xl q-pa-sm login-card">
      <vue-otp-2
        dir="ltr"
        v-model="otp"
        length="6"
        join-character="-"
        @onComplete="val => (otp = val.join(''))"
      />
      <q-img class="q-mt-xl" src="../assets/doctor.svg" />
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  onMounted,
  reactive
} from "@vue/composition-api";
import { LoadingBar, Notify } from "quasar";
import VueOtp2 from "vue-otp-2";

import Docs from "../services/DocumentService";
import { UserInterface } from "../interfaces/User";

import { usePhone } from "../hooks/usePhone";

export default defineComponent({
  name: "SignUp",
  components: {
    VueOtp2
  },
  setup(props, context) {
    onMounted(() => {
      if (!context.root.$q.cookies.get("phone")) {
        context.root.$router.push("/login");
      }
    });

    const otp = ref<string>("");

    watch(otp, val => {
      validate_otp(otp.value);
    });

    async function validate_otp(otp: string) {
      try {
        const user: UserInterface = {
          phone: context.root.$q.cookies.get("phone"),
          password: otp
        };
        const result = await context.root.$store.dispatch(
          "user/validateLogin",
          user
        );
        context.root.$q.cookies.set("access_token", result.data.access_token, {
          expires: 1,
          secure: true
        });
        context.root.$router.push({
          path: "/"
        });
      } catch (error) {
        if (error.response.status == 404) {
          context.root.$router.push({
            path: "/signup"
          });
        } else if (error.response.status == 401) {
          context.root.$q.notify({
            message: "کد اعتبارسنجی نادرست است",
            color: "red",
            position: "top"
          });
        }
      }
    }

    return { otp };
  }
});
</script>

<style scoped>
.login-card {
  width: 400px;
  height: 500px;
}
</style>
