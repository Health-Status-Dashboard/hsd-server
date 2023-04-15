import { Router } from 'express';
import { initializeNumberGraduatesModel, getNumberGraduatesModel, deleteNumberGraduatesModel } from '../../models/HealthSystemModels/numMedGraduates';
export const numberGraduatesRouter = Router();

numberGraduatesRouter.use('/api/initNumGrads', (req, res): void => {
    initializeNumberGraduatesModel().then(data => {
        res.send(data);
    });
});

numberGraduatesRouter.use('/api/getNumGrads', (req, res): void => {
    getNumberGraduatesModel().then(data => {
        res.send(data);
    });
});

numberGraduatesRouter.use('/api/deleteNumGrads', (req, res): void => {
    deleteNumberGraduatesModel().then(status => {
        res.send(status)
    })
});