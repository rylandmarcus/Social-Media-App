const express = require('express')
const router = express.Router()
const Post = require('../models/post.js')
const User = require('../models/user.js')
const Profile = require('../models/profile.js')

//SEED
router.get('/seed', async (req, res)=>{
    await Profile.deleteMany({})
    let users = await User.find({})
    users = users.sort((a,b)=>a.username.localeCompare(b.username))
    const starterProfiles = [
        {
            profPic: 'String',
            coverPhoto: 'String',
            firstName: 'a first',
            lastName: 'a last',
            author: users[0]._id
        },
        {
            profPic: 'String',
            coverPhoto: 'String',
            firstName: 'b first',
            lastName: 'b last',
            author: users[1]._id
        },
        {
            profPic: 'String',
            coverPhoto: 'String',
            firstName: 'c first',
            lastName: 'c last',
            author: users[2]._id
        },
        {
            profPic: 'String',
            coverPhoto: 'String',
            firstName: 'd first',
            lastName: 'd last',
            author: users[3]._id
        },
        {
            profPic: 'String',
            coverPhoto: 'String',
            firstName: 'f first',
            lastName: 'f last',
            author: users[4]._id
        },
    ]
    const createdProfiles = await Profile.create(starterProfiles)
    res.redirect('/posts/seed')
})

//INDEX
router.get('/', async (req, res)=>{
    let profiles = await Profile.find({})
    let myProfile = await Profile.findOne({author: req.session.userid})
    res.render('profiles/index.ejs', {
        myProfile: myProfile,
        profiles: profiles
    })
})

//NEW
router.get('/new', (req, res)=>{
    res.render('profiles/new.ejs')
})

//DELETE

//UPDATE

//CREATE
router.post('/', async (req, res)=>{
    // req.body.author = await User.findById(req.session.id)
    let author = req.session.userid
    let newProfile = req.body
    newProfile.author = author
    console.log(req.body);
    console.log(req.session.userid);
    await Profile.create(newProfile)
    res.redirect('/profiles')
})

//EDIT

//SHOW
router.get('/:id', async (req, res)=>{
    let profile = await Profile.findById(req.params.id)
    let posts = await Post.find({author: profile.author})
    let myProf
    if (req.session.userid==profile.author){
        myProf=true
    } else{
        myProf=false
    }
    console.log(posts);
    res.render('profiles/show.ejs', {
        profile: profile,
        posts: posts,
        myProf: myProf
    })
})

module.exports = router