<template>
  <q-page padding class="row justify-center items-center">
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
        option-label="name"
        option-value="id"
        emit-value
        v-model="user.role"
        label="انتخاب کنید"
        class="q-mt-md"
      />
      <div>
        <q-btn
          :disable="!areAllFieldsFilledIn"
          @click="signup"
          color="grey"
          class="full-width q-mt-lg"
          label="ثبت نام"
        />
        <q-img class="q-mt-xl" src="../assets/doctor.svg" />
      </div>
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

import Docs from "../services/DocumentService";
import { UserInterface, OtpType } from "../interfaces/User";

import { usePhone } from "../hooks/usePhone";

export default defineComponent({
  name: "SignUp",
  setup(props, context) {
    const { phone, formattedPhone, isPhoneNumberEntered } = usePhone();

    const user = ref<UserInterface>({
      phone: null,
      role: null,
      fullname: null
    });

    watch(formattedPhone, (val: string) => {
      user.value.phone = val;
    });

    const role_list = computed(
      () => context.root.$store.getters["role/role_list"]
    );
    const areAllFieldsFilledIn = computed(() =>
      Object.getOwnPropertyNames(user.value).every(
        (field: string) => !!user.value[field]
      )
    );

    async function signup() {
      try {
        const result = await context.root.$store.dispatch("user/signup", {
          ...user.value
        });
        context.root.$q.cookies.set("phone", formattedPhone.value, {
          expires: "5m"
        });
        context.root.$router.push({
          path: "validate_signup",
          query: {
            type: OtpType.SIGNUP
          }
        });
      } catch (error) {
        if (error.response.status == 409) {
          context.root.$router.push({ path: "login" });
          context.root.$q.notify({
            message: "شما با این شماره قبلا ثبت نام کردید",
            position: "top",
            color: "warning"
          });
        }
      }
    }

    onMounted(() => context.root.$store.dispatch("role/get_all_roles"));

    onMounted(() => {
      user.value.phone = context.root.$store.state.user.phone.value;
    });

    return { role_list, user, areAllFieldsFilledIn, signup, phone };
  }
});
</script>

<style scoped>
.login-card {
  width: 400px;
  height: 500px;
}
</style>
