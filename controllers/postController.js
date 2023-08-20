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
            body: 'Its a me!!',
            likes: 1,
            author: users[0]._id
        },
        {
            body: 'wahooo',
            likes: 2,
            author: users[0]._id
        },
        {
            body: 'waaaaaaaa',
            likes: 6,
            author: users[0]._id
        },
        {
            body: 'Im Batman',
            likes: 69,
            author: users[1]._id
        },
        {
            body: 'boom',
            likes: 12,
            author: users[1]._id
        },
        {
            body: 'I am Robiiiiin',
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
    let exists = await Profile.exists({author: req.session.userid})
    if (exists){
        let posts = await Post.find({})
        let profiles = await Profile.find({})
        let myProfile = await Profile.findOne({author: req.session.userid})
        res.render('posts/index.ejs', {
            posts: posts,
            profiles: profiles,
            myProfile: myProfile
        })
    } else {
        res.redirect('/profiles/new')
    }
    // res.send(posts)
    // res.send('posts!')
})

//NEW
router.get('/new', async (req, res)=>{
    res.render('posts/new.ejs')
})

//DELETE
router.delete('/:id', async(req,res)=>{
    let deleted = await Post.findByIdAndDelete(req.params.id)
    res.redirect('/posts')
})

//UPDATE
router.put('/:id', async (req, res)=>{
    if (req.body.comments){
        await Post.findByIdAndUpdate(req.params.id, {$push: {comments: req.body.comments}}, {new: true})
        let profile = await Profile.findOne({author: req.session.userid})
        let profId = profile._id.toHexString()
        await Post.findByIdAndUpdate(req.params.id, {$push: {commentAuthors: profId}}, {new: true})
        res.redirect(`/posts/${req.params.id}`)
    } else if (req.body.like){
        let profile = await Profile.findOne({author: req.session.userid})
        let profId = profile._id.toHexString()
        await Post.findByIdAndUpdate(req.params.id, {$push: {whoHasLiked: profId}}, {new: true})
        res.redirect(`/${req.body.page}`)
    } else if (req.body.unlike){
        let profile = await Profile.findOne({author: req.session.userid})
        let profId = profile._id.toHexString()
        await Post.findByIdAndUpdate(req.params.id, {$pull: {whoHasLiked: profId}}, {new: true})
        res.redirect(`/${req.body.page}`)
    } else {
        let post = await Post.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        res.redirect('/posts')
    }
    // if (req.body.body){
    //     post.body = req.body.body
    // }
    // if (req.body.likes){
    //     post.likes++
    // }
    // if (req.body.comments){
    //     post.comments.push(req.body.comments)
    // }
})

//CREATE
router.post('/', async (req, res)=>{
    req.body.author = req.session.userid
    let newPost = await Post.create(req.body)
    console.log(req.session.userid);
    res.redirect('/posts')
})

//EDIT
router.get('/:id/edit', async (req, res)=>{
    let post = await Post.findById(req.params.id)
    res.render('posts/edit.ejs', {
        post: post
    })
})

//SHOW
router.get('/:id', async (req, res)=>{
    let post = await Post.findById(req.params.id)
    let profile = await Profile.findOne({author: post.author})
    let myPost = profile.author==req.session.userid
    let myProfile = await Profile.findOne({author: req.session.userid})
    await post.populate('commentAuthors')
    let hasLikedList = []
    post.whoHasLiked.forEach(l=>{
        hasLikedList.push(l.toHexString())
    })
    let hasLiked = hasLikedList.includes(myProfile._id.toHexString())
    res.render('posts/show.ejs', {
        post: post,
        profile: profile,
        myPost: myPost,
        hasLiked: hasLiked
    })
})

module.exports = router