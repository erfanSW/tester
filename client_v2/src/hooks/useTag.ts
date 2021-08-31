import { ref } from 'vue';
import { TagInterface } from 'src/interfaces/User';
import Tag from 'src/services/TagService';

function useTag() {
  const tagList = ref<TagInterface[]>([]);


  async function getTags() {
    try {
      const result = await Tag.getAll();
      tagList.value = result.data as TagInterface[];
    } catch (error) {}
  }

  return {
    tagList,
    getTags,
  };
}

export { useTag };
