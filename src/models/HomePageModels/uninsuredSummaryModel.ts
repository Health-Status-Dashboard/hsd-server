import mongoose from 'mongoose';
import fetch from "node-fetch";
import { SummarySchema } from '../../schemas/summarySchema';


const uninsuredUSPopModel = mongoose.model("uninsured_us_population_summary", SummarySchema);


async function initializeUninsuredUSPopModel() {
  await uninsuredUSPopModel.deleteMany({})
  var uninsured_pop_api = "https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`='National Estimate'";
  var docs: any = await fetch(uninsured_pop_api).then(result => result.json());
  
  try {
    var ListOfStats = [];

    //gets the most recent data at bottom
    for (var i = docs.length-1; i >= 0; i--){
        if (docs[i].indicator === "Uninsured at the Time of Interview"){
            var stat = {
                value: docs[i].value + "% of Americans Uninsured",
                label: 'Current Estimate'
            };
            ListOfStats.push(stat);
            break;
        }
    }
    
    var popData = new uninsuredUSPopModel({
        title: "Uninsured Population in the US",
        headers: ListOfStats
    })
    await popData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getUninsuredUSPopModel() {
  return uninsuredUSPopModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteUninsuredUSPopModel() {
  return await uninsuredUSPopModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeUninsuredUSPopModel,
    getUninsuredUSPopModel,
    deleteUninsuredUSPopModel
};