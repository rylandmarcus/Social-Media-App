const mongoose = require('../database/connection')

const postSchema = new mongoose.Schema(
    {
        body: String,
        likes: Number,
        comments: [String],
        image: String,
        author: {ref: 'User', type: mongoose.Schema.Types.ObjectId }
    },
    {timestamps: true}
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post

