/**
 * Services: Business Logic.
 * Advantage: Any models we use, we import in servince and not the controller.
 * So controller remains clutter free.
 */

import DeckDocument from '@/resources/deck/deck.interface';
import DeckModel from '@/resources/deck/deck.model';

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
    public async findOne(
        title: string,
        _id: string,
    ): Promise<
        (DeckDocument & { _id: import('mongoose').Types.ObjectId }) | undefined
    > {
        try {
            /** Finds a single document by its _id field. */
            const deck = await this.deck.findOne({ title, _id });
            if (!deck) return;
            return deck;
        } catch (err: unknown) {
            throw new Error(`Unable to find deck: ${err}`);
        }
    }
}

export { DeckService };
