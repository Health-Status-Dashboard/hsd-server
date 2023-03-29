import { Model, Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import fetch from "node-fetch";
import { StatSchema } from '../schemas/statSchema';


const alcoholModel = mongoose.model("alcohol", StatSchema);

/*
Data for alcohol use related statistics found at:  https://chronicdata.cdc.gov/resource/5hba-acwf.json?locationabbr=US&stratification1=Overall&$where=yearstart%20%3E%202020&topic=Alcohol
*/
async function initializeAlcoholModel() {
  await alcoholModel.deleteMany({})
  var alcohol_api = "https://chronicdata.cdc.gov/resource/5hba-acwf.json?locationabbr=US&stratification1=Overall&$where=yearstart%20%3E%202020&topic=Alcohol";
  var docs: any = await fetch(alcohol_api).then(result => result.json());

  try {
    var ListOfStats = [];

    for (var i = 0; i < docs.length; i++) {
        var stat = {
            value: docs[i].datavalue,
            label: docs[i].question
        };
        ListOfStats.push(stat);
    }

    var alcoholData = new alcoholModel({
        title: "US Chronic Data of Alcohol Use - Statistic Percentages in 2021",
        stats: ListOfStats
    })
    await alcoholData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getAlcoholModel() {
  return alcoholModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteAlcoholModel() {
  return await alcoholModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeAlcoholModel,
    getAlcoholModel,
    deleteAlcoholModel
};