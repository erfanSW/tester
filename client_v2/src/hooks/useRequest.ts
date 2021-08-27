import { ref } from 'vue';
import { DocumentData } from 'src/interfaces/Document';
import { RequestInterface } from 'src/interfaces/Request';
import Request from '../services/RequestService';
import { useQuasar } from 'quasar';

function useRequest() {
  const requestList = ref<DocumentData[]>([]);
  const requestedDoc = ref<DocumentData[]>([]);
  const newRequest = ref<RequestInterface>({
    text: '',
    doctor: null as unknown as number,
    document: null as unknown as number,
  });
  const $q = useQuasar();

  const requestStateOptions = ['نامشخص', 'رد شده', 'پذیرفته شده','پذیرفته شده توسط پزشک دیگر'];

  async function getRequests() {
    try {
      const result = await Request.getAll();
      requestList.value = [];
      requestList.value = result.data as DocumentData[];
    } catch (error) {}
  }

  async function getRequestsByDocument(documentId: number) {
    try {
      const result = await Request.getByDoc(documentId);
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

  async function createRequest(request: RequestInterface) {
    try {
      await Request.create(request);
      await getRequestsByDocument(request.document);
      newRequest.value.doctor = null as unknown as number;
      newRequest.value.text = '';
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
    getRequestsByDocument,
    changeRequestState,
    createRequest,
    deleteDocument,
    requestStateOptions,
    newRequest,
  };
}

export { useRequest };
