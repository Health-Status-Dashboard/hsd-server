import { Schema } from 'mongoose';


const StatSchema = new Schema({
    title: {type: String, required: true },
    stats: [{
        value: {},
        label: {type: String, required: true },
    }] 
})

export {
    StatSchema
  };