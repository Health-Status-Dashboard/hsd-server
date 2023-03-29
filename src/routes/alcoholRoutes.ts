import { Router } from 'express';
import {initializeAlcoholModel, getAlcoholModel, deleteAlcoholModel} from '../models/alcoholModel';
export const alcoholRouter = Router();

alcoholRouter.use('/api/initAlcoholData', (req, res): void => {
    initializeAlcoholModel().then(data => {
        res.send(data);
        console.log("reinitializing the alcohol data collection");
    });
});

alcoholRouter.use('/api/getAlcoholData', (req, res): void => {
    console.log("getting the alcohol data");
    getAlcoholModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

alcoholRouter.use('/api/deleteAlcoholData', (req, res): void => {
    console.log("deleting the alcohol data");
    deleteAlcoholModel().then(status => {
        res.send(status)
    })
});