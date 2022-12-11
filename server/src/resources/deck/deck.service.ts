/**
 * Services: Business Logic.
 * Advantage: Any models we use, we import in servince and not the controller.
 * So controller remains clutter free.
 */

import DeckDocument from '@/resources/deck/deck.interface';
import DeckModel, { ObjectId } from '@/resources/deck/deck.model';

/**
 * DeckService class.
 * Initialize this inside DeckController at `@/resources/post/post.controller.ts`
 * @class DeckService
 * @property deck {DeckModel} - The deck model.
 */
class DeckService {
    private deck = DeckModel;

    /**
     * Service method create.
     * @param title The title of the deck.
     */
    public async create(title: string): Promise<DeckDocument> {
        try {
            /** Creates a new document or documents. */
            const deck = await this.deck.create({ title });

            return deck;
        } catch (err: unknown) {
            throw new Error(`Unable to create deck: ${err}`);
        }
    }

    /**
     * Finds deck documents in collection.
     * @param  query The query object.
     * @returns `Promise<(DeckDocument & { _id: import('mongoose').Types.ObjectId })[] | null>`
     */
    public async findMany(): Promise<DeckDocument[] | null> {
        try {
            /** Creates a `find` query: gets a list of documents that match `filter`. */
            const decks = this.deck.find({});

            return decks;
        } catch (err: unknown) {
            throw new Error(`Unable to find decks: ${err}`);
        }
    }

    /**
     * Description
     * @param _id
     */
    public async findById(_id: typeof ObjectId): Promise<DeckDocument | null> {
        try {
            /** Finds a single document by its _id field. */
            const deck = this.deck.findById(_id);

            return deck;
        } catch (err: unknown) {
            throw new Error(`Unable to find deck: ${err}`);
        }
    }

    /**
     * Delete a deck document with id of `_id` in collection.
     * @param  _id The request id of the deck.
     */
    public async deleteOne(_id: typeof ObjectId): Promise<DeckDocument | null> {
        try {
            /** Creates a `findByIdAndDelete` query, filtering by the given `_id`. */
            const deck = this.deck.findByIdAndDelete(_id);

            return deck;
        } catch (err: unknown) {
            throw new Error(`Unable to delete deck: ${err}`);
        }
    }
}

export { DeckService };
