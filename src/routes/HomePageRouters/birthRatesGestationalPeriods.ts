import { Router } from 'express';
import { initializeGestationalPeriodsModel, getGestationalPeriodsModel, deleteGestationalPeriodsModel } from '../../models/HomePageModels/birthRatesGestationalPeriodsModel';
export const BirthRateGestationalRouter = Router();

BirthRateGestationalRouter.use('/api/initGestBirthRates', (req, res): void => {
    initializeGestationalPeriodsModel().then(data => {
        res.send(data);
    });
});

BirthRateGestationalRouter.use('/api/getGestBirthRates', (req, res): void => {
    getGestationalPeriodsModel().then(data => {
        res.send(data);
    });
});

BirthRateGestationalRouter.use('/api/deleteGestBirthRates', (req, res): void => {
    deleteGestationalPeriodsModel().then(status => {
        res.send(status)
    })
});