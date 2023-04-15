import { Router } from 'express';
import { initializeUninsuredUSPopModel, getUninsuredUSPopModel, deleteUninsuredUSPopModel } from '../../models/HomePageModels/uninsuredSummaryModel';
export const uninsuredUSPopRouter = Router();

uninsuredUSPopRouter.use('/api/initUninsuredUSPop', (req, res): void => {
    initializeUninsuredUSPopModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

uninsuredUSPopRouter.use('/api/getUninsuredUSPop', (req, res): void => {
    console.log("getting the uninsured US population data");
    getUninsuredUSPopModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

uninsuredUSPopRouter.use('/api/deleteUninsuredUSPop', (req, res): void => {
    console.log("deleting the uninsured US population data");
    deleteUninsuredUSPopModel().then(status => {
        res.send(status)
    })
});