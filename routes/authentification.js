const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')


router.post('/login', (req, res, next) => {
    const {username, password} = req.body
    console.log(username, password);
    if (username ==='' || password === '') {
        res.render("index", {
            errorMessage : 'Indicate a username and a password to sign up'
        });
        return
    }
    res.render('authentification/login')
})

router.get('/register', (req, res, next) => {
    res.render('authentification/register')
})

module.exports = router;