const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    image: { data: Buffer, contentType: String },
    date: {
        type: Date,
        default: Date.now,
      },
      
}, {
    timestamps: true,
    }
);
const Incident = mongoose.model("Incident", incidentSchema);
module.exports = Incident;