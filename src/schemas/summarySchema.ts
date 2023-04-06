import { Schema } from 'mongoose';


const SummarySchema = new Schema({
    title: { type: String, required: true },
    headers: [{
        value: { type: String, required: true },
        label: { type: String, required: true },
    }]
})

export {
    SummarySchema
};