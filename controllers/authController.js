require('dotenv').config()
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)
let aPassword = process.env.ASEED
let bPassword = process.env.BSEED
let cPassword = process.env.CSEED
let dPassword = process.env.DSEED
let fPassword = process.env.FSEED

router.get('/users/seed', async (req, res)=>{
    await User.deleteMany({})
    let seedPasswords = [aPassword, bPassword, cPassword, dPassword, fPassword]

    let seedScrambledPasswords = []
    // await seedPasswords.forEach(async (pass)=>{
    //     await bcrypt.hash(pass, saltRounds, async (err, hashedPassword)=>{
    //         let scramble = await hashedPassword
    //         console.log(scramble);
    //         await seedScrambledPasswords.push(scramble)
    //     })
    // })
    // await console.log(seedScrambledPasswords);
    // console.log(seedScrambledPasswords[0]);

    for (const pass of seedPasswords) {
        const hashedPassword = await bcrypt.hash(pass, saltRounds);
        seedScrambledPasswords.push(hashedPassword);
    }

    const starterUsers = [
        {username: 'a', password: seedScrambledPasswords[0]},
        {username: 'b', password: seedScrambledPasswords[1]},
        {username: 'c', password: seedScrambledPasswords[2]},
        {username: 'd', password: seedScrambledPasswords[3]},
        {username: 'f', password: seedScrambledPasswords[4]}
    ]
    const createdUsers = await User.create(starterUsers)
    res.redirect('/profiles/seed')
})

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
            res.redirect('/posts')
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