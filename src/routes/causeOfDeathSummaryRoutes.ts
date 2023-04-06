import { Router } from 'express';
import { initializeCDSummaryModel, getCDSummaryModel, deleteCDSummaryModel } from '../models/causeOfDeathSummaryModel';
export const cdSummaryRouter = Router();

cdSummaryRouter.use('/api/initCDSummary', (req, res): void => {
    initializeCDSummaryModel().then(data => {
        res.send(data);
        console.log("reinitializing the cd summary data collection");
    });
});

cdSummaryRouter.use('/api/getCDSummary', (req, res): void => {
    console.log("getting the cd summary data");
    getCDSummaryModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

cdSummaryRouter.use('/api/deleteCDSummary', (req, res): void => {
    console.log("deleting the cd summary data");
    deleteCDSummaryModel().then(status => {
        res.send(status)
    })
});