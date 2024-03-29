import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../../schemas/lineSchema';
import util from 'util';
import { Constants } from '../constants';

const uninsuredByAgeModel = mongoose.model("uninsured_age_summary", LineDataSchema);
const NAME = 'Uninsured By Age';

async function initializeUninsuredByAgeModel() {
  await uninsuredByAgeModel.deleteMany({})
  var uninsured_age_api = "https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`=%27By%20Age%27";
  var docs: any = await fetch(uninsured_age_api).then(result => result.json());
  var message;

  try {
    var ListOfStats = [];

    //gets the most recent data at bottom
    for (var i = docs.length-1; i >= 0; i--){

        if (docs[i].indicator === "Uninsured at the Time of Interview"){
            var stat = {
                    label: docs[i].subgroup,
                    data: [docs[i].value]
            };
            ListOfStats.unshift(stat);
        }

        if (ListOfStats.length === 4){
            break;
        }
    }

    var popData = new uninsuredByAgeModel({
        title: "US Uninsured Rate by Age (% Uninsured)",
        labels:["Ages"],
        datasets: ListOfStats,

    })

    await popData.save();

    message = util.format(Constants.COLLECTION_UPDATE_SUCCESS_MESSAGE, NAME);
  } catch (err) {
    message = util.format(Constants.COLLECTION_UPDATE_ERROR_MESSAGE, NAME, err.message);
    console.log(err);
    console.log(err.message);
  }

  return message;
};

async function getUninsuredByAgeModel() {
  return uninsuredByAgeModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteUninsuredByAgeModel() {
  return await uninsuredByAgeModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeUninsuredByAgeModel,
    getUninsuredByAgeModel,
    deleteUninsuredByAgeModel
};