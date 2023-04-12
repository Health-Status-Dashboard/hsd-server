import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../../schemas/lineSchema';

const uninsuredByEducationModel = mongoose.model("uninsured_education_summary", LineDataSchema);

async function initializeUninsuredByEducationModel() {
  await uninsuredByEducationModel.deleteMany({})
  var uninsured_pop_api = "https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`=%27By%20Education%27";
  var docs: any = await fetch(uninsured_pop_api).then(result => result.json());

  try {
    var ListOfStats = [];

    //gets the most recent data at bottom
    for (var i = docs.length - 1; i >= 0; i--) {

      //format the education labels for the charts
      var educationLabel = docs[i].subgroup;
      if (educationLabel === "Less than a high school diploma") {
        educationLabel = "< High School";
      } else if (educationLabel === "High school diploma or GED") {
        educationLabel = "High School/GED";
      } else if (educationLabel === "Some college/Associate's degree") {
        educationLabel = "Some College/Associate's";
      } else if (educationLabel === "Bachelor's degree or higher") {
        educationLabel = "Bachelor's or higher";
      }


      if (docs[i].indicator === "Uninsured at the Time of Interview") {
        var stat = {
          label: educationLabel,
          data: [docs[i].value]
        };
        ListOfStats.unshift(stat);
      }

      if (ListOfStats.length === 4) {
        break;
      }
    }

    var popData = new uninsuredByEducationModel({
      title: "US Uninsured Rate by Education Level (% Uninsured)",
      labels: ["Education"],
      datasets: ListOfStats,

    })

    await popData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getUninsuredByEducationModel() {
  return uninsuredByEducationModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteUninsuredByEducationModel() {
  return await uninsuredByEducationModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeUninsuredByEducationModel,
  getUninsuredByEducationModel,
  deleteUninsuredByEducationModel
};