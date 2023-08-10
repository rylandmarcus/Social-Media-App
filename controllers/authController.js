require('dotenv').config()
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)

router.get('/', (req, res)=>{
    res.render('home/home.ejs')
    // res.send('running')
})
router.get('/login', (req, res)=>{
    res.render('home/signin.ejs')
})

router.get('/signup', (req, res)=>{
    res.render('users/new.ejs')
})

router.post('/login', async (req, res)=>{
    let username = req.body.username
    let password = req.body.password
    const user = await User.findOne({username: username})
    bcrypt.compare(password, user.password).then(result=>{
        if (result){
            req.session.userid = user._id
            res.redirect('/site')
        } else{
            res.redirect('/login')
        }
    })
})

router.post('/users', (req, res)=>{
    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword)=>{
        req.body.password = hashedPassword
        const newUser = await User.create(req.body)
        res.redirect('/login')
    })
})

router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/')
})

module.exports = router