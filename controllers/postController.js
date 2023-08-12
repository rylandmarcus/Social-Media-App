const express = require('express')
const router = express.Router()
const Post = require('../models/post.js')
const User = require('../models/user.js')
const Profile = require('../models/profile.js')

router.get('/raw', async (req, res)=>{
    let posts = await Post.find({})
    res.send(posts)
})
//SEED
router.get('/seed', async (req, res)=>{
    await Post.deleteMany({})
    let users = await User.find({})
    users = users.sort((a,b)=>a.username.localeCompare(b.username))
    const starterPosts = [
        {
            body: 'a stuff and things Im',
            likes: 1,
            author: users[0]._id
        },
        {
            body: 'a sasdfasdgs Im',
            likes: 2,
            author: users[0]._id
        },
        {
            body: 'a sboop bop Im',
            likes: 6,
            author: users[0]._id
        },
        {
            body: 'b  Im',
            likes: 69,
            author: users[1]._id
        },
        {
            body: 'b sshooooop Im',
            likes: 12,
            author: users[1]._id
        },
        {
            body: 'c is me',
            likes: 4,
            author: users[2]._id
        },
        {
            body: 'd wopp Im',
            likes: 5,
            author: users[3]._id
        },
        {
            body: 'd i am',
            likes: 8,
            author: users[3]._id
        },
        {
            body: 'f shoop a doop',
            likes: 7,
            author: users[4]._id
        },
    ]
    const createdPosts = await Post.create(starterPosts)
    res.json(createdPosts)
})

//INDEX
router.get('/', async (req, res)=>{
    let posts = await Post.find({})
    let profiles = await Profile.find({})
    // res.render('posts/index.ejs', {
    //     posts: posts,
    //     profiles: profiles
    // })
    res.send(posts)
    // res.send('posts!')
})

//NEW
router.get('/new', async (req, res)=>{
    res.render('posts/new.ejs')
})

//DELETE

//UPDATE

//CREATE
router.post('/', async (req, res)=>{
    req.body.author = req.session.userid
    let newPost = await Post.create(req.body)
    console.log(req.session.userid);
    res.redirect('/posts')
})

//EDIT

//SHOW
router.get('/:id', async (req, res)=>{
    let post = await Post.findById(req.params.id)
    let profiles = await Profile.find({})
    let author = profiles.find((prof)=>{
        return prof.author==post.author
    })
    console.log(profiles);
    console.log(author);
    // let author = await User.findById(post.author)
    res.render('posts/show.ejs', {
        post: post,
        author: author.firstName
    })
})

module.exports = router