import { Model, Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import fetch from "node-fetch";
import util from 'util';
import { Constants } from '../constants';

const lifeExpectancySchema = new Schema({
  title: { type: String, required: true },
  label: { type: String, required: true },
  x: { type: Array, required: true }, //year
  y: { type: Array, required: true }, //life expectancy values
  color: { type: String, required: false },
})

const lifeExpectancyModel = mongoose.model("lifeExpectancy", lifeExpectancySchema);
const NAME = 'Life Expectancy';

async function initializeLifeExpectancy() {
  await lifeExpectancyModel.deleteMany({})
  var life_expectancy_api = "https://data.cdc.gov/resource/w9j2-ggv5.json";
  var docs: any = await fetch(life_expectancy_api).then(result => result.json());
  var message;

  try {

    var years = [];
    var life_expectancy_values = [];

    for (var i = 0; i < docs.length; i++) {
      if (docs[i].race === "All Races" && docs[i].sex === "Both Sexes" && (+docs[i].year) >= 1980) {
        years.push(docs[i].year);
        life_expectancy_values.push(docs[i].average_life_expectancy)
      }
    }
    var lifeExp = new lifeExpectancyModel({
      title: "Average Life Expectancy in US (1980-2018)",
      label: "Average Life Expectancy in the US",
      x: years,
      y: life_expectancy_values,
      color: 'rgba(51,255,82)'

    });
    await lifeExp.save();
    message = util.format(Constants.COLLECTION_UPDATE_SUCCESS_MESSAGE, NAME);
  } catch (err) {
    message = util.format(Constants.COLLECTION_UPDATE_ERROR_MESSAGE, NAME, err.message);
    console.log(err);
    console.log(err.message);
  }
  return message;
};

async function getLifeExpectancy() {
  return lifeExpectancyModel.find({}).then((document) => {
    return JSON.stringify(document);
  })
};

async function deleteLifeExpectancy() {
  return await lifeExpectancyModel.deleteMany({}).then(response => {
    return response
  });
};

export {
  initializeLifeExpectancy,
  getLifeExpectancy,
  deleteLifeExpectancy
};