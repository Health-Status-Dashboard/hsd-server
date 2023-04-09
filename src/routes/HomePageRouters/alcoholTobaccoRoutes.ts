import { Router } from 'express';
import {initializeAlcoholTobaccoModel, getAlcoholTobaccoModel, deleteAlcoholTobaccoModel} from '../../models/HomePageModels/alcoholTobaccoModel';
export const alcoholTobaccoRouter = Router();

alcoholTobaccoRouter.use('/api/initAlcoholTobaccoData', (req, res): void => {
    initializeAlcoholTobaccoModel().then(data => {
        res.send(data);
        console.log("reinitializing the alcohol/tobacco data collection");
    });
});

alcoholTobaccoRouter.use('/api/getAlcoholTobaccoData', (req, res): void => {
    console.log("getting the alcohol/tobacco data");
    getAlcoholTobaccoModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

alcoholTobaccoRouter.use('/api/deleteAlcoholTobaccoData', (req, res): void => {
    console.log("deleting the alcohol/tobacco data");
    deleteAlcoholTobaccoModel().then(status => {
        res.send(status)
    })
});