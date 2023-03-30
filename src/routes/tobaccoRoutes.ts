import { Router } from 'express';
import { initializeTobaccoModel, getTobaccoModel, deleteTobaccoModel } from '../models/tobaccoModel';
export const tobaccoRouter = Router();

tobaccoRouter.use('/api/initTobaccoData', (req, res): void => {
    initializeTobaccoModel().then(data => {
        res.send(data);
        console.log("reinitializing the tobacco data collection");
    });
});

tobaccoRouter.use('/api/getTobaccoData', (req, res): void => {
    console.log("getting the tobacco data");
    getTobaccoModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

tobaccoRouter.use('/api/deleteTobaccoData', (req, res): void => {
    console.log("deleting the tobacco data");
    deleteTobaccoModel().then(status => {
        res.send(status)
    })
});