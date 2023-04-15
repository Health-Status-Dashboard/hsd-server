import { Router } from 'express';
import { getNumberDoctorsModel, initializeNumberDoctorsModel, deleteNumberDoctorsModel } from '../../models/HealthSystemModels/numberDoctorsModel';
export const numberDoctorsRouter = Router();

numberDoctorsRouter.use('/api/initNumDoctors', (req, res): void => {
    initializeNumberDoctorsModel().then(data => {
        res.send(data);
    });
});

numberDoctorsRouter.use('/api/getNumDoctors', (req, res): void => {
    getNumberDoctorsModel().then(data => {
        res.send(data);
    });
});

numberDoctorsRouter.use('/api/deleteNumDoctors', (req, res): void => {
    deleteNumberDoctorsModel().then(status => {
        res.send(status)
    })
});