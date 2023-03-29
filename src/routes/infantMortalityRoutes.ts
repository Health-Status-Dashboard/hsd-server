import { Router } from 'express';
import { initializeInfantMortality, getInfantMortality, deleteInfantMortality } from '../models/infantMortalityModel';
export const infantMortalityRouter = Router();

infantMortalityRouter.use('/api/initInfantMortality', (req, res): void => {
    initializeInfantMortality().then(data => {
        res.send(data);
        console.log("reinitializing the infant mortality collection");
    });
});

infantMortalityRouter.use('/api/getInfantMortality', (req, res): void => {
    console.log("getting the infant mortality data");
    getInfantMortality().then(data => {
        res.send(data);
        console.log(data);
    });
});

infantMortalityRouter.use('/api/deleteInfantMortality', (req, res): void => {
    console.log("deleting the infant mortality data");
    deleteInfantMortality().then(status => {
        res.send(status)
    })
});