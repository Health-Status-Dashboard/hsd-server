import { Router } from 'express';
import { initializeLifeExpectancy, getLifeExpectancy } from '../models/lifeExpectancyModel';
export const lifeExpectancyRouter = Router();

lifeExpectancyRouter.use('/api/initLifeExpectancy', (req, res): void => {
    initializeLifeExpectancy().then(data => {
        res.send(data);
        console.log("reinitializing the life expectancy collection");
    });
});

lifeExpectancyRouter.use('/api/getLifeExpectancy', (req, res): void => {
    console.log("getting the life expectancy");
    getLifeExpectancy().then(data => {
        res.send(data);
        console.log(data);
    });
});