import DeckDocument from '@/resources/deck/deck.interface';
import { model, Schema } from 'mongoose';

//// const ObjectId = mongoose.Types.ObjectId;
const DeckSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

/**
 * @see https://mongoosejs.com/docs/guide.html#models
 */
const DeckModel = model<DeckDocument>('Deck', DeckSchema);

export default DeckModel; // Deck.

//// const doc = new DeckModel();
//// const isMongooseObjectId = doc._id instanceof mongoose.Types.ObjectId;
//// // true
