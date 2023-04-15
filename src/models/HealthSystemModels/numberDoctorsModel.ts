import mongoose from 'mongoose';
import fetch from "node-fetch";
import { SummarySchema } from '../../schemas/summarySchema';

const NumberDoctorsModel = mongoose.model("num_doctors_summary", SummarySchema);

async function initializeNumberDoctorsModel() {
  await NumberDoctorsModel.deleteMany({})
  var num_docs_api = "https://stats.oecd.org/SDMX-JSON/data/HEALTH_REAC/PAGGTOPY+PAGGHOMM+PAGGFEMM.PERSMYNB+DENSPPNB+PEREMPNB+PHYTOTNB+PHYU35NB+PHY344NB+PHY454NB+PHY564NB+PHYT65NB+PHYT75NB+MILBIRNB+PERMEDNB+FTEEMPEF+DENSEFEF+PTHEMPNB+PFHEMPEF+NOMBRENB+PERPHYNB+YSALARMT+YSALXRMT+YSALVCMT+YSALGDMT+YSALAWMT+YSALPIMT+YSELFPMB+YSEFXRMB+YSELVCMT+YSEFGDMB+YSEFAWMT+YSEFPIMT+NBMILPNB+LTCOVRNB+RTOINPNB+RTOALLNB.USA/all?startTime=2018&endTime=2021";
  var docs: any = await fetch(num_docs_api).then(result => result.json());
  
  try {
    var usFemaleDoctorsCount = docs.dataSets[0].series["0:0:0"].observations['0'][0];
    var usMaleDoctorsCount = docs.dataSets[0].series["1:0:0"].observations['0'][0];
    var usTotalDoctorsCount = docs.dataSets[0].series["2:0:0"].observations['0'][0];

    var doctorsModel = new NumberDoctorsModel({
        title: "Number of Doctors in the US",
        headers : [{
            value: usFemaleDoctorsCount.toString(),
            label: "Number of Female Doctors in the US"
        },
        {
            value: usMaleDoctorsCount.toString(),
            label: "Number of Male Doctors in the US"
        },
        {
            value: usTotalDoctorsCount.toString(),
            label: "Number of Total Doctors in the US"
        },
    ]
    })

    await doctorsModel.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getNumberDoctorsModel() {
  return NumberDoctorsModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteNumberDoctorsModel() {
  return await NumberDoctorsModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeNumberDoctorsModel,
    getNumberDoctorsModel,
    deleteNumberDoctorsModel
};