const express = require('express')
const router = express.Router()
const Post = require('../models/post.js')

//SEED

//INDEX
router.get('/', (req, res)=>{
    res.send('posts!')
})

//NEW
//DELETE
//UPDATE
//CREATE
//EDIT
//SHOW

module.exports = router