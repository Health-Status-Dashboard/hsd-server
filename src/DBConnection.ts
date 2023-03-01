import { Db, MongoClient } from 'mongodb';
var mongoUrl = "mongodb://localhost:27017/";
import { Schema, model, connect } from 'mongoose';
import mongoose from 'mongoose';

/**
* will move this to "models" and "routes" folder after a sanity check
*/

// Create an interface representing a document in MongoDB.
interface IState {
  name: string;
  population: string;
  code: string;
}

// Create a Schema corresponding to the document interface.
const stateSchema = new Schema<IState>({
  name: { type: String, required: true },
  population: { type: String, required: true },
  code: { type: String, required: true }
});

// Create a Model.
const State = model<IState>('State', stateSchema);




export default class DBConnection {

  private static readonly mongoDb: DBConnection = new DBConnection();

  static getConn(): DBConnection {
    return DBConnection.mongoDb;
  }

  private client: MongoClient;
  private readonly mongoUrl = /*process.env.DB_CONNECTION_STRING ||*/ 'mongodb://127.0.0.1:27017';
  private readonly dbName = /*process.env.DB_NAME ||*/ 'hsd';
  private readonly healthDataCollection = "HEALTH_DATA";



  /**
   * Connects to the mondoDB client.
   */
  public async connect(): Promise<MongoClient> {
    try {
      if (!this.client) {
        const dbUrl = this.mongoUrl + "/" + this.dbName;
        console.info(`Connecting to ${dbUrl}`);
        this.client = await MongoClient.connect(dbUrl);
        mongoose.connect(mongoUrl)
        return this.client;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async initializeStates() {
    // clear old data
    await State.deleteMany({})
    // get population by state
    var life_span_api = "https://api.census.gov/data/2021/acs/acs1/profile?get=NAME,DP05_0001E&for=state:*";
    var docs = await fetch(life_span_api).then(result => result.json());
    // add state data to db
    try {
      for (var i = 0; i < docs.length; i++) {
        console.log(docs[i])
        const state = new State({
          name: docs[i][0],
          population: docs[i][1],
          code: docs[i][2]
        });
        await state.save();
      }
      console.log("Added state documents");
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }



    /** 
    const state = new State({
      name: 'Massachusetts',
      abbreviation: 'MA'
    });
    await state.save();

    console.log(state.abbreviation); // "MA"
    */
  }


  public async getStates() {
    const db = this.client.db(this.dbName);
    console.log("db name:" + db.databaseName);
    return State.find({}).then((document) => {
      return JSON.stringify(document);
    });
  }

  public async initializeCollections() {
    const db = this.client.db(this.dbName);
    const collections = await db.listCollections({ name: this.healthDataCollection }).toArray();
    if (collections.length > 0) {
      await db.dropCollection(this.healthDataCollection);
    }
    try {
      await db.createCollection(this.healthDataCollection);
      const healthCollection = db.collection(this.healthDataCollection);

      const doc = {
        title: "Health Data Example",
        content: "This is an example of health data",
      }
      const result = await healthCollection.insertOne(doc);
      console.log("A document was inserted into the collection. Id: " + result.insertedId);
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  }

  public async getCollectionData(): Promise<string> {
    const db = this.client.db(this.dbName);
    console.log("db name:" + db.databaseName);
    return db.collection(this.healthDataCollection).findOne({}).then((document) => {
      console.log("document: " + document);
      console.log(document._id);
      console.log(document['title']);
      console.log(document['content']);
      return JSON.stringify(document);
    });
  }

  public async closeDb() {
    this.client.close();
  }

}
