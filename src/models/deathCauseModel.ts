import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../schemas/lineSchema';


const dcModel = mongoose.model("deathCauses", LineDataSchema);


async function initializeDCModel() {
  await dcModel.deleteMany({})
  var death_causes_api = "https://data.cdc.gov/resource/9dzk-mvmi.json?year=2023";
  var docs: any = await fetch(death_causes_api).then(result => result.json());

  try {
    var ListOfDatasets = [];
    var diseaseCauselabels = ['Septicemia', 'Malignant Neoplasms', 'Diabetes', 'Alzheimers', 'Influenza',
    'Chronic Lower Respiratory Diseases', 'Other Respiratory Diseases', 'Nephritis', 'Abnormal/Other', 'Heart Disease',
    'Cerebrovascular Disease', 'COVID-19 Multiple Causes', 'COVID-19 Primary Cause'];

    const diseaseNames = ['septicemia', "malignant_neoplasms", "diabetes_mellitus", "alzheimer_disease", 
          "influenza_and_pneumonia", "chronic_lower_respiratory", "other_diseases_of_respiratory", 'nephritis_nephrotic_syndrome', 
          "symptoms_signs_and_abnormal", "diseases_of_heart", "cerebrovascular_diseases", "covid_19_multiple_cause_of", "covid_19_underlying_cause"];

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];      


    for (var i = 0; i < docs.length; i++) {
      var dateString = monthNames[(+docs[i].month)-1];

      var listOfDiseaseNums = [];
      for (var j = 0; j < diseaseNames.length; j++){
        listOfDiseaseNums.push(docs[i][diseaseNames[j]])
      }

      var dataset = {
          data: listOfDiseaseNums,
          label: dateString
      };
      ListOfDatasets.push(dataset);
    }

    var DCData = new dcModel({
      title: "US Causes of Death (current period)",
      labels: diseaseCauselabels,
      datasets: ListOfDatasets
    })
    await DCData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getDCModel() {
  return dcModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteDCModel() {
  return await dcModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeDCModel,
    getDCModel,
    deleteDCModel
};