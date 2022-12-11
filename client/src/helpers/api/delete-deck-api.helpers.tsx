import { TDeck } from '../../components/Deck';

/**
 * Mutation async fetch function to delete a deck.
 * @param id The id of the deck to delete.
 * @method DELETE by FindOneById Method.
 * @route /api/decks/
 * @endpoint /delete/:id
 * @example https://localhost:8080/api/decks/delete/:id
 * @see https://github.com/lloydlobo/todo/blob/v2/express/routes/routes.js
 */
export async function deleteDeckAPI(id: TDeck['_id']): Promise<any> {
  const response: Response = await fetch(
    `http://localhost:8080/api/decks/delete/${id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    },
  );
  return await response.json();
}
