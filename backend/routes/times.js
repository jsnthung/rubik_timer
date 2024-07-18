const express = require('express')
const { createTime, getTimes, getTime, deleteTime, addPlusTwoPenalty, addDNF } = require('../controllers/timeController')

const router = express.Router()

// GET all recorded times
router.get('/', getTimes)

// GET one single recorded time
router.get('/:id', getTime)

// POST a new recorded time
router.post('/', createTime)

// DELETE a recorded time
router.delete('/:id', deleteTime)

// UPDATE a recorded time (add +2 seconds penalty)
router.patch('/:id/add-2secs', addPlusTwoPenalty)

// UPDATE a recorded time (DNF penalty)
router.patch('/:id/add-dnf', addDNF)

module.exports = router