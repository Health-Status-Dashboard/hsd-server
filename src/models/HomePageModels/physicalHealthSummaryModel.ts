import mongoose from 'mongoose';
import fetch from "node-fetch";
import { StatSchema } from '../../schemas/statSchema';


const physicalHealthWeightModel = mongoose.model("physical_health_weight_summary", StatSchema);


async function initializePhysicalHealthWeightModel() {
  await physicalHealthWeightModel.deleteMany({})


  var physical_health_weight_api = "https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Tobacco"; //TODO: CHANGE
  var docs: any = await fetch(physical_health_weight_api).then(result => result.json());

  try {
    var ListOfStats = [];

    var stat = {
      value: "1.6",
      label: "Adult Median Daily Frequency of Vegetable Consumption (2021)"
    };
    ListOfStats.push(stat);

    var stat2 = {
      value: "23.7%",
      label: "Proportion of Adults Reporting no Leisure-Time Physical Activity in the last month (2021)"
    };
    ListOfStats.push(stat2);


    var weightData = new physicalHealthWeightModel({
      title: "Weight Management",
      stats: ListOfStats
    })
    await weightData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getPhysicalHealthWeightModel() {
  return physicalHealthWeightModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deletePhysicalHealthWeightModel() {
  return await physicalHealthWeightModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializePhysicalHealthWeightModel,
  getPhysicalHealthWeightModel,
  deletePhysicalHealthWeightModel
};