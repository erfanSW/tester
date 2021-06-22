<template>
  <div></div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  watch,
  ref,
  toRef,
  Ref,
  onMounted
} from "@vue/composition-api";
import { Todo, Meta } from "./models";

function useClickCount() {
  const clickCount = ref(0);
  function increment() {
    clickCount.value += 1;
    return clickCount.value;
  }

  return { clickCount, increment };
}

function useDisplayTodo(todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length);
  return { todoCount };
}

function useCom() {
  let mutable = ref(1);

  const mutateMutable = function() {
    mutable.value += 1;
  };

  return { mutable, mutateMutable };
}

export default defineComponent({
  name: "CompositionComponent",
  props: {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: (Array as unknown) as PropType<Todo[]>,
      default: () => []
    },
    meta: {
      type: (Object as unknown) as PropType<Meta>,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(props) {
    const myfunc = function() {
      console.log(12);
    };
    const yourfunc = function() {
      console.log(12);
    };
    onMounted(myfunc);
    watch(useCom().mutable, (val: number) => console.log(val));

    return {
      ...useClickCount(),
      ...useDisplayTodo(toRef(props, "todos")),
      ...useCom()
    };
  }
});
</script>
