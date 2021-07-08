import { ref } from 'vue';
import { DocumentInterface, DocumentData } from 'src/interfaces/Document';
import Docs from '../services/DocumentService';
import { useRouter } from 'vue-router';

function useDocument() {
  const documents = ref<DocumentData[]>([]);
  const requestedDoc = ref<DocumentData[]>([]);
  const $router = useRouter();

  async function getDocuments() {
    try {
      const result = await Docs.getAll();
      documents.value = [];
      documents.value = result.data as DocumentData[];
    } catch (error) {}
  }

  async function getOneDocument(id: string) {
    try {
      const result = await Docs.getOne(id);
      requestedDoc.value = result.data as DocumentData[];
    } catch (error) {}
  }

  async function createDocument(doc: DocumentInterface) {
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

  return {
    documents,
    requestedDoc,
    getDocuments,
    getOneDocument,
    createDocument,
    deleteDocument,
  };
}

export { useDocument };
