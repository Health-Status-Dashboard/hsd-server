import express, { Application, Request, Response } from 'express';
import DBConnection from './DBConnection';
import cors from 'cors';

const app: Application = express();
app.use(cors());

const PORT: number = 3001;

const mongoDB = DBConnection.getConn();
mongoDB.connect();

/**
 * This sets up the `/init` endpoint to accept requests. On request, it will reinitialize the database.
 */
app.use('/init', (req: Request, res: Response): void => {
  console.log("Reinitializing DB");
  const mongoDB = DBConnection.getConn();
  mongoDB.initializeCollections().then((result) => {
    console.log(result);
    res.send("Reinitialized Datbase");
  });
});

/**
 * This sets up the `/` endpoint to accept requests. On request, it will get one document from the collection.
 */
app.use('/', (req: Request, res: Response): void => {
    console.log("About to get data");
    const mongoDB = DBConnection.getConn();
    mongoDB.getCollectionData().then(data => {
      res.send("Got collection data: " + data);
    });
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});