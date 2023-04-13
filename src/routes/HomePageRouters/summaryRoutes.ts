import { Router } from 'express';
import { initializeGeneralUSPopModel, getGeneralUSPopModel, deleteGeneralUSPopModel } from '../../models/HomePageModels/summaryModel';
export const generalUSPopRouter = Router();

generalUSPopRouter.use('/api/initUSPop', (req, res): void => {
    initializeGeneralUSPopModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

generalUSPopRouter.use('/api/getUSPop', (req, res): void => {
    console.log("getting the general US population data");
    getGeneralUSPopModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

generalUSPopRouter.use('/api/deleteUSPop', (req, res): void => {
    console.log("deleting the general US population data");
    deleteGeneralUSPopModel().then(status => {
        res.send(status)
    })
});