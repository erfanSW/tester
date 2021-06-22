<template>
  <q-page padding class="row justify-center items-center">
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
          @click="login"
        />
      </transition>
      <q-img class="q-mt-md" src="../assets/medicine.svg" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "@vue/composition-api";
import { LoadingBar, Notify } from "quasar";
import { usePhone } from "../hooks/usePhone";

export default defineComponent({
  name: "Login",
  props: {
    user: String
  },
  setup(props, context) {
    const { phone, formattedPhone, isPhoneNumberEntered } = usePhone();

    const hintMessage = computed((): string => {
      if (formattedPhone.value.length == 10) {
        return "بر روی دکمه ورود کلیک کنید";
      }
      return "شماره تماس خود را وارد کنید";
    });

    async function login() {
      try {
        const result = await context.root.$store.dispatch("user/register", {
          phone: formattedPhone.value
        });
        context.root.$q.notify({
          message: result.data,
          position: "top",
          color: "positive",
          timeout: 10000
        });
        context.root.$q.cookies.set("phone", formattedPhone.value, {
          secure: true
        });
        setTimeout(() => {
          context.root.$router.push({
            path: "/validate_signup",
            query: {
              type: "login"
            }
          });
        }, 1000);
      } catch (error) {
        if ((error.response.status = 404)) {
          context.root.$store.commit("user/SetPhone", formattedPhone);
          context.root.$router.push({
            path: "/signup"
          });
        }
      }
    }
    return { phone, isPhoneNumberEntered, hintMessage, login };
  }
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
