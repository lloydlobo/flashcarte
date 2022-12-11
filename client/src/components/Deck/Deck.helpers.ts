import { useCallback } from 'react';

import { UseMutationResult } from '@tanstack/react-query';

import { TButtonMouseEvent } from './Deck';
import { TDeck } from './Deck.interface';

type TUseMutationResult = UseMutationResult<any, unknown, string, unknown>;

/**
 * Delete the element.
 *
 * Handle deletion of deck on mouse click mutates data on server side, and
 * updates the client on success.
 *
 * @param e The mouse click event on CloseButton.
 * @param deck._id The id of the deck to delete.
 *
 * Provide a constraint for generic type as follows: <T extends { id?: string }>.
 */
function UseMutateId<
  T extends TButtonMouseEvent,
  U extends TDeck['_id'],
  V extends TUseMutationResult,
>(mutation: V, id: U, e: T): void {
  console.log(e);
  e.preventDefault();
  mutation.mutate(id);
}

/**
 * Hook to handle onClick event to delete deck.
 * @param mutation The useMutation object.
 * @param deck The deck to delete.
 */
function useMutationDelete<
  T extends TButtonMouseEvent,
  U extends TDeck,
  V extends TUseMutationResult,
>(mutation: V, deck: U) {
  /**
   * `useCallback` will return a memoized version of the callback, that only
   * changes if one of the `inputs` has changed.
   */
  const memo = useCallback(
    (e: T) => UseMutateId(mutation, deck._id, e),
    [mutation, deck._id],
  );

  return memo;
}

export { useMutationDelete, UseMutateId };
