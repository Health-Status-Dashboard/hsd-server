import express, { Application, Request, Response } from 'express';
import DBConnection from './DBConnection';
import cors from 'cors';
import { stateRouter } from './routes/stateRoutes';
import { lifeExpectancyRouter } from './routes/HomePageRouters/lifeExpectancyRoute';
import { getStates, initializeStates } from './models/stateModel';
import { infantMortalityRouter } from './routes/HomePageRouters/infantMortalityRoutes';
import { alcoholTobaccoRouter } from './routes/HomePageRouters/alcoholTobaccoRoutes';
import { NAWRouter } from './routes/HomePageRouters/nutritionActivityWeightRoutes';
import { DCRouter } from './routes/HomePageRouters/deathCauseRoutes';
import { generalUSPopRouter } from './routes/HomePageRouters/summaryRoutes';
import { cdSummaryRouter } from './routes/HomePageRouters/causeOfDeathSummaryRoutes';
import { physicalHealthWeightRouter } from './routes/HomePageRouters/physicalHealthSummaryRoutes';
import { uninsuredUSPopRouter } from './routes/HomePageRouters/uninsuredSummaryRoutes';
import { uninsuredByEducationRouter } from './routes/HomePageRouters/uninsuredByEducationRoutes';
import { uninsuredByAgeRouter } from './routes/HomePageRouters/uninsuredByAgeEducationRoutes';
import { uninsuredBySubgroupRouter } from './routes/HomePageRouters/uninsuredBySubgroupRoutes';
import { recentYearDCRouter } from './routes/RegionsPageRouters/recent12MonthCausesDeathRoutes';
import { recent3YearDCRouter } from './routes/RegionsPageRouters/recent3YearQuarterlyCauseDeathRoutes';
//import * as mongoose from 'mongoose'

export const routes = express.Router();
routes.use(stateRouter);
routes.use(lifeExpectancyRouter);
routes.use(infantMortalityRouter);
routes.use(alcoholTobaccoRouter);
routes.use(NAWRouter);
routes.use(DCRouter);
routes.use(generalUSPopRouter);
routes.use(cdSummaryRouter);
routes.use(physicalHealthWeightRouter);
routes.use(uninsuredUSPopRouter);
routes.use(uninsuredByEducationRouter);
routes.use(uninsuredByAgeRouter);
routes.use(uninsuredBySubgroupRouter);
routes.use(recentYearDCRouter);
routes.use(recent3YearDCRouter);

const app: Application = express();
//app.use(cors());

app.use('/', routes);

const PORT: number = 3001;


const mongoDB = DBConnection.getConn();
mongoDB.connect();

/**
 * This sets up the `/init` endpoint to accept requests. On request, it will reinitialize the database.
 */
app.use('/api/init', (req: Request, res: Response): void => {
  console.log("Reinitializing DB");
  const mongoDB = DBConnection.getConn();
  mongoDB.initializeCollections().then((result) => {
    //console.log(result);
    res.send("Reinitialized Database");
  });
});


app.use('/api/getCollection', (req: Request, res: Response): void => {
  console.log("About to get data");
  const mongoDB = DBConnection.getConn();
  mongoDB.getCollectionData().then(data => {
    res.send(data);
    //console.log(data)
  });
});

app.use('/api/close', (req: Request, res: Response): void => {
  const mongoDB = DBConnection.getConn();
  mongoDB.closeDb();
  res.send("Connection closed.");
});





app.use('/', (req: Request, res: Response): void => {
  res.send("Server is running.");
});

app.listen(PORT, (): void => {
  console.log('SERVER IS RUNNING ON PORT:', PORT);
});

export default app;