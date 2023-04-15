import mongoose from 'mongoose';
import fetch from "node-fetch";
import { LineDataSchema } from '../../schemas/lineSchema';

const gdpHealthSpendingModel = mongoose.model("gdp_health_spending_summary", LineDataSchema);

async function initializegdpSpendingModel() {
  await gdpHealthSpendingModel.deleteMany({})
  var gdp_spending_api = "https://stats.oecd.org/SDMX-JSON/data/SHA/HFTOT.HCTOT.HPTOT.PARPIB.AUS+AUT+BEL+CAN+CHL+COL+CRI+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+NMEC+ALB+ARG+BRA+BGR+CHN+HRV+CYP+IND+MLT+MNE+MKD+PER+ROU+SRB+ZAF/all?startTime=2018&endTime=2021";
  var docs: any = await fetch(gdp_spending_api).then(result => result.json());

  
  try {
    var totalNames = docs.structure.dimensions.series[4].values;
    var countryNamesToDisplay = [];
    for (var i =0; i < totalNames.length; i++){
        countryNamesToDisplay.push(totalNames[i].name);
    }


    var gdp4YearSummary = docs.dataSets[0].series;
    var countryDataLists = Object.keys(gdp4YearSummary);
    var mapGDPValues = new Map();


    var totalGDP = [];
    for (var j=0; j < countryDataLists.length; j++){
        
        if (gdp4YearSummary[countryDataLists[j]].observations['3'] !== undefined){
            mapGDPValues.set(countryNamesToDisplay[j], gdp4YearSummary[countryDataLists[j]].observations['3'][0]);
            
            totalGDP.push(gdp4YearSummary[countryDataLists[j]].observations['3'][0]); //this is 2021 in our query
            
        }
        else if (gdp4YearSummary[countryDataLists[j]].observations['2'] !== undefined){
            mapGDPValues.set(countryNamesToDisplay[j], gdp4YearSummary[countryDataLists[j]].observations['2'][0]);

            totalGDP.push(gdp4YearSummary[countryDataLists[j]].observations['2'][0]); //this is 2020 in our query
       
        }
        else if (gdp4YearSummary[countryDataLists[j]].observations['1'] !== undefined){
            mapGDPValues.set(countryNamesToDisplay[j], gdp4YearSummary[countryDataLists[j]].observations['1'][0]);

            totalGDP.push(gdp4YearSummary[countryDataLists[j]].observations['1'][0]); //this is 2019 in our query
        
        }
        else if (gdp4YearSummary[countryDataLists[j]].observations['0'] !== undefined){
            mapGDPValues.set(countryNamesToDisplay[j], gdp4YearSummary[countryDataLists[j]].observations['0'][0]);

            totalGDP.push(gdp4YearSummary[countryDataLists[j]].observations['0'][0]); //this is 2018 in our query
        }
     }

    //sort the map values 
    var sortedMap = new Map([...mapGDPValues.entries()].sort((a, b) => a[1] - b[1]));
    var GDPValuesSorted = Array.from(sortedMap.values());
    var CountryNamesSorted = Array.from(sortedMap.keys());
      
    var gdpData = new gdpHealthSpendingModel({
        title: "Health Spending as %GDP- Country level",
        labels: CountryNamesSorted, 
        datasets: [{
                    label: '%GDP',
                    backgroundColor: 'rgba(16,44,76,0.3)',
                    borderColor: 'rgba(16,44,76,0.8)',
                    borderWidth: 0,
                    data: GDPValuesSorted
            }]
    })

    await gdpData.save();

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

async function getgdpSpendingModel() {
  return gdpHealthSpendingModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deletegdpSpendingModel() {
  return await gdpHealthSpendingModel.deleteMany({}).then(response => {
    return response
  });
};

export {
    initializegdpSpendingModel,
    getgdpSpendingModel,
    deletegdpSpendingModel
};