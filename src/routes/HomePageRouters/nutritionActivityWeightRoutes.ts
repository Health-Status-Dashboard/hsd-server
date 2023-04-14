import { Router } from 'express';
import { initializeNAWModel, getNAWModel, deleteNAWModel } from '../../models/HomePageModels/nutritionActivityWeightModel';
export const NAWRouter = Router();

NAWRouter.use('/api/initNAWData', (req, res): void => {
    initializeNAWModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

NAWRouter.use('/api/getNAWData', (req, res): void => {
    console.log("getting the nutrition, activity, weight data");
    getNAWModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

NAWRouter.use('/api/deleteNAWData', (req, res): void => {
    console.log("deleting the nutrition, activity, weight data");
    deleteNAWModel().then(status => {
        res.send(status)
    })
});