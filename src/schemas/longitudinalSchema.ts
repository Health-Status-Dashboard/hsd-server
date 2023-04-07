import { Schema } from 'mongoose';

const LongitudinalSchema = new Schema({
    title: { type: String, required: true },
    labels: { type: Array<String>, required: true },
    datasets: [{
        label: { type: String, required: true },
        data: { type: Array<Number>, required: true },
        backgroundColor: { type: String, required: false },
        borderColor: { type: String, required: false },
        borderWidth: { type: Number, required: false },
    }]
})

export {
    LongitudinalSchema
};