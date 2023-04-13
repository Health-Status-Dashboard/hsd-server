import mongoose from 'mongoose';
import fetch from "node-fetch";
import { SummarySchema } from '../../schemas/summarySchema';
import util from 'util';
import { Constants } from '../constants';

const causeDeathSummaryModel = mongoose.model("cause_death_summary", SummarySchema);
const NAME = 'Cause of Death Summary'

async function initializeCDSummaryModel() {
  await causeDeathSummaryModel.deleteMany({})
  //use first value in last array (dec 2022 data)
  var cd_summary_api = "https://api.census.gov/data/2021/pep/natmonthly?get=POP,NAME,MONTHLY&for=us"; //TODO: CHANGE
  var docs: any = await fetch(cd_summary_api).then(result => result.json());
  var message;

  try {
    var ListOfStats = [];

        var stat = {
            value: "599,156",
            label: "All Causes (3 month period)"
        };
        ListOfStats.push(stat);

        var stat = {
            value: "Accidents, Suicide, OD's, Homicides",
            label: "Not Shown"
        };
        ListOfStats.push(stat);






    var cdSummaryData = new causeDeathSummaryModel({
        title: "US Deaths by Cause",
        headers: ListOfStats
    })
    await cdSummaryData.save();
    message = util.format(Constants.COLLECTION_UPDATE_SUCCESS_MESSAGE, NAME);

  } catch (err) {
    message = util.format(Constants.COLLECTION_UPDATE_ERROR_MESSAGE, NAME, err.message);
    console.log(err);
    console.log(err.message);
  }
  return message;
};

async function getCDSummaryModel() {
  return causeDeathSummaryModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteCDSummaryModel() {
  return await causeDeathSummaryModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeCDSummaryModel,
    getCDSummaryModel,
    deleteCDSummaryModel
};