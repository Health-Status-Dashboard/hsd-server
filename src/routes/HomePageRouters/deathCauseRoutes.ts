import { Router } from 'express';
import { initializeDCModel, getDCModel, deleteDCModel } from '../../models/HomePageModels/deathCauseModel';
export const DCRouter = Router();

DCRouter.use('/api/initDCdata', (req, res): void => {
    initializeDCModel().then(data => {
        res.send(data);
        console.log("reinitializing the DC data collection");
    });
});

DCRouter.use('/api/getDCdata', (req, res): void => {
    console.log("getting the DC data");
    getDCModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

DCRouter.use('/api/deleteDCdata', (req, res): void => {
    console.log("deleting the DC data");
    deleteDCModel().then(status => {
        res.send(status)
    })
});