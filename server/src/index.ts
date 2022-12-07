// index.ts. - Entrypoint for application.
// Project: https://github.com/lloydlobo/flashcarte

import { config } from 'dotenv'; // Initialize env variables with dotenv asap.
import register from 'module-alias'; // Register all module alliases throughout project.

config(); // Loads `.env` file contents into process.env.
register(); // Import aliases from package.json.

import { DeckController } from '@/resources/deck/deck.controller';
import { Controller } from '@/utils/interfaces/controller.interface';
import { App } from './app';

export interface ParamsDictionary { [key: string]: string; } // prettier-ignore
export type ParamsArray = string[];

/**
 * Port to listen for.
 * @param process.env.PORT
 */
const port = Number(process.env.PORT);
/**
 * controllers is array of controllers.
 */
const controllers: Controller[] = [new DeckController()];

/**
 * A new App instance.
 * @param controllers is array of controllers.
 * @param port The port to listen for.
 */
const app = new App(controllers, port);

/**
 * @method GET
 * @route '/'
 * @desc Default route.
 * @access Public.
 */
app.express.get<ParamsArray>('/', (_req, res) => { res.status(200).send('Welcome to flashcarte!'); }); // prettier-ignore

/**
 * Health Check Path. The server path /healthcheck will always return a 200 OK
 * response. Backend services use it to monitor the app and for zero downtime deploys.
 */
app.healthcheck();

/**
 * Listen for connections. Make sure to call this function before starting the
 * server. Makes it accessible to outside of our App.
 */
app.listen();

/**
 * Default backend API Endpoints.
 * Method extends 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'.
 * @example
 *     app.get('/user/:id', (req, res) => res.send(req.params.id)); // implicitly `ParamsDictionary`
 *     app.get<ParamsArray>(/user\/(.*)/, (req, res) => res.send(req.params[0]));
 *     app.get<ParamsArray>('/user/*', (req, res) => res.send(req.params[0]));
 */
