import { Router } from 'express';
import { initializePharmaceuticalSpendingModel, getPharmaceuticalSpendingModel, deletePharmaceuticalSpendingModel } from '../../models/HealthSystemModels/percentPharmaceuticalSpendingModel';
export const PharmaSpendingRouter = Router();

PharmaSpendingRouter.use('/api/initPharmaSpending', (req, res): void => {
    initializePharmaceuticalSpendingModel().then(data => {
        res.send(data);
    });
});

PharmaSpendingRouter.use('/api/getPharmaSpending', (req, res): void => {
    getPharmaceuticalSpendingModel().then(data => {
        res.send(data);
    });
});

PharmaSpendingRouter.use('/api/deletePharmaSpending', (req, res): void => {
    deletePharmaceuticalSpendingModel().then(status => {
        res.send(status)
    })
});