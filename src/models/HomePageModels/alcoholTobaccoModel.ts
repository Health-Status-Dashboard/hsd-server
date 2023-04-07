
import mongoose from 'mongoose';
import fetch from "node-fetch";
import { StatSchema } from '../../schemas/statSchema';


const alcoholTobaccoModel = mongoose.model("alcohol_tobacco", StatSchema);


async function initializeAlcoholTobaccoModel() {
  await alcoholTobaccoModel.deleteMany({})
  var alcohol_api = "https://chronicdata.cdc.gov/resource/5hba-acwf.json?locationabbr=US&stratification1=Overall&$where=yearstart%20%3E%202020&topic=Alcohol";
  var docs: any = await fetch(alcohol_api).then(result => result.json());

  var tobacco_api = "https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Tobacco";
  var docsTob: any = await fetch(tobacco_api).then(result => result.json());

  try {
    var ListOfStats = [];
    
    for (var i = 0; i < docs.length; i++) {
      var question = ["Heavy drinking among adults aged >= 18 years", "Binge drinking prevalence among adults aged >= 18 years"]
      if ((docs[i].question === question[0] || docs[i].question === question[1]) && docs[i].datavaluetype ==="Crude Prevalence"){
        
        var stat = {
            value: docs[i].datavalue + "%",
            label: docs[i].question
        };
        ListOfStats.push(stat);
      } 
    }

    

    for (var i = 0; i < docsTob.length; i++) {
      var question = ["Current smoking among adults aged >= 18 years", "Current smokeless tobacco use among adults aged >= 18 years", "Quit attempts in the past year among current smokers"];
      if ((docsTob[i].question === question[0] || docsTob[i].question === question[1] || docsTob[i].question === question[2]) && docsTob[i].datavaluetype ==="Crude Prevalence"){
        var stat = {
            value: docsTob[i].datavalue + "%",
            label: docsTob[i].question
        };
        ListOfStats.push(stat);
      }
    }

    var alcoholData = new alcoholTobaccoModel({
        title: "Alcohol & Tobacco",
        stats: ListOfStats
    })
    await alcoholData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getAlcoholTobaccoModel() {
  return alcoholTobaccoModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteAlcoholTobaccoModel() {
  return await alcoholTobaccoModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeAlcoholTobaccoModel,
  getAlcoholTobaccoModel,
  deleteAlcoholTobaccoModel
};