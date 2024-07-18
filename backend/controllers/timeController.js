const Time = require('../models/timeModel')
const mongoose = require('mongoose')

// get all recorded times
const getTimes = async (req, res) => {
    const times = await Time.find({}).sort({createdAt: -1})

    res.status(200).json(times)
}

// get a single recorded time
const getTime = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such solve'})
    }

    const time = await Time.findById(id)

    if (!time) {
        return res.status(404).json({error: 'No such solve'})
    }

    res.status(200).json(time)
}

// create a new time
const createTime = async (req, res) => {
    const {duration, scramble, plusTwo, dnf} = req.body

    // add new entry to db
    try {
        const time = await Time.create({duration, scramble, plusTwo, dnf})
        res.status(200).json(time)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a recorded time
const deleteTime = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such solve'})
    }

    const time = await Time.findOneAndDelete({_id: id})

    if (!time) {
        return res.status(400).json({error: 'No such solve'})
    }

    res.status(200).json(time)
}

// add +2 penalty to a recorded time
const addPlusTwoPenalty = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such solve'})
    }

    const time = await Time.findOneAndUpdate({_id: id}, {
        plusTwo: true
    })

    if (!time) {
        return res.status(400).json({error: 'No such solve'})
    }

    res.status(200).json(time)
}

// add DNF penalty to a recorded time
const addDNF = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such solve'})
    }

    const time = await Time.findOneAndUpdate({_id: id}, {
        dnf: true
    })

    if (!time) {
        return res.status(400).json({error: 'No such solve'})
    }

    res.status(200).json(time)
}

module.exports = {
    getTimes,
    getTime,
    createTime,
    deleteTime,
    addPlusTwoPenalty,
    addDNF
}