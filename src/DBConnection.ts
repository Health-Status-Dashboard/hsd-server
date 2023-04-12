import { Db, MongoClient } from 'mongodb';
var mongoUrl = "mongodb://localhost:27017/";
import mongoose from 'mongoose';



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

  public async initializeCollections() {
    const db = this.client.db(this.dbName);
    const collections = await db.listCollections({ name: this.healthDataCollection }).toArray();
    if (collections.length > 0) {
      await db.dropCollection(this.healthDataCollection);
    }
    try {
      await db.createCollection(this.healthDataCollection);
      const healthCollection = db.collection(this.healthDataCollection);

    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  }

  public async getCollectionData(): Promise<string> {
    const db = this.client.db(this.dbName);
    //console.log("db name:" + db.databaseName);
    
    return db.collection(this.healthDataCollection).findOne({}).then((document) => {
      // console.log("document: " + document);
      // console.log(document._id);
      // console.log(document['title']);
      // console.log(document['content']);
      return JSON.stringify(document);
    });
  }

  public async closeDb() {
    this.client.close();
  }

}
