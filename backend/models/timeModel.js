const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const timeSchema = new Schema({
    duration: {
        type: String,
        required: true
    },
    scramble: {
        type: String,
        required: true
    },
    plusTwo: {
        type: Boolean,
        required: true
    },
    dnf: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Time', timeSchema)