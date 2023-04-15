import { Router } from 'express';
import { initializeUninsuredByEducationModel, getUninsuredByEducationModel, deleteUninsuredByEducationModel } from '../../models/HomePageModels/uninsuredByEducationModel';
export const uninsuredByEducationRouter = Router();

uninsuredByEducationRouter.use('/api/initUninsuredByEducation', (req, res): void => {
    initializeUninsuredByEducationModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

uninsuredByEducationRouter.use('/api/getUninsuredByEducation', (req, res): void => {
    console.log("getting the uninsured US population by education data");
    getUninsuredByEducationModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

uninsuredByEducationRouter.use('/api/deleteUninsuredByEducation', (req, res): void => {
    console.log("deleting the uninsured US population by education data");
    deleteUninsuredByEducationModel().then(status => {
        res.send(status)
    })
});