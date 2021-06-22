import { ref, SetupContext } from "@vue/composition-api";
import { DocumentInterface } from "src/interfaces/Document";
import Docs from "../services/DocumentService";

function useDocument(context: SetupContext) {
  const documents = ref<object[]>([]);

  async function getDocuments() {
    try {
      const result = await Docs.getAll();
      documents.value = result.data;
    } catch (error) {}
  }

  async function createDocument(doc: DocumentInterface) {
    try {
      const result = await Docs.create(doc);
      context.root.$router.push({ path: "documents" });
    } catch (error) {
    } finally {
    }
  }

  async function deleteDocument(id: number) {
    try {
      const result = await Docs.deleteOne(id);
      getDocuments();
    } catch (error) {}
  }

  return { documents, getDocuments, createDocument, deleteDocument };
}

export { useDocument };
