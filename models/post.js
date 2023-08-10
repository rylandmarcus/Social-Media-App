const mongoose = require('../database/connection')

const postSchema = new mongoose.Schema(
    {
        body: String,
        likes: Number,
        comments: [String],
        image: String,
    },
    {timestamps: true}
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post

