import { Router } from 'express';
import { initializeMaternalDeathRateModel, getMaternalDeathRateModel, deleteMaternalDeathRateModel } from '../../models/HomePageModels/maternalDeathRatesModel';
export const maternalDeathRateRouter = Router();

maternalDeathRateRouter.use('/api/initMaternalDeathRates', (req, res): void => {
    initializeMaternalDeathRateModel().then(data => {
        res.send(data);
    });
});

maternalDeathRateRouter.use('/api/getMaternalDeathRates', (req, res): void => {
    getMaternalDeathRateModel().then(data => {
        res.send(data);
    });
});

maternalDeathRateRouter.use('/api/deleteMaternalDeathRates', (req, res): void => {
    deleteMaternalDeathRateModel().then(status => {
        res.send(status)
    })
});