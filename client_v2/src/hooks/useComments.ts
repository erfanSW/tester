import { ref } from 'vue';
import { CommentDto } from 'src/interfaces/Comment';
import { CommentInterface } from 'src/interfaces/User';
import Comment from '../services/CommentService';

function useComment() {
  const comments = ref<CommentInterface[]>([]);
  const commentText = ref<string>('');
  const createCommentLoading = ref<boolean>(false);

  async function getCommentsByDocument(docId: string) {
    try {
      const result = await Comment.getOne(docId);
      comments.value = result.data as CommentInterface[];
    } catch (error) {}
  }

  async function createComment(comment: CommentDto) {
    try {
      createCommentLoading.value = true;
      await Comment.create(comment);
      await getCommentsByDocument(comment.document as unknown as string);
      commentText.value = '';
    } catch (error) {
    } finally {
      createCommentLoading.value = false;
    }
  }

  async function deleteComment(id: number, docId: string) {
    try {
      await Comment.deleteOne(id);
      await getCommentsByDocument(docId);
    } catch (error) {}
  }

  return {
    comments,
    commentText,
    createCommentLoading,
    getCommentsByDocument,
    createComment,
    deleteComment,
  };
}

export { useComment };
