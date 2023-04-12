import { Router } from 'express';
import { deleteRecent3YearDCModel, getRecent3YearDCModel, initializeRecent3YearDCModel } from '../../models/RegionsPageModels/recent3YearQuarterlyCausesDeathModel';
export const recent3YearDCRouter = Router();


recent3YearDCRouter.use('/api/initRecent3YearDCModel', (req, res): void => {
    initializeRecent3YearDCModel().then(data => {
        res.send(data);
        console.log("reinitializing the recent 12 month death causes collection");
    });
});

recent3YearDCRouter.use('/api/getRecent3YearDCModel', (req, res): void => {
    console.log("getting the recent 12 month death causes data");
    getRecent3YearDCModel().then(data => {
        res.send(data);
    });
});

recent3YearDCRouter.use('/api/deleteRecent3YearDCModel', (req, res): void => {
    console.log("deleting the recent 12 month death causes data");
    deleteRecent3YearDCModel().then(status => {
        res.send(status)
    })
});
