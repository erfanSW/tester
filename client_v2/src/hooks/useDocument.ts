import { ref } from 'vue';
import { DocumentInterface, DocumentDto } from 'src/interfaces/User';
import Docs from '../services/DocumentService';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

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
      console.log(doc)
      if (doc.name === '') {
        return Notify.create({
          message: 'لطفا عنوان آزمایش را وارد نمایید',
          color: 'red',
        });
      }
      if (doc.tag === undefined) {
        return Notify.create({
          message: 'لطفا موضوع آزمایش را انتخاب کنید',
          color: 'red',
        });
      }
      await Docs.create(doc);
      await $router.push({ path: 'documents' });
    } catch (error) {
      Notify.create({
        message: error as string,
        color: 'red',
      });
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
