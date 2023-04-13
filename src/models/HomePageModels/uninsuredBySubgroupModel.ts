import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LongitudinalSchema } from '../../schemas/longitudinalSchema';
import util from 'util';
import { Constants } from '../constants';

const uninsuredBySubgroupModel = mongoose.model("uninsured_subgroup_summary", LongitudinalSchema);
const NAME = 'Uninsured By Subgroup';

async function initializeUninsuredBySubgroupModel() {
  await uninsuredBySubgroupModel.deleteMany({})
  var uninsured_overall_api = "https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`=%27National%20Estimate%27";
  var docs: any = await fetch(uninsured_overall_api).then(result => result.json());

  var uninsured_subgroup_api = "https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`=%27By%20Sex%27";
  var docs_s: any = await fetch(uninsured_subgroup_api).then(result => result.json());

  var message;

  try {

    var ListofStatsOverall = [];

    //gets the most recent data at bottom
    var ListOfStatsNational = [];
    var ListOfDateNational = [];
    for (var i = docs.length-1; i >= 0; i--){

        if (docs[i].indicator === "Uninsured at the Time of Interview"){

            var value = docs[i].value
            if (value === undefined){
                continue;
            };
            ListOfStatsNational.unshift(value);

            //convert to date object
            var month =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var dateStr = docs[i].time_period_start_date;
            var dateObj = new Date(dateStr);
            var specificMonth = month[dateObj.getMonth()];
            var year = dateObj.getFullYear().toString();
            var dateToDisplay =  specificMonth + " " + year;
            ListOfDateNational.unshift(dateToDisplay);
        }

        if (ListOfStatsNational.length === 6){
            var stat = {
                label: "Overall National Estimate",
                data: ListOfStatsNational
            };
            ListofStatsOverall.push(stat);
            break;
        }
    }


    var ListOfStatsFemale = [];
    var ListOfStatsMale = [];


    //gets the most recent data at bottom
    for (var i = docs_s.length-1; i >= 0; i--){
        if (docs_s[i].indicator === "Uninsured at the Time of Interview"){
            if (docs_s[i].subgroup === "Male"){
                var value = docs_s[i].value
                if (value === undefined){
                    continue;
                };
                ListOfStatsMale.unshift(value);

                if (ListOfStatsMale.length === 6){
                    var stat = {
                        label: "Male National Estimate",
                        data: ListOfStatsMale
                    };
                    ListofStatsOverall.push(stat);
                    break;
                }
            }
        }
    }
    //gets the most recent data at bottom
    for (var i = docs_s.length-1; i >= 0; i--){
        if (docs_s[i].indicator === "Uninsured at the Time of Interview"){
            if (docs_s[i].subgroup === "Female"){
                var value = docs_s[i].value
                if (value === undefined){
                    continue;
                };
                ListOfStatsFemale.unshift(value);

                if (ListOfStatsFemale.length === 6){
                    var stat = {
                        label: "Female National Estimate",
                        data: ListOfStatsFemale
                    };
                    ListofStatsOverall.push(stat);
                    break;
                }
            }
        }
    }

    var popData = new uninsuredBySubgroupModel({
        title: 'US Uninsured Rate (% Uninsured)',
        labels: ListOfDateNational,
        datasets: ListofStatsOverall,
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

async function getUninsuredBySubgroupModel() {
  return uninsuredBySubgroupModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteUninsuredBySubgroupModel() {
  return await uninsuredBySubgroupModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeUninsuredBySubgroupModel,
    getUninsuredBySubgroupModel,
    deleteUninsuredBySubgroupModel
};