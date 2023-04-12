import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../../schemas/lineSchema';


const gestationalPeriodsModel = mongoose.model("birth_rate_gestational_periods", LineDataSchema);


async function initializeGestationalPeriodsModel() {
  await gestationalPeriodsModel.deleteMany({})
  var death_causes_api = "https://data.cdc.gov/resource/76vv-a7x8.json?topic_subgroup=Term%20Birth%20Rates&race_ethnicity=All%20races%20and%20origins";
  var docs: any = await fetch(death_causes_api).then(result => result.json());

  try {

    var time_periods = [];
    var datasets = [];

    for (var i = 0; i < docs.length; i++) {

      // save only recent 3 quarters data
      //if (time_periods.length === 3 && datasets[2].data.length === 3) break;

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




    var birthRateData = new gestationalPeriodsModel({
      title: 'Birth Rates by Gestational Age (rate per 100 births)',
      labels: time_periods,
      datasets: datasets,
    })

    await birthRateData.save();


  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getGestationalPeriodsModel() {
  return gestationalPeriodsModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteGestationalPeriodsModel() {
  return await gestationalPeriodsModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeGestationalPeriodsModel,
  getGestationalPeriodsModel,
  deleteGestationalPeriodsModel
};