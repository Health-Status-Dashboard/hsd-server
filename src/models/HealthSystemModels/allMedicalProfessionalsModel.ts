import mongoose from 'mongoose';
import fetch from "node-fetch";
import {ProportionalSchema} from '../../schemas/proportionalSchema';

const NumberMedicalProfessionalsModel = mongoose.model("num_med_professionals", ProportionalSchema);

async function initializeNumberProfessionalsModel() {
  await NumberMedicalProfessionalsModel.deleteMany({})
  var gdp_spending_api = "https://stats.oecd.org:443/SDMX-JSON/data/HEALTH_REAC/PAGGTOPY+EMPLGENE+EMPLPEDI+EMPLGYNE+EMPLPSYS+EMPLSPEC+EMPLSURG+MINUNULP+MINULPPN+MINULPAP+CARECPRA+DNSTPADN+PHSTPAPH+PSIOPHTH+EMPLOTSP+EMPLGENP+EMPLOTGP+EMPLSPMP.PERSMYNB+DENSPPNB+PEREMPNB+PHYTOTNB+PHYU35NB+PHY344NB+PHY454NB+PHY564NB+PHYT65NB+PHYT75NB+MILBIRNB+PERMEDNB+FTEEMPEF+DENSEFEF+PTHEMPNB+PFHEMPEF+NOMBRENB+PERPHYNB+YSALARMT+YSALXRMT+YSALVCMT+YSALGDMT+YSALAWMT+YSALPIMT+YSELFPMB+YSEFXRMB+YSELVCMT+YSEFGDMB+YSEFAWMT+YSEFPIMT+NBMILPNB+LTCOVRNB+RTOINPNB+RTOALLNB.USA/all?startTime=2018&endTime=2021";
  var docs: any = await fetch(gdp_spending_api).then(result => result.json());


  
  try {
    var numberProfessionals = [
        docs.dataSets[0].series["0:0:0"].observations['1'][0],
        docs.dataSets[0].series["1:0:0"].observations['1'][0],
        docs.dataSets[0].series["2:0:0"].observations['1'][0],
        docs.dataSets[0].series["3:0:0"].observations['1'][0],
        docs.dataSets[0].series["4:0:0"].observations['1'][0],
        docs.dataSets[0].series["5:0:0"].observations['1'][0],
        docs.dataSets[0].series["6:0:0"].observations['1'][0],
        docs.dataSets[0].series["7:0:0"].observations['3'][0],
        docs.dataSets[0].series["8:0:0"].observations['3'][0],
        docs.dataSets[0].series["9:0:0"].observations['3'][0],
        docs.dataSets[0].series["10:0:0"].observations['2'][0],
        docs.dataSets[0].series["11:0:0"].observations['3'][0],
        docs.dataSets[0].series["12:0:0"].observations['2'][0],
        docs.dataSets[0].series["13:0:0"].observations['2'][0],
        docs.dataSets[0].series["14:0:0"].observations['1'][0],
        docs.dataSets[0].series["15:0:0"].observations['1'][0],
        docs.dataSets[0].series["16:0:0"].observations['1'][0],
        docs.dataSets[0].series["17:0:0"].observations['1'][0],
    ]


    var unsortedMap= new Map();
    var professionalList = docs.structure.dimensions.series[0].values;
    for (var i = 0; i < professionalList.length; i++){
        unsortedMap.set(
            docs.structure.dimensions.series[0].values[i].name, (numberProfessionals[i]).toString()
        )
    }

    var sortedMap = new Map([...unsortedMap.entries()].sort((a, b) => b[1] - a[1]));
    var ProfValuesSorted = Array.from(sortedMap.values());
    var ProfNamesSorted = Array.from(sortedMap.keys());

    var doctorsModel = new NumberMedicalProfessionalsModel({
        title: "Number of Doctors in the US",
        labels: ProfNamesSorted,
        datasets: [{
            label: "Number of medical professionals in the US",
            data: ProfValuesSorted,
        }]
    })
    await doctorsModel.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getNumberProfessionalsModel() {
  return NumberMedicalProfessionalsModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteNumberProfessionalsModel() {
  return await NumberMedicalProfessionalsModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializeNumberProfessionalsModel,
    getNumberProfessionalsModel,
    deleteNumberProfessionalsModel
};