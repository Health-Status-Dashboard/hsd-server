import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../../schemas/lineSchema';

const recent3YearDCModel = mongoose.model("recent_three_year_quarterly_death_causes", LineDataSchema);

async function initializeRecent3YearDCModel() {
  await recent3YearDCModel.deleteMany({})
  var recent_year_dc_api = "https://data.cdc.gov/resource/489q-934x.json?time_period=3-month%20period&rate_type=Crude";
  var docs: any = await fetch(recent_year_dc_api).then(result => result.json());
 
  try {

    var datasets = [];

    for (var i = 0; i < docs.length; i++){

      //see if object label (cause of death) is in datasets
      var position = datasets.findIndex(obj => obj.label === docs[i].cause_of_death);

      //if exists, then go through data list and check if any of the objects have that year
      if (position !== -1){

        var listOfDataInDatasets = datasets[position].data;

        //get year to compare
        var year = docs[i].year_and_quarter.toString().substr(0,4);
        var positionYearObj = listOfDataInDatasets.findIndex(obj => obj.year === year);

        //if have that year, add to data
        if (positionYearObj !== -1){
          var dataRatesList = listOfDataInDatasets[positionYearObj].data;
          dataRatesList.push(docs[i].rate_overall);
        }
        else { //if don't have that year, add new object with year: x, data
          var newDataRatesObject = {
            year: year,
            data: [docs[i].rate_overall]
          }
          listOfDataInDatasets.push(newDataRatesObject);
        }
      }
      else{ //if object key (cause of death) is not in datasets, add one
        var year = docs[i].year_and_quarter.toString().substr(0,4);
          var newCauseDeathObj = {
            label: docs[i].cause_of_death,
            data: [{
              year: year,
              data: [docs[i].rate_overall]
            }]
          };
          datasets.push(newCauseDeathObj);
      }
    }
    var dataModel = new recent3YearDCModel({
      title: "US Causes of Death per quarter (2020-2022)",
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: datasets,
    })
    await dataModel.save();
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};



async function getRecent3YearDCModel() {
  return recent3YearDCModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteRecent3YearDCModel() {
    return await recent3YearDCModel.deleteMany({}).then(response => {
      return response
    });
  };

export {
    initializeRecent3YearDCModel,
    getRecent3YearDCModel,
    deleteRecent3YearDCModel,
};


