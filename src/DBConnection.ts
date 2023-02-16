import {Db, MongoClient} from 'mongodb';
var mongoUrl = "mongodb://localhost:27017/";

export default class DBConnection {

  private static readonly mongoDb: DBConnection = new DBConnection();

  static getConn(): DBConnection {
    return DBConnection.mongoDb;
  }

  private client: MongoClient;
  private readonly mongoUrl = /*process.env.DB_CONNECTION_STRING ||*/ 'mongodb://127.0.0.1:27017';
  private readonly dbName = /*process.env.DB_NAME ||*/ 'hsd';

  /**
   * Connects to the mondoDB client.
   */
  public async connect(): Promise<MongoClient> {
    try {
        if (!this.client) {
            const dbUrl = this.mongoUrl + "/" + this.dbName;
            console.info(`Connecting to ${dbUrl}`);
            this.client = await MongoClient.connect(dbUrl);
            return this.client;
        }
    } catch(error) {
        console.error(error);
    }
  }

  public async initializeCollections() {
    const newDb = this.client.db(this.dbName);
    await newDb.dropCollection("HealthData");
    try {
      await newDb.createCollection("HealthData");
      const healthCollection = newDb.collection("HealthData");

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
      return db.collection("HealthData").findOne({}).then((document) => {
        console.log(document._id);
        console.log(document['title']);
        console.log(document['content']);
        return document['title'];
      });
  }

}
