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

//K
      // const doc = {
      //   title: "Health Data Example",
      //   content: "This is an example of health data",
      // }
      // const result = await healthCollection.insertOne(doc);
      // console.log("A document was inserted into the collection. Id: " + result.insertedId);


      
      //pass and continually update this list (schema above)
      var totalHealthData = [{stateBasedData : []}, {nonStateBasedData :[]}]

      //pass array of objects to each function and update with each api -- update db once below
      totalHealthData = await(this.getLifeExpectancy(totalHealthData));

      //const result = await healthCollection.insertOne(doc);
      const secondResult = await healthCollection.insertMany(totalHealthData);

      console.log(secondResult.insertedIds)
//K
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  }

  public async getCollectionData(): Promise<string> {
    const db = this.client.db(this.dbName);
    console.log("db name:" + db.databaseName);
    //K
    return db.collection(this.healthDataCollection).find().toArray().then((document) => {return JSON.stringify(document)});

    // return db.collection(this.healthDataCollection).findOne({}).then((document) => {
    //   console.log("document: " + document);
    //   console.log(document._id);
    //   console.log(document['title']);
    //   console.log(document['content']);
    //   return JSON.stringify(document);
    // });
    //K
  }

  public async closeDb() {
    this.client.close();
  }

//K
  public getLifeExpectancy = async(originalList) => {

    //structure data like below 
      // const totalHealthData = [
      //   {stateBasedData: [{ 
      //       state: "Virginia",
      //       categories: [
      //         {lifeExpectancy: {
      //           sex: [{
      //             total: "le",
      //             male: "le",
      //             female: "le"
      //           }]
      //         }}
      //       ]}
      //     },

      //   {nonStateData: [{}]}
      // ]

    var listHealth = originalList;

    try{
      //get life expectancy data using cdc api
      var life_span_api = "https://data.cdc.gov/resource/ss2j-8ajj.json";
      var docs = await fetch(life_span_api).then(result => result.json());

      //go through health data from api
      for (var i = 0; i < docs.length; i++){

        //get our array of state data
        var arrStateData = listHealth[0].stateBasedData;
        
        //search for index of the state in the array if have that state already
        var indexOfState = arrStateData.findIndex(item => item.state === docs[i].state);

        var sex = docs[i].sex;
        var lifeExpectancy = docs[i].le;

        //if doesn't exist, then add value to our array
        if (indexOfState < 0){
          listHealth[0].stateBasedData.push(
            {state: docs[i].state,
            categories: [
              {lifeExpectancy:
                {sex: [
                  {
                  [sex] : lifeExpectancy
                  }]
                }
              }
            ]
          }
          )
        }

        //if does exist, then update with the female and male data too
        if (indexOfState > -1){
          var stateObjectToUpdate = listHealth[0].stateBasedData[indexOfState];
          stateObjectToUpdate.categories[0].lifeExpectancy.sex.push({[sex] : lifeExpectancy})
          
        }
        }
       
        return listHealth;
        } catch(error){
      console.log(error);
    }
  }
//K
}
