import { Schema } from 'mongoose';


//line fields shown here: https://www.chartjs.org/docs/latest/charts/line.html 
const LineDataSchema = new Schema({
    title: {type: String, required: true },
    labels: {type: Array<string>, required: true },
    datasets: [{
        label: {type: String, required: true },
        data: { type: Array<number>, required: true },
        //fill: {type: Boolean, required: true }, 
        //borderColor: {type: String, required: true }, 
        //tension: { type: Number, required: true }, 
    }] 
})

export {
    LineDataSchema
  };