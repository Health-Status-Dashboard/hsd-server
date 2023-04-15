import mongoose from 'mongoose';
import fetch from "node-fetch";
import { SummarySchema } from '../../schemas/summarySchema';

const NumberMedicalGradsModel = mongoose.model("num_medical_graduates_summary", SummarySchema);

async function initializeNumberGraduatesModel() {
  await NumberMedicalGradsModel.deleteMany({})
  var num_med_grads_api = "https://stats.oecd.org:443/SDMX-JSON/data/HEALTH_REAC/HEDUMEGR+HEDUDNGR+HEDUPHGR+HEDUMWGR+HEDUNUGR+HEDUPNGR+HEDUAPGR.PERSMYNB+DENSPPNB+PEREMPNB+PHYTOTNB+PHYU35NB+PHY344NB+PHY454NB+PHY564NB+PHYT65NB+PHYT75NB+MILBIRNB+PERMEDNB+FTEEMPEF+DENSEFEF+PTHEMPNB+PFHEMPEF+NOMBRENB+PERPHYNB+YSALARMT+YSALXRMT+YSALVCMT+YSALGDMT+YSALAWMT+YSALPIMT+YSELFPMB+YSEFXRMB+YSELVCMT+YSEFGDMB+YSEFAWMT+YSEFPIMT+NBMILPNB+LTCOVRNB+RTOINPNB+RTOALLNB.USA/all?startTime=2018&endTime=2021";
  var docs: any = await fetch(num_med_grads_api).then(result => result.json());
  
  try {

    var usMedicalGrads = docs.dataSets[0].series["0:0:0"].observations['3'][0]; //recent data 2021
    var usDentalGrads = docs.dataSets[0].series["1:0:0"].observations['2'][0]; //most recent data 2020
    var usPharmGrads = docs.dataSets[0].series["2:0:0"].observations['2'][0];
    var usMidwifeGrads = docs.dataSets[0].series["3:0:0"].observations['2'][0];
    var usNursingGrads = docs.dataSets[0].series["4:0:0"].observations['2'][0];
    var usProfNursingGrads = docs.dataSets[0].series["5:0:0"].observations['2'][0];
    var usAssoNursingGrads = docs.dataSets[0].series["6:0:0"].observations['2'][0];


    var doctorsModel = new NumberMedicalGradsModel({
        title: "Number of Doctors in the US",
        headers : [{
            value: usMedicalGrads.toString(),
            label: "Number of Doctor graduates in the US"
        },
        {
            value: usDentalGrads.toString(),
            label: "Number of Dentist graduates in the US"
        },
        {
            value: usPharmGrads.toString(),
            label: "Number of Pharmacist graduates in the US"
        },
        {
            value: usMidwifeGrads.toString(),
            label: "Number of Midwife graduates in the US"
        },
        {
            value: usNursingGrads.toString(),
            label: "Number of Nursing graduates in the US"
        },
        {
            value: usProfNursingGrads.toString(),
            label: "Number of Professional Nursing graduates in the US"
        },
        {
            value: usAssoNursingGrads.toString(),
            label: "Number of Associate Professional Nursing graduates in the US"
        },
    ]
    })

    await doctorsModel.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getNumberGraduatesModel() {
  return NumberMedicalGradsModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteNumberGraduatesModel() {
  return await NumberMedicalGradsModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeNumberGraduatesModel,
    getNumberGraduatesModel,
    deleteNumberGraduatesModel
};