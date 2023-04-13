import { Db, MongoClient } from 'mongodb';
var mongoUrl = "mongodb://localhost:27017/";
import mongoose from 'mongoose';
import { initializeStates } from './models/stateModel';
import { initializeLifeExpectancy } from './models/HomePageModels/lifeExpectancyModel';
import { initializeAlcoholTobaccoModel } from './models/HomePageModels/alcoholTobaccoModel';
import { initializeCDSummaryModel } from './models/HomePageModels/causeOfDeathSummaryModel';
import { initializeDCModel } from './models/HomePageModels/deathCauseModel';
import { initializeInfantMortality } from './models/HomePageModels/infantMortalityModel';
import { initializeNAWModel } from './models/HomePageModels/nutritionActivityWeightModel';
import { initializePhysicalHealthWeightModel } from './models/HomePageModels/physicalHealthSummaryModel';
import { initializeGeneralUSPopModel } from './models/HomePageModels/summaryModel';
import { initializeUninsuredByAgeModel } from './models/HomePageModels/uninsuredByAgeModel';
import { initializeUninsuredByEducationModel } from './models/HomePageModels/uninsuredByEducationModel';
import { initializeUninsuredBySubgroupModel } from './models/HomePageModels/uninsuredBySubgroupModel';
import { initializeUninsuredUSPopModel } from './models/HomePageModels/uninsuredSummaryModel';
import { initializeBirthRateModel } from './models/HomePageModels/birthRatesModel';
import { initializeGestationalPeriodsModel } from './models/HomePageModels/birthRatesGestationalPeriodsModel';
import { initializeBirthLast12MonthModel } from './models/HomePageModels/fertilityLast12MonthsModel';
import { initializeRecent3YearDCModel } from './models/RegionsPageModels/recent3YearQuarterlyCausesDeathModel';
import { initializeRecentYearDCModel } from './models/RegionsPageModels/recent12MonthCausesDeathModel';



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
  public async connect() {
    try {
        const dbUrl = this.mongoUrl + "/" + this.dbName;
        console.info(`Connecting to ${dbUrl}`);
        mongoose.connect(dbUrl)
    } catch (error) {
      console.error(error);
    }
  }

  public async resetCollections() {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    await collections.forEach(colInfo => {
      db.collection(colInfo.name).deleteMany();
    });
  }

  public async updateCollections(): Promise<string[]> {
    let message = [];
    return Promise.all([
      initializeAlcoholTobaccoModel(),
      initializeBirthLast12MonthModel(),
      initializeBirthRateModel(),
      initializeCDSummaryModel(),
      initializeDCModel(),
      initializeGeneralUSPopModel(),
      initializeGestationalPeriodsModel(),
      initializeInfantMortality(),
      initializeLifeExpectancy(),
      initializeNAWModel(),
      initializePhysicalHealthWeightModel(),
      initializeRecent3YearDCModel(),
      initializeRecentYearDCModel(),
      initializeStates(),
      initializeUninsuredByAgeModel(),
      initializeUninsuredByEducationModel(),
      initializeUninsuredBySubgroupModel(),
      initializeUninsuredUSPopModel()
    ]).then((messages) => {
      return messages
    });
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
