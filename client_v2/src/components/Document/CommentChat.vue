<template>
  <div class="bg-grey-1 rounded-borders q-pa-md">
    <div class="text-caption text-grey text-left">
      <router-link :to="`/profile/${userid}`" class="custom-router-link">{{
        username
      }}</router-link>
    </div>
    <div class="text-left q-mt-md description">
      {{ description }}
    </div>
    <div
      class="text-caption text-grey q-mt-sm"
      :class="side === 'right' ? 'text-right' : ''"
    >
      <q-btn
        v-if="side === 'left'"
        @click="$emit('remove')"
        class="q-ml-sm"
        icon="delete"
        size="8px"
        flat
        dense
        round
      />
      {{ diffDateText(date) }}
    </div>
  </div>
</template>

<script lang="ts">
import { usePdate } from '../../hooks/usePdate';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    side: {
      type: String,
      default: 'right',
    },
    userid: {
      type: Number,
    },
    username: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  setup() {
    const { diffDateText } = usePdate();
    return { diffDateText };
  },
});
</script>

<style lang="scss" scoped>
.description {
  white-space: pre-line;
}
</style>
