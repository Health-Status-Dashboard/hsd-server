import { Router } from 'express';
import { initializePhysicalHealthWeightModel, getPhysicalHealthWeightModel, deletePhysicalHealthWeightModel } from '../../models/HomePageModels/physicalHealthSummaryModel';
export const physicalHealthWeightRouter = Router();

physicalHealthWeightRouter.use('/api/initWeight', (req, res): void => {
    initializePhysicalHealthWeightModel().then(data => {
        res.send(data);
        console.log("reinitializing the weight data collection");
    });
});

physicalHealthWeightRouter.use('/api/getWeight', (req, res): void => {
    console.log("getting the weight data");
    getPhysicalHealthWeightModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

physicalHealthWeightRouter.use('/api/deleteWeight', (req, res): void => {
    console.log("deleting the weight data");
    deletePhysicalHealthWeightModel().then(status => {
        res.send(status)
    })
});