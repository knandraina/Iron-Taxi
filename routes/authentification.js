const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')


router.get('/login', (req, res, next) => {
    res.render('authentification/login')
})

module.exports = router;