import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchAPI, TResponseDecks } from '../../components/Decks';

/**
 * Custom Hook to fetch all decks with useQuery hook.
 */
function useQueryGetDecks(): UseQueryResult<void | TResponseDecks, unknown> {
  return useQuery({
    /** Query key for useQuery. */
    queryKey: ['decks'],
    /**
     * Query function to get all decks.
     * @param `/decks` API endpoint to fetch all decks from.
     */
    queryFn: () => fetchAPI<TResponseDecks>(`/decks`),
  });
}

export { useQueryGetDecks };
