import mongoose from 'mongoose';
import fetch from "node-fetch";
import { SummarySchema } from '../../schemas/summarySchema';

const HealthSpendingPharmaceuticalModel = mongoose.model("gdp_health_spending_pharmaceutical_summary", SummarySchema);

async function initializePharmaceuticalSpendingModel() {
  await HealthSpendingPharmaceuticalModel.deleteMany({})
  var pharm_spending_api = "https://stats.oecd.org/SDMX-JSON/data/SHA/HFTOT.HC51.HPTOT.PARCUR.USA/all?startTime=2020&endTime=2021";
  var docs: any = await fetch(pharm_spending_api).then(result => result.json());


  
  try {
    var usPharmaceuticalSpending = docs.dataSets[0].series["0:0:0:0:0"].observations['0'][0];

    var ListOfStats = [];
    var stat = {
        value: usPharmaceuticalSpending.toString(),
        label: "% of Health Spending"
    }
    ListOfStats.push(stat);

    var pharmaceuticalSpendingData = new HealthSpendingPharmaceuticalModel({
        title: "% of Health Spending as Pharmaceutical- Country level",
        headers : ListOfStats
    })

    await pharmaceuticalSpendingData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getPharmaceuticalSpendingModel() {
  return HealthSpendingPharmaceuticalModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deletePharmaceuticalSpendingModel() {
  return await HealthSpendingPharmaceuticalModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializePharmaceuticalSpendingModel,
    getPharmaceuticalSpendingModel,
    deletePharmaceuticalSpendingModel
};