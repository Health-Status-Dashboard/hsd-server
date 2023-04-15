import { Router } from 'express';
import { initializeUninsuredBySubgroupModel, getUninsuredBySubgroupModel, deleteUninsuredBySubgroupModel } from '../../models/HomePageModels/uninsuredBySubgroupModel';
export const uninsuredBySubgroupRouter = Router();

uninsuredBySubgroupRouter.use('/api/initUninsuredBySubgroup', (req, res): void => {
    initializeUninsuredBySubgroupModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

uninsuredBySubgroupRouter.use('/api/getUninsuredBySubgroup', (req, res): void => {
    console.log("getting the uninsured by subgroup data");
    getUninsuredBySubgroupModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

uninsuredBySubgroupRouter.use('/api/deleteUninsuredBySubgroup', (req, res): void => {
    console.log("deleting the uninsured by subgroup data");
    deleteUninsuredBySubgroupModel().then(status => {
        res.send(status)
    })
});