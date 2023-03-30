import mongoose from 'mongoose';
import fetch from "node-fetch";
import { StatSchema } from '../schemas/statSchema';


const tobaccoModel = mongoose.model("tobacco", StatSchema);

async function initializeTobaccoModel() {
  await tobaccoModel.deleteMany({})
  var tobacco_api = "https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Tobacco";
  var docs: any = await fetch(tobacco_api).then(result => result.json());

  try {
    var ListOfStats = [];

    for (var i = 0; i < docs.length; i++) {
        var stat = {
            value: docs[i].datavalue,
            label: docs[i].question
        };
        ListOfStats.push(stat);
    }

    var tobaccoData = new tobaccoModel({
        title: "US Chronic Data of Tobacco Use - Statistic Percentages in 2021",
        stats: ListOfStats
    })
    await tobaccoData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getTobaccoModel() {
  return tobaccoModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteTobaccoModel() {
  return await tobaccoModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeTobaccoModel,
    getTobaccoModel,
    deleteTobaccoModel
};