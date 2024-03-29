import mongoose from 'mongoose';
import fetch from "node-fetch";
import { ProportionalSchema } from '../../schemas/proportionalSchema';
import util from 'util';
import { Constants } from '../constants';

const nutritionActivityWeightModel = mongoose.model("nutritionActivityWeight", ProportionalSchema);
const NAME = 'Nutrition Activity Weight';

async function initializeNAWModel() {
  await nutritionActivityWeightModel.deleteMany({})
  var nutrition_activity_weight_api = "https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Nutrition,%20Physical%20Activity,%20and%20Weight%20Status";
  var docs: any = await fetch(nutrition_activity_weight_api).then(result => result.json());
  var message;

  try {

    var ListOflabels = [];
    var ListOfStats = [];

    var obesityAndOverweight;
    var obesity;
    var totalCount = 0;

    for (var i = 0; i < docs.length; i++) {
      if (docs[i].question === "Obesity among adults aged >= 18 years" && docs[i].datavaluetype === "Crude Prevalence") {
        ListOflabels.push("Obese");
        ListOfStats.push(docs[i].datavalue);
        obesity = docs[i].datavalue;
      }
      if (docs[i].question === "Overweight or obesity among adults aged >= 18 years" && docs[i].datavaluetype === "Crude Prevalence") {
        obesityAndOverweight = docs[i].datavalue;
      }
      if (docs[i].question === "Healthy weight among adults aged >= 18 years" && docs[i].datavaluetype === "Crude Prevalence") {
        ListOflabels.push("Healthy");
        ListOfStats.push(docs[i].datavalue);
      }
    }

    //find overweight alone
    ListOflabels.push("Overweight");
    ListOfStats.push(((+obesityAndOverweight) - (+obesity)).toFixed(2).toString());

    //find underweight/other stats
    var totalCount = 0;
    for (var j = 0; j < ListOfStats.length; j++) {
      var x = +(ListOfStats[j]);
      totalCount += x;
    }

    var underweightOrOther = (100 - totalCount).toFixed(2).toString();
    ListOflabels.push("Underweight/Other");
    ListOfStats.push(underweightOrOther);

    var NAWData = new nutritionActivityWeightModel({
      title: "US Nutrition, Activity, and Weight - 2021",
      labels: ListOflabels,
      datasets: [{
        label: 'Percentage of Population',
        data: ListOfStats,
      }]
    })
    await NAWData.save();
    message = util.format(Constants.COLLECTION_UPDATE_SUCCESS_MESSAGE, NAME);
  } catch (err) {
    message = util.format(Constants.COLLECTION_UPDATE_ERROR_MESSAGE, NAME, err.message);
    console.log(err);
    console.log(err.message);
  }
  return message;
};

async function getNAWModel() {
  return nutritionActivityWeightModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteNAWModel() {
  return await nutritionActivityWeightModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeNAWModel,
  getNAWModel,
  deleteNAWModel
};