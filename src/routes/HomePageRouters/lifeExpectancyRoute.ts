import { Router } from 'express';
import { initializeLifeExpectancy, getLifeExpectancy, deleteLifeExpectancy } from '../../models/HomePageModels/lifeExpectancyModel';
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
        //console.log(data);
    });
});

lifeExpectancyRouter.use('/api/deleteLifeExpectancy', (req, res): void => {
    console.log("deleting the life expectancy data");
    deleteLifeExpectancy().then(status => {
        res.send(status)
    })
});