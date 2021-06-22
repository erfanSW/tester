import { ref, computed } from "@vue/composition-api";

function usePhone() {
  const phone = ref<String>("");

  const formattedPhone = computed((): string =>
    phone.value
      .split("-")
      .map(part => part.trim())
      .join("")
  );

  const isPhoneNumberEntered = computed((): boolean => {
    if (formattedPhone.value.length == 10) {
      return true;
    }
    return false;
  });

  return {
    phone,
    formattedPhone,
    isPhoneNumberEntered
  };
}

export { usePhone };
