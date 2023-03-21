import { Router } from 'express';
import { initializeStates, getStates } from '../models/stateModel';
export const stateRouter = Router();

// stateRouter.use('/api/initStates', (req, res): void => {
//     console.log("A) reinitializing the state collection");
//     initializeStates().then(data => {
//         res.send(data);
//         console.log(data);
//     });
//     console.log("B) reinitializing the state collection");
// });

stateRouter.use('/api/getAllStates', (req, res): void => {
    console.log("getting the state collection");
    getStates().then(data => {
        res.send(data);
        console.log(data);
    });
});

stateRouter.use('/api/initStates', (req, res): void => {
    console.log("A) reinitializing the state collection");
    initializeStates().then(data => {
        res.send(data);
        console.log(data);
    });
    console.log("B) reinitializing the state collection");
});



