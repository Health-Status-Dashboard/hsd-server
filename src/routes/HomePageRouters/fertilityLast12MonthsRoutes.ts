import { Router } from 'express';
import { initializeBirthLast12MonthModel, getBirthLast12MonthModel, deleteBirthLast12MonthModel } from '../../models/HomePageModels/fertilityLast12MonthsModel';
export const Last12MonthBirthRateRouter = Router();

Last12MonthBirthRateRouter.use('/api/initLast12MonthBirthData', (req, res): void => {
    initializeBirthLast12MonthModel().then(data => {
        res.send(data);
    });
});

Last12MonthBirthRateRouter.use('/api/getLast12MonthBirthData', (req, res): void => {
    getBirthLast12MonthModel().then(data => {
        res.send(data);
    });
});

Last12MonthBirthRateRouter.use('/api/deleteLast12MonthBirthData', (req, res): void => {
    deleteBirthLast12MonthModel().then(status => {
        res.send(status)
    })
});