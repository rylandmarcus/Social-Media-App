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
const User = require('./models/user.js')

//MIDDLEWARE
app.use(session({secret: 'password', cookie:{maxAge: 60000}})) 
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
app.get('/', (req, res)=>{
    res.render('home/home.ejs')
    // res.send('running')
})
app.get('/login', (req, res)=>{
    res.render('home/signin.ejs')
})

app.get('/signup', (req, res)=>{
    res.render('users/new.ejs')
})

app.post('/login', async (req, res)=>{
    let username = req.body.username
    let password = req.body.password
    const user = await User.findOne({username: username})
    bcrypt.compare(password, user.password).then(result=>{
        if (result){
            req.session.userid = user._id
            res.redirect('/site')
        } else{
            res.redirect('/login')
        }
    })
})

app.post('/users', (req, res)=>{
    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword)=>{
        req.body.password = hashedPassword
        const newUser = await User.create(req.body)
        res.redirect('/login')
    })
})

app.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/')
})

//AFTER HERE MUST BE SIGNED IN
app.use((req, res, next)=>{
    if (!req.session.userid) {
        res.send('please log in: <a href="/login">Log In</a>')
        return
    }
    next()
})

app.get('/site', async (req, res)=>{
    console.log(req.session.userid);
    let username = await User.findOne({_id: req.session.userid})
    console.log(username);
    console.log(username.username);
    res.send(`welcome to the site <a href="/logout">Log out</a>`)
})

//Server Listener
app.listen(PORT, ()=>{
    console.log(`running on port: ${PORT}`)
})