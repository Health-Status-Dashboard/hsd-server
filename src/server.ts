import express, { Application, Request, Response } from 'express';
import DBConnection from './DBConnection';
import cors from 'cors';

const app: Application = express();
app.use(cors());

const PORT: number = 3001;

const mongoDB = DBConnection.getConn();
mongoDB.connect();
//mongoDB.run().catch(err => console.log(err));

/**
 * This sets up the `/init` endpoint to accept requests. On request, it will reinitialize the database.
 */
app.use('/init', (req: Request, res: Response): void => {
  console.log("Reinitializing DB");
  const mongoDB = DBConnection.getConn();
  mongoDB.initializeCollections().then((result) => {
    console.log(result);
    res.send("Reinitialized Database");
  });
});

app.use('/initStates', (req: Request, res: Response): void => {
  console.log("getting the state collection");
  const mongoDB = DBConnection.getConn();
  mongoDB.initializeStates().then(data => {
    res.send(data);
  });
});

app.use('/getStates', (req: Request, res: Response): void => {
  console.log("getting the state collection");
  const mongoDB = DBConnection.getConn();
  mongoDB.getStates().then(data => {
    res.send(data);
  });
});

app.use('/getCollection', (req: Request, res: Response): void => {
  console.log("About to get data");
  const mongoDB = DBConnection.getConn();
  mongoDB.getCollectionData().then(data => {
    res.send(data);
  });
});

app.use('/close', (req: Request, res: Response): void => {
  const mongoDB = DBConnection.getConn();
  mongoDB.closeDb();
  res.send("Connection closed.");
});

app.use('/', (req: Request, res: Response): void => {
  res.send("Server is running.");
});

app.listen(PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', PORT);
});