import { ref } from 'vue';
import {
  DocumentInterface,
  DocumentDto,
} from 'src/interfaces/User';
import Docs from '../services/DocumentService';
import { useRouter } from 'vue-router';

function useDocument() {
  const documents = ref<DocumentInterface[]>([]);
  const requestedDoc = ref<DocumentInterface>();
  const $router = useRouter();
  const updateTagLoading = ref<boolean>(false);

  async function getDocuments() {
    try {
      const result = await Docs.getAll();
      documents.value = [];
      documents.value = result.data as DocumentInterface[];
    } catch (error) {}
  }

  async function getOneDocument(id: string) {
    try {
      const result = await Docs.getOne(id);
      requestedDoc.value = result.data as DocumentInterface;
    } catch (error) {}
  }

  async function createDocument(doc: DocumentDto) {
    try {
      await Docs.create(doc);
      await $router.push({ path: 'documents' });
    } catch (error) {
    } finally {
    }
  }

  async function deleteDocument(id: number) {
    try {
      await Docs.deleteOne(id);
      await getDocuments();
    } catch (error) {}
  }

  async function updateTag(id: number, tagId: number) {
    try {
      updateTagLoading.value = true;
      await Docs.updateTag(id, tagId);
    } catch (error) {
    } finally {
      updateTagLoading.value = false;
    }
  }

  return {
    documents,
    requestedDoc,
    getDocuments,
    getOneDocument,
    createDocument,
    deleteDocument,
    updateTag,
    updateTagLoading,
  };
}

export { useDocument };
