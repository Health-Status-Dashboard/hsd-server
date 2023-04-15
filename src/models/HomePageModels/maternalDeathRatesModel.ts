import mongoose from 'mongoose';
import fetch from "node-fetch";
import { ProportionalSchema } from '../../schemas/proportionalSchema';


const maternalDeathRateModel = mongoose.model("maternalDeathRate", ProportionalSchema);

async function initializeMaternalDeathRateModel() {
  await maternalDeathRateModel.deleteMany({})
  var maternal_mortality_rate_api = "https://data.cdc.gov/resource/e2d5-ggg7.json?year_of_death=2022";
  var docs: any = await fetch(maternal_mortality_rate_api).then(result => result.json());


  try {

    var deathCountsPerCat = [0, 0, 0];
    var listOfCat = [];

    for (var i = 0; i < docs.length; i++){

        //rates by age
        if (docs[i].group === "By Age"){

            //check if not in list yet
            if (listOfCat[listOfCat.length-1] !== docs[i].subgroup){
                listOfCat.push(docs[i].subgroup);
            }
            //otherwise add it
            var numToAdd = +(docs[i].maternal_deaths);
            deathCountsPerCat[listOfCat.length-1] += numToAdd;
        }
    }


  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getMaternalDeathRateModel() {
  return maternalDeathRateModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteMaternalDeathRateModel() {
  return await maternalDeathRateModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeMaternalDeathRateModel,
    getMaternalDeathRateModel,
    deleteMaternalDeathRateModel
};