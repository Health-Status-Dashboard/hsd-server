import mongoose from 'mongoose';
import fetch from "node-fetch";
import { SummarySchema } from '../schemas/summarySchema';


const generalUSPopModel = mongoose.model("general_us_population_summary", SummarySchema);


async function initializeGeneralUSPopModel() {
  await generalUSPopModel.deleteMany({})
  //use first value in last array (dec 2022 data)
  var general_pop_api = "https://api.census.gov/data/2021/pep/natmonthly?get=POP,NAME,MONTHLY&for=us";
  var docs: any = await fetch(general_pop_api).then(result => result.json());

  //TODO NEED FERTILITY RATE
  var fertility_rate_api = "https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Tobacco";
  var docsTob: any = await fetch(fertility_rate_api).then(result => result.json());

  try {
    var ListOfStats = [];
    
        var stat = {
            value: docs[docs.length-1][0],
            label: 'Population'
        };
        ListOfStats.push(stat);
       
    

    
    //TODO: fertility rates
    var stat2 = {
        value: "1.75",
        label: 'Fertility Rate'
    };
    ListOfStats.push(stat2);
      

    var popData = new generalUSPopModel({
        title: "United States Overview",
        headers: ListOfStats
    })
    await popData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getGeneralUSPopModel() {
  return generalUSPopModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteGeneralUSPopModel() {
  return await generalUSPopModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeGeneralUSPopModel,
    getGeneralUSPopModel,
    deleteGeneralUSPopModel
};