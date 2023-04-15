import { Router } from 'express';
import { initializegdpSpendingModel, getgdpSpendingModel, deletegdpSpendingModel } from '../../models/HealthSystemModels/GDPHealthSpendingModel';
export const gdpSpendingRouter = Router();

gdpSpendingRouter.use('/api/initGDPSpending', (req, res): void => {
    initializegdpSpendingModel().then(data => {
        res.send(data);
    });
});

gdpSpendingRouter.use('/api/getGDPSpending', (req, res): void => {
    getgdpSpendingModel().then(data => {
        res.send(data);
    });
});

gdpSpendingRouter.use('/api/deleteGDPSpending', (req, res): void => {
    deletegdpSpendingModel().then(status => {
        res.send(status)
    })
});