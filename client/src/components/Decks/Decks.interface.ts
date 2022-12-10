export type TResponseDecks = {
  decks: IDeck[];
};

export interface IDeck {
  _id: string;
  title: string;
}
