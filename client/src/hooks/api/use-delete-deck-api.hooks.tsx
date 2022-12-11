import { QueryClient, useMutation } from '@tanstack/react-query';

import { TButtonMouseEvent } from '../../components/Deck/Deck';
import { TDeck } from '../../components/Deck/Deck.interface';
import { deleteDeckAPI } from '../../helpers/api/delete-deck-api.helpers';
import { toastNotify } from '../../helpers/toast-notify.helpers';

/**
 * Hook to delete a deck by id on close click.
 *
 * @param queryClient
 */
export function useDeleteDeck(
  queryClient: QueryClient,
): (e: TButtonMouseEvent, _id: TDeck['_id']) => void {
  const mutationDeleteDeck = useMutation({
    mutationFn: deleteDeckAPI,

    onSuccess: async (response: { deck: TDeck }) => {
      await queryClient.refetchQueries(['decks'], {});
      toastNotify(`Deck ${response.deck.title} deleted`, {
        type: 'success',
      });
    },

    onError: async (error: Error) => {
      throw new Error(`Unable to create deck: ${error.message}`, {
        cause: error,
      });
    },
  });

  return (e: TButtonMouseEvent, _id: TDeck['_id']): void => {
    e.preventDefault();
    mutationDeleteDeck.mutate(_id);
  };
}
