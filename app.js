const Get_Requests = require('./Request_Functions/Get_Requests')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const middleWare = require('./middleware/authenticationmiddleware')
const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'ejs')
app.set ('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: true })) // formdan gelen verileri okumak için

app.use(cookieParser())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.render('login')
})

app.get('/loginFail', (req, res) => {
    res.render('loginFail')
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/registerFail', (req, res) => {
    res.render('registerFail')
})

app.get('/dashboard', middleWare.authenticationToken, (req, res) => {
    const locals = {
        title : 'Dashboard',
        description : 'Welcome to the dashboard!'
    }
    res.render('dashboard', locals)
})

app.get('/books', middleWare.authenticationToken, (req, res) => {
    res.render('books')
})

app.get('/users', middleWare.authenticationToken, (req, res) => {
    res.render('users')
})

app.get('/userOperations', middleWare.authenticationToken, (req, res) => {
    res.render('userOperations')
})

app.get('/orderTracking', middleWare.authenticationToken, (req, res) => {
    res.render('orderTracking')
})

app.post('/authorization', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    Get_Requests.isUserExist(email, (err, result) => {
        if (err) throw err
        if(result){
            Get_Requests.checkPassword(email, password, (err, result) => {
                if(err) throw err
                if(result){
                    const token = jwt.sign({email}, 'rdj', {
                        expiresIn : "3h"
                    })
                    res.cookie("token", token)
                    console.log("Login successful!");
                    res.status(200).redirect('dashboard')
                }else{
                    console.log("Wrong password!");
                    res.render('loginFail', {errorMessage: 'Wrong password!'})
                }
            })
        }else{
            console.log("User not found!");
            const errorMessage = 'User not found!';
            res.render('loginFail', {errorMessage})
        }
    })
})

app.post('/submit', (req, res) => {
    const {name, surname, email, password} = req.body;
    var errorMessage = '';
    if(name === '' || surname === '' || email === '' || password === ''){
        console.log("Please fill all the fields!");
        errorMessage = 'Please fill all the fields!';
        res.render('registerFail', {errorMessage})
    }else{
        const flag =  Get_Requests.isUserExist(email, (err,result) => {
            if(err)
                throw err;
            if(result){
                console.log("User already exist!");
                errorMessage = 'User already exist!';
                res.render('registerFail', {errorMessage})
            }else{
                Get_Requests.addNewUser(name, surname, email, password);
                console.log("User added successfully!");
                res.status(200).send('User added successfully!')
            }
        })
    }  
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
