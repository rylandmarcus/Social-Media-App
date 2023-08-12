const mongoose = require('../database/connection')

const profileSchema = new mongoose.Schema(
    {
        profPic: String,
        coverPhoto: String,
        firstName: String,
        lastName: String,
        author: {ref: 'User', type: mongoose.Schema.Types.ObjectId },
        posts: [{ref: 'Post', type: mongoose.Schema.Types.ObjectId }]
    },
    {timestamps: true}
)

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile