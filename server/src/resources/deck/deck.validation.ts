import DeckDocument from '@/resources/deck/deck.interface';
import Joi from 'joi';

const create = Joi.object<DeckDocument>({
    title: Joi.string().required(),
});

// TODO
// ? Mock implementation to demonstrate multiple exports.
const update = Joi.object({
    title: Joi.string().required(),
    // description: Joi.string().required(),
});

const deleteOne = Joi.object({
    _id: Joi.string().required(),
});

/**
 * Contains all validation needed to perform actions on Deck results.
 */
const validate = { create, update, deleteOne };

export { validate };
