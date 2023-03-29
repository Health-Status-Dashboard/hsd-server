import { Model, Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../schemas/lineSchema';


const infantMortalityModel = mongoose.model("infantMortality", LineDataSchema);

async function initializeInfantMortality() {
  await infantMortalityModel.deleteMany({})
  var infant_mortality_api = "https://data.cdc.gov/resource/jqwm-z2g9.json";
  var docs: any = await fetch(infant_mortality_api).then(result => result.json());

  try {
    var mortalityDates = [];
    var infantMortalityRates = []; 
    var neoNatMortalityRates = []; 
    var postNeoNatMortalityRates = [];

    for (var i = 0; i < docs.length; i++) {
      if (docs[i].indicator === "Infant mortality") {
        mortalityDates.push(docs[i].year_and_quarter)
        infantMortalityRates.push(docs[i].rate)
      }
      if(docs[i].indicator === "Neonatal mortality"){
        neoNatMortalityRates.push(docs[i].rate)
      }
      if (docs[i].indicator === "Postneonatal mortality"){
        postNeoNatMortalityRates.push(docs[i].rate)
      }
    }

    var IMData = new infantMortalityModel({
      title: "Infant, Neonatal, and Postneonatal Mortality rates per 1000 births",
      labels: mortalityDates,
      datasets: [
        {
          label: "infant mortality",
          fill: false,
          data: infantMortalityRates,
          borderColor: "rgb(204, 102, 255)",
          tension: 0.1 
      },
      {
        label: "neonatal mortality",
        fill: false,
        data: neoNatMortalityRates,
        borderColor: "rgb(0, 153, 255)",
        tension: 0.1 
      },
      {
        label: "postneonatal mortality",
        data: postNeoNatMortalityRates,
      }],
    });
    await IMData.save();
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