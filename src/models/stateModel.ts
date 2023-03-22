import { Model, Schema, model } from 'mongoose';
import mongoose from 'mongoose';
/* 


We could use all this if we wanted instance methods


// Create an interface representing a document in MongoDB
interface IState {
  name: string;
  population: string;
  code: string;
}

// Put all user instance methods in this interface
interface IStateMethods {
  initializeStates(): void;
  getStates(): string;
}

// Create a new Model type that knows about IUserMethods
type State = Model<IState, {}, IStateMethods>;

// Create a Model
//const State = Model<IState>('State', stateSchema);

// Create a Schema corresponding to the document interface
export const stateSchema = new Schema<IState, State, IStateMethods>({
  name: { type: String, required: true },
  population: { type: String, required: true },
  code: { type: String, required: true }
});
*/

const stateSchema = new Schema({
  name: { type: String, required: true },
  population: { type: String, required: true },
  code: { type: String, required: true }
})

const stateModel = mongoose.model("state", stateSchema);



async function initializeStates() {
  // clear old data
  await stateModel.deleteMany({})
  // get population by state
  console.log("here")
  //var life_span_api = "https://api.census.gov/data/2021/acs/acs1/profile?get=NAME,DP05_0001E&for=state:*";
  var docs = [{ "_id": "641a35b8d633ceef3447fc95", "name": "NAME", "population": "DP05_0001E", "code": "state", "__v": 0 }, { "_id": "641a35b8d633ceef3447fc97", "name": "Alabama", "population": "5039877", "code": "01", "__v": 0 }, { "_id": "641a35b8d633ceef3447fc99", "name": "Puerto Rico", "population": "3263584", "code": "72", "__v": 0 }, { "_id": "641a35b8d633ceef3447fc9b", "name": "Arizona", "population": "7276316", "code": "04", "__v": 0 }, { "_id": "641a35b8d633ceef3447fc9d", "name": "Arkansas", "population": "3025891", "code": "05", "__v": 0 }, { "_id": "641a35b8d633ceef3447fc9f", "name": "California", "population": "39237836", "code": "06", "__v": 0 }, { "_id": "641a35b8d633ceef3447fca1", "name": "Colorado", "population": "5812069", "code": "08", "__v": 0 }, { "_id": "641a35b8d633ceef3447fca3", "name": "Connecticut", "population": "3605597", "code": "09", "__v": 0 }, { "_id": "641a35b8d633ceef3447fca5", "name": "Delaware", "population": "1003384", "code": "10", "__v": 0 }, { "_id": "641a35b8d633ceef3447fca7", "name": "District of Columbia", "population": "670050", "code": "11", "__v": 0 }, { "_id": "641a35b8d633ceef3447fca9", "name": "Florida", "population": "21781128", "code": "12", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcab", "name": "Georgia", "population": "10799566", "code": "13", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcad", "name": "Hawaii", "population": "1441553", "code": "15", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcaf", "name": "Idaho", "population": "1900923", "code": "16", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcb1", "name": "Illinois", "population": "12671469", "code": "17", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcb3", "name": "Indiana", "population": "6805985", "code": "18", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcb5", "name": "Iowa", "population": "3193079", "code": "19", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcb7", "name": "Kansas", "population": "2934582", "code": "20", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcb9", "name": "Kentucky", "population": "4509394", "code": "21", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcbb", "name": "Louisiana", "population": "4624047", "code": "22", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcbd", "name": "Maine", "population": "1372247", "code": "23", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcbf", "name": "Maryland", "population": "6165129", "code": "24", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcc1", "name": "Massachusetts", "population": "6984723", "code": "25", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcc3", "name": "Michigan", "population": "10050811", "code": "26", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcc5", "name": "Minnesota", "population": "5707390", "code": "27", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcc7", "name": "Mississippi", "population": "2949965", "code": "28", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcc9", "name": "Missouri", "population": "6168187", "code": "29", "__v": 0 }, { "_id": "641a35b8d633ceef3447fccb", "name": "Montana", "population": "1104271", "code": "30", "__v": 0 }, { "_id": "641a35b8d633ceef3447fccd", "name": "Nebraska", "population": "1963692", "code": "31", "__v": 0 }, { "_id": "641a35b8d633ceef3447fccf", "name": "Nevada", "population": "3143991", "code": "32", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcd1", "name": "New Hampshire", "population": "1388992", "code": "33", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcd3", "name": "New Jersey", "population": "9267130", "code": "34", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcd5", "name": "New Mexico", "population": "2115877", "code": "35", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcd7", "name": "New York", "population": "19835913", "code": "36", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcd9", "name": "North Carolina", "population": "10551162", "code": "37", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcdb", "name": "North Dakota", "population": "774948", "code": "38", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcdd", "name": "Ohio", "population": "11780017", "code": "39", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcdf", "name": "Oklahoma", "population": "3986639", "code": "40", "__v": 0 }, { "_id": "641a35b8d633ceef3447fce1", "name": "Oregon", "population": "4246155", "code": "41", "__v": 0 }, { "_id": "641a35b8d633ceef3447fce3", "name": "Pennsylvania", "population": "12964056", "code": "42", "__v": 0 }, { "_id": "641a35b8d633ceef3447fce5", "name": "Rhode Island", "population": "1095610", "code": "44", "__v": 0 }, { "_id": "641a35b8d633ceef3447fce7", "name": "South Carolina", "population": "5190705", "code": "45", "__v": 0 }, { "_id": "641a35b8d633ceef3447fce9", "name": "South Dakota", "population": "895376", "code": "46", "__v": 0 }, { "_id": "641a35b8d633ceef3447fceb", "name": "Tennessee", "population": "6975218", "code": "47", "__v": 0 }, { "_id": "641a35b8d633ceef3447fced", "name": "Texas", "population": "29527941", "code": "48", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcef", "name": "Utah", "population": "3337975", "code": "49", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcf1", "name": "Vermont", "population": "645570", "code": "50", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcf3", "name": "Virginia", "population": "8642274", "code": "51", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcf5", "name": "Washington", "population": "7738692", "code": "53", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcf7", "name": "West Virginia", "population": "1782959", "code": "54", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcf9", "name": "Wisconsin", "population": "5895908", "code": "55", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcfb", "name": "Wyoming", "population": "578803", "code": "56", "__v": 0 }, { "_id": "641a35b8d633ceef3447fcfd", "name": "Alaska", "population": "732673", "code": "02", "__v": 0 }];
  // add state data to db
  try {
    for (var i = 0; i < docs.length; i++) {
      console.log(docs[i])
      console.log(docs[i].name)
      console.log(docs[i].population)
      var state = new stateModel({
        name: docs[i].name,
        population: docs[i].population,
        code: docs[i].code
      });
      console.log(state)
      await state.save();
    }
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};


async function getStates() {
  return stateModel.find({}).then((document) => {
    return JSON.stringify(document);
  });
}



export {
  initializeStates,
  getStates
};