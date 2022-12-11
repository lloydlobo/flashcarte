import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { TDeck } from '../../components/Deck';
import { toastNotify } from '../../helpers/toast-notify.helpers';
import { postNewDeck } from '../../pages/Home';

/**
 * Custom Hook to handle the post deck mutation with useMutation hook.
 * @param setTitle Function to Set the value of the stateful variable `title`.
 */
function useMutationPostDeck(
  setTitle: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<{ deck: TDeck }, Error, string, unknown> {
  /**
   * Access the client.
   */
  const queryClient = useQueryClient();
  /** Mutations.
   * @see https://tanstack.com/query/v4/docs/guides/mutations
   * mutationFn: (newTodo) => { return axios.post('/todos', newTodo) }
   */
  return useMutation({
    mutationFn: postNewDeck,
    /**
     * On success refetch the queries with the queryKey and notify user.
     * @param response: { deck: IDeck } - The response from the mutation.
     * @param deck The deck to post.
     */
    onSuccess: async (response: { deck: TDeck }): Promise<void> => {
      await queryClient.refetchQueries(['decks'], {});
      await toastNotify(`Deck ${response.deck.title} created`);
      setTitle('');
    },
    /**
     * If error, throw error.
     * @param {Error} error
     */
    onError: async (error: Error): Promise<never> => {
      throw new Error(`Unable to create deck: ${error.message}`, {
        cause: error,
      });
    },
  });
}

export { useMutationPostDeck as useQueryMutationPostDeck };
