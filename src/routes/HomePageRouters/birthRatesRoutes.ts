import { Router } from 'express';
import { initializeBirthRateModel, getBirthRateModel, deleteBirthRateModel } from '../../models/HomePageModels/birthRatesModel';
export const BirthRateRouter = Router();

BirthRateRouter.use('/api/initBirthRateData', (req, res): void => {
    initializeBirthRateModel().then(data => {
        res.send(data);
    });
});

BirthRateRouter.use('/api/getBirthRateData', (req, res): void => {
    getBirthRateModel().then(data => {
        res.send(data);
    });
});

BirthRateRouter.use('/api/deleteBirthRateData', (req, res): void => {
    deleteBirthRateModel().then(status => {
        res.send(status)
    })
});