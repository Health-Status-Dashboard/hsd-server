import { Router } from 'express';
import { initializeNumberProfessionalsModel, getNumberProfessionalsModel, deleteNumberProfessionalsModel } from '../../models/HealthSystemModels/allMedicalProfessionalsModel';
export const numberProfessionalsRouter = Router();

numberProfessionalsRouter.use('/api/initNumProfessionals', (req, res): void => {
    initializeNumberProfessionalsModel().then(data => {
        res.send(data);
    });
});

numberProfessionalsRouter.use('/api/getNumProfessionals', (req, res): void => {
    getNumberProfessionalsModel().then(data => {
        res.send(data);
    });
});

numberProfessionalsRouter.use('/api/deleteNumProfessionals', (req, res): void => {
    deleteNumberProfessionalsModel().then(status => {
        res.send(status)
    })
});