const express = require('express')
const router = express.Router()
const Post = require('../models/post.js')
const User = require('../models/user.js')


router.get('/raw', async (req, res)=>{
    let posts = await Post.find({})
    res.send(posts)
})
//SEED

//INDEX
router.get('/', async (req, res)=>{
    let posts = await Post.find({})
    res.render('posts/index.ejs', {
        posts: posts
    })
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
    let author = await User.findById(post.author)
    res.render('posts/show.ejs', {
        post: post,
        author: author.username
    })
})

module.exports = router