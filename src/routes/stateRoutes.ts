import { Router } from 'express';
import { initializeStates, getStates } from '../models/stateModel';
export const stateRouter = Router();

stateRouter.use('/api/initAllStates', (req, res): void => {

    initializeStates().then(data => {
        res.send(data);
        console.log("reinitializing the state collection");
    });
});

stateRouter.use('/api/getAllStates', (req, res): void => {
    console.log("getting the state collection");
    getStates().then(data => {
        res.send(data);
        console.log(data);
    });
});





