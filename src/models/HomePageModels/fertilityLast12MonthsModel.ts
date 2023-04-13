//DATA FROM https://data.census.gov/table?g=010XX00US&tid=ACSST1Y2021.S1301

import mongoose from 'mongoose';
import fetch from "node-fetch";
import { SummarySchema } from '../../schemas/summarySchema';
import util from 'util';
import { Constants } from '../constants';

const birthLast12MonthModel = mongoose.model("birth_last12Months_summary", SummarySchema);
const NAME = 'Birth Last 12 Month';

async function initializeBirthLast12MonthModel() {
  await birthLast12MonthModel.deleteMany({})
  //var births_12_mo_api = "https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`='National Estimate'";
  //var docs: any = await fetch(births_12_mo_api).then(result => result.json());
  var message;

  try {
    var ListOfStats = [{ label: "15 to 19 years", value: "87,906" }, { label: "20 to 34 years", value: "2,739,957" }, { label: "35 to 50 years", value: "1,094,325" }];

    var birthData = new birthLast12MonthModel({
      title: "Total Births in the past 12 months",
      headers: ListOfStats
    })
    await birthData.save();
    message = util.format(Constants.COLLECTION_UPDATE_SUCCESS_MESSAGE, NAME);
  } catch (err) {
    message = util.format(Constants.COLLECTION_UPDATE_ERROR_MESSAGE, NAME, err.message);
    console.log(err);
    console.log(err.message);
  }
  return message;
};

async function getBirthLast12MonthModel() {
  return birthLast12MonthModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteBirthLast12MonthModel() {
  return await birthLast12MonthModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeBirthLast12MonthModel,
  getBirthLast12MonthModel,
  deleteBirthLast12MonthModel
};