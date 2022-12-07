/** Application setup. */
import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { ErrorMiddleware } from '@/middleware/error.middleware';
import { Controller } from '@/utils/interfaces/controller.interface';

type PATH = string;
/**
 * Router path for the application.
 * @default /api
 */
const ROUTER_PATH: PATH = '/api';

/**
 * @class App - The main application class.
 */
class App {
    public express: Application;
    public port: number;

    /**
     * App Starts the application.
     * @param controllers The array of Controler that sets up routes.
     * @param port port to listen to.
     * * Instantiate PostController which sets up the routes,
     *   which then passes it into App constructor `controllers`, then
     * * Pass it in to initializeControllers(), and loop trhough controllers.
     * ```js src/app.ts
     * this.express.use('/api', controller.router())
     * ```
     * * Then set them through your router in PostController public router.
     * ```js @/resources/post/post.controller.ts
     * public router = Router();
     * ```
     * * Routes get handed to the above router through initialiseRoutes(),
     * ```js @/resources/post/post.controller.ts
     *  private initialRoutes(): void {
     *      this.router.post(...
     * ```
     * * Then it gets added to the main Express router and you can access from there.
     */
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeDatabaseConnection();
        this.initializeErrorHandling(); // Always call error middleware at the end in an Express app.
    }

    /**
     * Initialize Express App middleware.
     */
    private initializeMiddleware(): void {
        this.express.use(helmet()); // Prevent common attacks on API calls.
        this.express.use(cors()); // Node.js CORS middleware.
        this.express.use(morgan('dev')); // Concise output colored by response status for development use.
        this.express.use(express.json()); // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
        this.express.use(express.urlencoded({ extended: false })); // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
        this.express.use(compression()); // Compress response bodies for all request that traverse through the middleware.
    }

    /**
     * Intializes controllers with api enpoint prefix of /api.
     * @param controllers Array of Controller of path: `string`, & router:`Router`.
     */
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            /**
             * @example /api/decks/:id
             */
            this.express.use(
                /**
                 * @default /api
                 */
                ROUTER_PATH,
                /**
                 * router controller.
                 * @type {express.Router}
                 */
                controller.router,
            );
        });
    }

    /**
     * Initializes http error handling with express middleware.
     */
    private initializeErrorHandling(): void {
        // Do not call ErrorMiddleware function here.
        this.express.use(ErrorMiddleware);
    }

    /**
     * Initializes MongoDB database connection.
     * * For more context, find examples in .env.example file in root directory.
     * * Mongoose lets you start using your models immediately, without waiting
     *    for mongoose to establish a connection to MongoDB. That's because
     *    mongoose buffers model function calls internally. Mongoose will not
     *    throw any errors by default if you use a model without connecting.
     * @see https://www.mongodb.com/community/forums/t/mongooseerror-operation-users-insertone-buffering-timed-out-after-10000ms/143993/3
     */
    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        const databaseName = 'flashcarte'; //// const _collectionName = 'deck';
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/${databaseName}`;

        if (typeof uri !== 'string' || typeof uri === 'undefined') return;

        /**
         * Connect to MongoDB with mongoose driver.
         * @param uri The mongo database connection string.
         * @param dbName The name of the database you want to use.
         *   If not provided, Mongoose uses the database name from connection string.
         * TODO Set ConnectionState struct and set it to isConnected at connect.
         */
        mongoose
            .connect(uri, { dbName: databaseName })
            .then(() => {
                /** Connect to database fully before listening to API requests. */
                console.log('Connected to database.');
            })
            .catch((err) => {
                console.log('Could not connect to database.', err);
            });
    }

    /**
     * Health Check Path.
     * The server path /healthcheck will always return a 200 OK response.
     * Backend services use it to monitor the app and for zero downtime deploys.
     */
    public healthcheck(): void {
        /**
         * @route healthcheck
         * @method GET
         * @param '/healthcheck' The path to the healthcheck endpoint.
         * @param req Express Request.
         * @param res Express Response.
         */
        this.express.get('/healthcheck', (req: Request, res: Response) => {
            res.status(200).send('200 OK');
        });
    }

    /**
     * Listen for connections.
     * Make sure to call this function before starting the server.
     * Makes it accessible to outside of our App.
     */
    public listen(): void {
        /**
         * A node `http.Server` is returned, with this
         * application (which is a `Function`) as its callback.
         * @param this.port The port to listen to.
         * @param () => void Callback function.
         */
        this.express.listen(this.port, (): void => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export { App };
