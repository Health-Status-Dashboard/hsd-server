import { Schema } from 'mongoose';


const StatSchema = new Schema({
    title: { type: String, required: true },
    stats: [{
        value: { type: Number, required: true },
        label: { type: String, required: true },
    }]
})

export {
    StatSchema
};