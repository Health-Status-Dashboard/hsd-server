import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LongitudinalSchema } from '../../schemas/longitudinalSchema';
import util from 'util';
import { Constants } from '../constants';

const birthRatesModel = mongoose.model("birthRates", LongitudinalSchema);
const NAME = 'Birth Rate';

async function initializeBirthRateModel() {
  await birthRatesModel.deleteMany({})
  var birth_rate_api = "https://data.cdc.gov/resource/76vv-a7x8.json?topic=Birth%20Rates&race_ethnicity=All%20races%20and%20origins&topic_subgroup=Age-specific%20Birth%20Rates";
  var docs: any = await fetch(birth_rate_api).then(result => result.json());
  var message;

  try {

    var time_periods = [];
    var datasets = [];

    for (var i = 0; i < docs.length; i++) {
      var position = datasets.findIndex(obj => obj.label === docs[i].indicator);

      if (position === -1) {
        datasets.push({
          label: docs[i].indicator,
          data: [docs[i].rate],
        })
      }

      if (position !== -1) {
        var dataList = datasets[position].data;
        dataList.unshift(docs[i].rate)
      }

      //put time period in list if not in list
      if (time_periods[0] !== docs[i].year_and_quarter) {
        time_periods.unshift(docs[i].year_and_quarter);
      }
    }


    var birthRateData = new birthRatesModel({
      title: 'Birth Rates by Age-Group (per 1,000 population)',
      labels: time_periods,
      datasets: datasets,
    })

    await birthRateData.save();
    message = util.format(Constants.COLLECTION_UPDATE_SUCCESS_MESSAGE, NAME);

  } catch (err) {
    message = util.format(Constants.COLLECTION_UPDATE_ERROR_MESSAGE, NAME, err.message);
    console.log(err);
    console.log(err.message);
  }

  return message;
};

async function getBirthRateModel() {
  return birthRatesModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteBirthRateModel() {
  return await birthRatesModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeBirthRateModel,
  getBirthRateModel,
  deleteBirthRateModel
};