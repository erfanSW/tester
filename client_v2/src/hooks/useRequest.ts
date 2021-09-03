import { ref } from 'vue';
import { DocumentData, RequestDto } from 'src/interfaces/User';
import { RequestInterface } from 'src/interfaces/User';
import Request from '../services/RequestService';
import { useQuasar } from 'quasar';

function useRequest() {
  const requestList = ref<DocumentData[]>([]);
  const requestedDoc = ref<RequestInterface[]>([]);
  const newRequest = ref<RequestDto>({
    doctor: null as unknown as number,
    document: null as unknown as number,
    text: '',
  });
  const $q = useQuasar();

  const requestStateOptions = {
    0: 'نامشخص',
    1: 'رد شده',
    2: 'پذیرفته شده',
    3: 'پذیرفته شده توسط پزشک دیگر',
  };

  const requestStateColors =  {
    0: 'indigo',
    1: 'red',
    2: 'green',
    3: 'indigo'
  }

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

  async function createRequest(request: RequestDto) {
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
    requestStateColors,
  };
}

export { useRequest };
