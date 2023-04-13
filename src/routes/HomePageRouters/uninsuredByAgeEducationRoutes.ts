import { Router } from 'express';
import { initializeUninsuredByAgeModel, getUninsuredByAgeModel, deleteUninsuredByAgeModel } from '../../models/HomePageModels/uninsuredByAgeModel';
export const uninsuredByAgeRouter = Router();

uninsuredByAgeRouter.use('/api/initUninsuredByAge', (req, res): void => {
    initializeUninsuredByAgeModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

uninsuredByAgeRouter.use('/api/getUninsuredByAge', (req, res): void => {
    console.log("getting the uninsured US population by age data");
    getUninsuredByAgeModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

uninsuredByAgeRouter.use('/api/deleteUninsuredByAge', (req, res): void => {
    console.log("deleting the uninsured US population by age data");
    deleteUninsuredByAgeModel().then(status => {
        res.send(status)
    })
});