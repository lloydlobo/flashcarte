import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi, { BaseValidationOptions } from 'joi';

/**
 * Validates a value using the schema and options.
 * @param schema The Joi schema.
 */
function validationMiddleware(schema: Joi.Schema): RequestHandler {
    {
        return async (
            req: Request,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            /**
             * * try to validate with Joi validateAsync.
             *
             * * catch all exceptions.
             * @param e Array of errors which implement `details`.
             */
            try {
                /**
                 * Value is data passed through when compared with schema,
                 * and stripped of unwanted values.
                 * @param req.body Request body data.
                 * @param validateOptions Joi validation options object.
                 */
                const value = await schema.validateAsync(
                    req.body,
                    validateOptions,
                );

                req.body = value;

                /**
                 * "Break-out" of a router OR route by calling {next('router')} OR {next('route')}.
                 */
                next();
            } catch (e: unknown) {
                const errors: string[] = [];

                /* Store error details in errors array. */
                storeErrorsDetails(e, errors);

                /**
                 * Send and display errors through, API request or frontend like React.
                 */
                res.status(400).send({
                    errors: errors,
                });
            }
        };
    }
}

/**
 * Store error details in errors array.
 *
 * @param e The errors from catch.
 * @param errors The array to collect errors.
 */
function storeErrorsDetails(e: unknown, errors: string[]) {
    (e as any).details.forEach((error: Joi.ValidationError) => {
        errors.push(error.message);
    });
}

/**
 * validateOptions is a Joi validation options object.
 */
const validateOptions: BaseValidationOptions = {
    /**
     * when true, stops validation on the first error, otherwise returns all the errors found.
     *
     * @default true
     */
    abortEarly: false,
    /**
     * when true, allows object to contain unknown keys which are ignored.
     *
     * @default false
     */
    allowUnknown: true,
    /**
     * remove unknown elements from objects and arrays.
     * - when true, all unknown elements will be removed
     * - when an object:
     *      - objects - set to true to remove unknown keys from objects
     *
     * @default false
     */
    stripUnknown: true,
};

export { validationMiddleware };
