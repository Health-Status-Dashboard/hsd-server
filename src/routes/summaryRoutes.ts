import { Router } from 'express';
import { initializeUSSummary, getUSSummary } from '../models/summaryModel';
export const summaryRouter = Router();

summaryRouter.use('/api/initUSSUmmary', (req, res): void => {

    initializeUSSummary().then(data => {
        res.send(data);
        console.log("reinitializing the US summary");
    });
});

summaryRouter.use('/api/getUSSummary', (req, res): void => {
    console.log("getting the US summary");
    getUSSummary().then(data => {
        res.send(data);
        console.log(data);
    });
});





