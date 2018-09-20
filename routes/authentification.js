const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')


router.post('/login', (req, res, next) => {
    const {username, password} = req.body
    console.log(username, password);
    if (username ==='' || password === '') {
        res.render("index", {
            errorMessage : 'Indicate a username and a password to sign in'
        });
        return
    }
    res.render('authentification/login')
})

router.post('/register', (req, res, next) => {
    const {username, password, email} = req.body
    console.log(username, password, email)
    if (username === '' || password === '' || email ===' ') {
        res.render('index', {
            errorMessages : 'Indicate an username, email and password to login'
        })
        return
    }
    res.render('authentification/register')
})
module.exports = router;