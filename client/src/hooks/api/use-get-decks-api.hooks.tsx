import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { TResponseDecks } from '../../components/Deck';
import { getDecksAPI } from '../../helpers/api/get-decks-api.helpers';

/**
 * Custom Hook to fetch all decks with useQuery hook.
 */
function useGetDecks(): UseQueryResult<void | TResponseDecks, unknown> {
  return useQuery({
    /** Query key for useQuery. */
    queryKey: ['decks'],
    /**
     * Query function to get all decks.
     * @param `/decks` API endpoint to fetch all decks from.
     */
    queryFn: () => getDecksAPI<TResponseDecks>(`/decks`),
  });
}

export { useGetDecks };
