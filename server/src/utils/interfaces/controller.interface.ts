import { Router } from 'express';

interface Controller {
    readonly path: string;
    router: Router;
}

export { Controller };
