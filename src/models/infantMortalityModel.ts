import { Model, Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import fetch from "node-fetch";

const infantMortalitySchema = new Schema({
  title: { type: String, required: true },
  label: { type: String, required: true },
  x: { type: Array, required: true }, //year
  y: { type: Array, required: true }, //life expectancy values
  color: { type: String, required: false },
})

const infantMortalityModel = mongoose.model("infantMortality", infantMortalitySchema);

async function initializeInfantMortality() {
  await infantMortalityModel.deleteMany({})
  var infant_mortality_api = "https://data.cdc.gov/resource/jqwm-z2g9.json";
  var docs: any = await fetch(infant_mortality_api).then(result => result.json());


  try {

    console.log('infant mortality', docs);

    var infantMortalityDates = [];
    var infantMortalityRates = []; //rate per 1000 births

    var neoNatMortalityDates = [];
    var neoNatMortalityRates = []; //rate per 1000 births

    var postNeoNatMortalityDates = [];
    var postNeoNatMortalityRates = []; //rate per 1000 births

    

    // for (var i = 0; i < docs.length; i++) {
    //   if (docs[i].indicator === "Infant mortality") {
    //     infantMortalityDates.push(docs[i].year_and_quarter)
    //     infantMortalityRates.push(docs[i].rate)
    //   }
    //   if(docs[i].indicator === "Neonatal mortality"){
    //     neoNatMortalityDates.push(docs[i].year_and_quarter)
    //     neoNatMortalityRates.push(docs[i].rate)
    //   }
    //   if (docs[i].indicator === "Postneonatal mortality"){
    //     postNeoNatMortalityDates.push(docs[i].year_and_quarter)
    //     postNeoNatMortalityRates.push(docs[i].rate)

    //   }
    // }
    // var lifeExp = new infantMortalityModel({
    //   title: "Average Life Expectancy in US (1980-2018)",
    //   label: "Average Life Expectancy in the US",
    //   x: years,
    //   y: life_expectancy_values,
    //   color: 'rgba(51,255,82)'

    // });
    // await lifeExp.save();
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getInfantMortality() {
  return infantMortalityModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteInfantMortality() {
  return await infantMortalityModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeInfantMortality,
    getInfantMortality,
    deleteInfantMortality
};