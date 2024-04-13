const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Accident', 'Fighting', 'Rioting'],
        required: true
    },
    image: {
        type: String, // Assuming storing image URLs
        required: false 
    }
}, {
    timestamps: true 
});

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
