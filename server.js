require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const methodoverride = require('method-override')
const session = require('express-session')
const bcrypt = require('bcrypt')
const expressEjsLayouts = require('express-ejs-layouts')
const saltRounds = parseInt(process.env.SALT_ROUNDS)
const PORT = process.env.PORT
const secret = process.env.SECRET
const User = require('./models/user.js')
const Post = require('./models/post.js')
const postController = require('./controllers/postController.js')
const authController = require('./controllers/authController.js')

//MIDDLEWARE
app.use(session({secret: secret, cookie:{maxAge: 60000}})) 
//dont forget to move the secret to env
//also, how long do you want session to last
//3600000 is an hour
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodoverride('_method'))
app.use(morgan('tiny'))
app.use(express.static('public'))

//ROUTES
app.use(authController)

//AFTER HERE MUST BE SIGNED IN
app.use((req, res, next)=>{
    if (!req.session.userid) {
        res.send('please log in: <a href="/login">Log In</a>')
        return
    }
    next()
})

//Routes Once Logged In
app.use('/posts', postController)

app.get('/site', async (req, res)=>{
    console.log(req.session.userid);
    let username = await User.findOne({_id: req.session.userid})
    console.log(username);
    console.log(username.username);
    res.send(`welcome to the site ${username.username} <a href="/logout">Log out</a>`)
})

//Server Listener
app.listen(PORT, ()=>{
    console.log(`running on port: ${PORT}`)
})