import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../../schemas/lineSchema';

const recentYearDCModel = mongoose.model("recent_year_death_causes", LineDataSchema);

async function initializeRecentYearDCModel() {
  await recentYearDCModel.deleteMany({})
  var recent_year_dc_api = "https://data.cdc.gov/resource/489q-934x.json?year_and_quarter=2022%20Q3&rate_type=Crude&time_period=12%20months%20ending%20with%20quarter";
  var docs: any = await fetch(recent_year_dc_api).then(result => result.json());
  
  try {

    var death_datasets = docs;

    var dataModel = new recentYearDCModel({
      title: "All death cause data",
      labels: ["death cause data- all"],
      datasets: [{
        label: "all death cause data",
        data: death_datasets, //since use string parsing for charts in front end, save data like this
      }]
    })
    await dataModel.save();


  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};



async function getRecentYearDCModel() {
  return recentYearDCModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function getRecentYearDCModelAllCauses() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "All causes"
    });

    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelAlzheimer() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Alzheimer disease"
    });
    return JSON.stringify(obj);
  })
};
async function getRecentYearDCModelCovid19() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "COVID-19"
    });
    return JSON.stringify(obj);
  })
};
async function getRecentYearDCModelCancer() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Cancer"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelLiver() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Chronic liver disease and cirrhosis"
    });
    return JSON.stringify(obj);
  })
};
async function getRecentYearDCModelRespiratory() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Chronic lower respiratory diseases"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelDiabetes() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Diabetes"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelHeart() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Heart disease"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelHIV() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "HIV disease"
    });
    return JSON.stringify(obj);
  })
};
async function getRecentYearDCModelHypertension() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Hypertension"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelFluPneum() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Influenza and pneumonia"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelKidney() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Kidney disease"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelParkinsons() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Parkinson disease"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelPneumonionitis() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Pneumonitis due to solids and liquids"
    });
    return JSON.stringify(obj);
  })
};

async function getRecentYearDCModelSepticimia() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Septicemia"
    });
    return JSON.stringify(obj);
  })
};


async function getRecentYearDCModelStroke() {
  return recentYearDCModel.find({}).then((document) => {
    var obj = document[0].datasets[0].data.find(obj => {
      return obj.cause_of_death === "Stroke"
    });
    return JSON.stringify(obj);
  })
};


async function deleteRecentYearDCModel() {
  return await recentYearDCModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeRecentYearDCModel,
    getRecentYearDCModel,
    deleteRecentYearDCModel,
    getRecentYearDCModelAllCauses,
    getRecentYearDCModelAlzheimer,
    getRecentYearDCModelCovid19,
    getRecentYearDCModelCancer,
    getRecentYearDCModelLiver,
    getRecentYearDCModelRespiratory,
    getRecentYearDCModelDiabetes,
    getRecentYearDCModelHeart,
    getRecentYearDCModelHIV, 
    getRecentYearDCModelHypertension,
    getRecentYearDCModelFluPneum,
    getRecentYearDCModelKidney,
    getRecentYearDCModelParkinsons,
    getRecentYearDCModelPneumonionitis,
    getRecentYearDCModelSepticimia,
    getRecentYearDCModelStroke


};


