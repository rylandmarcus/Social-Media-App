const mongoose = require('../database/connection')

const postSchema = new mongoose.Schema(
    {
        body: String,
        likes: {type: Number, default:0},
        whoHasLiked: [{ref: 'Profile', type: mongoose.Schema.Types.ObjectId }],
        comments: [String],
        commentAuthors: [{ref: 'Profile', type: mongoose.Schema.Types.ObjectId }],
        image: String,
        author: {ref: 'User', type: mongoose.Schema.Types.ObjectId }
    },
    {timestamps: true}
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post