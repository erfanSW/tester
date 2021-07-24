import { ref } from 'vue';
import { DocumentInterface, DocumentData } from 'src/interfaces/Document';
import Request from '../services/RequestService';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

function useRequest() {
  const requestList = ref<DocumentData[]>([]);
  const requestedDoc = ref<DocumentData[]>([]);
  const $router = useRouter();
  const $q = useQuasar();

  const requestStateOptions = ['نامشخص','رد شده','پذیرفته شده']

  async function getRequests() {
    try {
      const result = await Request.getAll();
      requestList.value = [];
      requestList.value = result.data as DocumentData[];
    } catch (error) {}
  }

  async function changeRequestState(id: number, state: number) {
    try {
      const result = await Request.updateState(id, state);
      if (result) {
        await getRequests();
        $q.notify({
          message: 'با موفقیت انجام شد',
          color: 'positive',
        });
      } else {
        $q.notify({
          message: 'عملیات با خطا مواجه شد',
          color: 'red',
        });
      }
    } catch (error) {}
  }

  async function createDocument(doc: DocumentInterface) {
    try {
      await Request.create(doc);
      await $router.push({ path: 'documents' });
    } catch (error) {
    } finally {
    }
  }

  async function deleteDocument(id: number) {
    try {
      await Request.deleteOne(id);
      await getRequests();
    } catch (error) {}
  }

  return {
    requestList,
    requestedDoc,
    getRequests,
    changeRequestState,
    getOneDocument,
    createDocument,
    deleteDocument,
    requestStateOptions,
  };
}

export { useRequest };
