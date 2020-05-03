const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
})

router.post('/', (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
})

module.export = router