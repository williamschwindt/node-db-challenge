const express = require('express')
const db = require('../data/config');

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const tasks = await db('tasks')
        res.json(tasks)

    } catch(err) {
        next(err)
    }
})

module.exports = router