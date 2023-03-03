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

const stateModel = mongoose.model("user", stateSchema);



async function initializeStates() {
  // clear old data
  await stateModel.deleteMany({})
  // get population by state
  var life_span_api = "https://api.census.gov/data/2021/acs/acs1/profile?get=NAME,DP05_0001E&for=state:*";
  var docs = await fetch(life_span_api).then(result => result.json());
  // add state data to db
  try {
    for (var i = 0; i < docs.length; i++) {
      console.log(docs[i])
      const state = new stateModel({
        name: docs[i][0],
        population: docs[i][1],
        code: docs[i][2]
      });
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