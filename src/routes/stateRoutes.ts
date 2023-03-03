import { Router } from 'express';
import { initializeStates, getStates } from '../models/stateModel';
export const stateRouter = Router();

stateRouter.use('/initStates', (req, res): void => {
    console.log("reinitializing the state collection");
    initializeStates().then(data => {
        res.send(data);
    });
});

stateRouter.use('/getStates', (req, res): void => {
    console.log("getting the state collection");
    getStates().then(data => {
        res.send(data);
    });
});



