import { NextFunction, Request, Response, Router } from 'express';

import { validationMiddleware } from '@/middleware/validation.middleware';
import { DeckService } from '@/resources/deck/deck.service';
import { validate } from '@/resources/deck/deck.validation';
import { HttpException } from '@/utils/exceptions/http.exception';
import { Controller } from '@/utils/interfaces/controller.interface';
import { threadId } from 'worker_threads';

class DeckController implements Controller {
    public path = '/decks';
    public router = Router(); // Subrouters.

    private DeckService = new DeckService();

    /**
     * DeckController class.
     * Initalised in App(controllers, port) int entrypoint index.ts.
     * ```js
     * const app = new App([new DeckController()], port)
     * ```
     * @implements Controller
     */
    constructor() {
        this.initializeRoutes(); // Initializing calls the constructor.
    }

    /**
     * Initializes the routes for the DeckController.
     * To create resources use path that follows REST API paradigm.
     * * For Example, to create a deck use path: `/decks`.
     * @route '/api/decks'.
     * * /api gets conctenated before path.
     * In class new App().initializeRoutes private method,
     * @example ```js src/app.ts
     * this.express.use('/api', controller.router);
     * ```
     * @see https://youtu.be/1o9YOHeKhNQ?t=4452
     */
    private initializeRoutes(): void {
        /**
         * @param `${this.path}` The path to the resource. '/decks'.
         * @param validationMiddleware(validate.create) Validate request body against schema.
         * @param this.create Create a new resource with request handler.
         */
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create,
        );
    }

    /**
     * create private method.
     * @method POST - Create a resource with POST request.
     * * req - Request object.
     * * res - Response object.
     * * next - Next function.
     */
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { title } = req.body;
            console.log(title);
            /**
             * When using a service, creating deck somwehere else, nice to have it
             * inside a ServiceWorker, and not a request handler.  For emails, send
             * it as a part of a queue.  Do not send request to your own api.
             * @param title
             */
            const deck = await this.DeckService.create(title);

            res.status(201).json({
                deck: deck,
            });
        } catch (err) {
            next(new HttpException(400, `Cannot create deck: ${err}`));
        }
    };

    // TODO
    /** @method PATCH */
    private update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        console.log(
            `${this.path}/${req.params.id}`,
            req.body,
            req.params,
            req.query,
        );
    };
}

export { DeckController };
