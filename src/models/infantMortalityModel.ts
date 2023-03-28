import { Model, Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import fetch from "node-fetch";


const LineDataSchema = new Schema({
    title: {type: String, required: true },
    labels: {type: Array<string>, required: true },
    datasets: [{
        label: {type: String, required: true },
        data: { type: Array<number>, required: true },
        fill: {type: Boolean, required: true }, 
        borderColor: {type: String, required: true }, //line fields shown here: https://www.chartjs.org/docs/latest/charts/line.html 
        tension: { type: Number, required: true }, 
    }] 
})





// const infantMortalitySchema = new Schema({
//   title: { type: String, required: true },
//   label: { type: String, required: true },
//   x: { type: Array, required: true }, //year
//   y: { type: Array, required: true }, //life expectancy values
//   color: { type: String, required: false },
// })

const infantMortalityModel = mongoose.model("infantMortality", LineDataSchema);

async function initializeInfantMortality() {
  await infantMortalityModel.deleteMany({})
  var infant_mortality_api = "https://data.cdc.gov/resource/jqwm-z2g9.json";
  var docs: any = await fetch(infant_mortality_api).then(result => result.json());


  try {

    console.log('infant mortality', docs);

    var mortalityDates = [];
    var infantMortalityRates = []; //rate per 1000 births
    var neoNatMortalityRates = []; //rate per 1000 births
    var postNeoNatMortalityRates = []; //rate per 1000 births

    

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

    var datasets = [];

    //make the objects to add to datasets from arrays
    var infantMor = {
        label: "infant mortality",
        fill: false,
        data: infantMortalityRates,
        borderColor: "rgb(204, 102, 255)",
        tension: 0.1 
    };
    var NeoMor = {
        label: "infant mortality",
        fill: false,
        data: neoNatMortalityRates,
        borderColor: "rgb(0, 153, 255)",
        tension: 0.1 
    };
    var PostNeoMor = {
        label: "infant mortality",
        fill: false,
        data: postNeoNatMortalityRates,
        borderColor: "rgb(102, 153, 0)",
        tension: 0.1 
    };

    datasets.push(infantMor);
    datasets.push(NeoMor);
    datasets.push(PostNeoMor);

    var IMData = new LineDataSchema({
      title: "Infant, Neonatal, and Postneonatal Mortality rates",
      labels: mortalityDates,
      datasets: datasets,
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