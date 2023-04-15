import { Router } from 'express';
import { initializeRecentYearDCModel, getRecentYearDCModel, deleteRecentYearDCModel, getRecentYearDCModelAllCauses, getRecentYearDCModelAlzheimer, getRecentYearDCModelCovid19, getRecentYearDCModelCancer, getRecentYearDCModelLiver, getRecentYearDCModelRespiratory, getRecentYearDCModelDiabetes, getRecentYearDCModelHeart, getRecentYearDCModelHIV, getRecentYearDCModelHypertension, getRecentYearDCModelPneumonionitis, getRecentYearDCModelFluPneum, getRecentYearDCModelKidney, getRecentYearDCModelParkinsons, getRecentYearDCModelSepticimia, getRecentYearDCModelStroke } from '../../models/RegionsPageModels/recent12MonthCausesDeathModel';
export const recentYearDCRouter = Router();


recentYearDCRouter.use('/api/initRecentYearDCModel', (req, res): void => {
    initializeRecentYearDCModel().then(data => {
        res.send(data);
        console.log(data);
    });
});

recentYearDCRouter.use('/api/getRecentYearDCModel', (req, res): void => {
    getRecentYearDCModel().then(data => {
        res.send(data);
        //console.log(data);
    });
});

recentYearDCRouter.use('/api/deleteRecentYearDCModel', (req, res): void => {
    deleteRecentYearDCModel().then(status => {
        res.send(status)
    })
});


//specific models returned for front end
recentYearDCRouter.use('/api/getRecentYearDCModelAllCauses', (req, res): void => {
    getRecentYearDCModelAllCauses().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelAlzheimer', (req, res): void => {
    getRecentYearDCModelAlzheimer().then(data => {
        res.send(data);
    });
});

recentYearDCRouter.use('/api/getRecentYearDCModelCovid19', (req, res): void => {
    getRecentYearDCModelCovid19().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelCancer', (req, res): void => {
    getRecentYearDCModelCancer().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelLiver', (req, res): void => {
    getRecentYearDCModelLiver().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelRespiratory', (req, res): void => {
    getRecentYearDCModelRespiratory().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelDiabetes', (req, res): void => {
    getRecentYearDCModelDiabetes().then(data => {
        res.send(data);
    });
});

recentYearDCRouter.use('/api/getRecentYearDCModelHeart', (req, res): void => {
    getRecentYearDCModelHeart().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelHIV', (req, res): void => {
    getRecentYearDCModelHIV().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelHypertension', (req, res): void => {
    getRecentYearDCModelHypertension().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelFluPneu', (req, res): void => {
    getRecentYearDCModelFluPneum().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelKidney', (req, res): void => {
    getRecentYearDCModelKidney().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelParkinsons', (req, res): void => {
    getRecentYearDCModelParkinsons().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelPneumonionitis', (req, res): void => {
    getRecentYearDCModelPneumonionitis().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelSepticimia', (req, res): void => {
    getRecentYearDCModelSepticimia().then(data => {
        res.send(data);
    });
});
recentYearDCRouter.use('/api/getRecentYearDCModelStroke', (req, res): void => {
    getRecentYearDCModelStroke().then(data => {
        res.send(data);
    });
});
