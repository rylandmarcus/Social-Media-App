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
            profPic: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/MarioNSMBUDeluxe.png/220px-MarioNSMBUDeluxe.png',
            coverPhoto: 'https://images2.alphacoders.com/103/thumbbig-10370.webp',
            firstName: 'Mario',
            lastName: 'Bro',
            author: users[0]._id
        },
        {
            profPic: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2017_23/2033316/170610-crop-adam-west-batman-3-ew-1156a.jpg',
            coverPhoto: 'https://www.lego.com/cdn/cs/set/assets/blt72f320324040a35c/Batman.png',
            firstName: 'Bat',
            lastName: 'Man',
            author: users[1]._id
        },
        {
            profPic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdsUeRSB1K2KbD5v2lUh6USSDwG0e4fzL_uQ&usqp=CAU',
            coverPhoto: 'https://www.nicepng.com/png/detail/221-2218106_tumblr-superman-logo-robin-superhero-logo-logo-super.png',
            firstName: 'c first',
            lastName: 'c last',
            author: users[2]._id
        },
        {
            profPic: 'string',
            coverPhoto: 'string',
            firstName: 'd first',
            lastName: 'd last',
            author: users[3]._id
        },
        {
            profPic: 'string',
            coverPhoto: 'string',
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