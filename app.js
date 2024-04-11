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


app.get('/members', middleWare.authenticationToken,  (req, res)  => {
    const query_email = req.email.email;
    // console.log(query_email);
    const locals = {
        title : 'Members',
        description : 'Welcome to the dashboard!',
        // activeUserName : req.uye_adi, // Assuming you have a middleware that sets the authenticated user in the request object
    }
    Get_Requests.getUyeByMail(query_email, (err, uye) => {
        Get_Requests.getUyeAllList((err, result) => {
            if (err) {
                // Hata varsa, hatayı konsola yazdırın veya uygun bir şekilde işleyin
                console.error("Veritabanı hatası: ", err);
                res.status(500).send("Veritabanı hatası");
            } else {
                // Hata yoksa, dashboard şablonunu render edin ve sonucu iletilen veriyle birlikte gönderin
                res.render('members', { activeUser: uye, result, locals}); 
            }
        });
        
        
    });
 
})

app.get('/books', middleWare.authenticationToken, (req, res) => {
    const query_email = req.email.email;
    const locals = {
        title : 'Books'
    }
    Get_Requests.getUyeByMail(query_email, (err, uye) => {
        Get_Requests.getKitaplarAllList((err, result) => {
            if (err) {
                // Hata varsa, hatayı konsola yazdırın veya uygun bir şekilde işleyin
                console.error("Veritabanı hatası: ", err);
                res.status(500).send("Veritabanı hatası");
            } else {
                // Hata yoksa, books şablonunu render edin ve sonucu iletilen veriyle birlikte gönderin
                res.render('books', { activeUser: uye, book: result, locals}); 
            }
        });
    })
})

app.get('/getBooks', (req, res) => {
    const selectedQuery = req.body.selectedQuery
    if(selectedQuery.toLowerCase() === 'default'){
        const data = Get_Requests.getKategoriAllList((err, result) => {
            if(err) res.status(500).send('Interval server error')
            else
                res.json(result)
        })
    }
    else{
        const data = Get_Requests.getKitaplarBySelectedQuery(selectedQuery, (err, result) => {
            if(err) res.status(500).send('Interval server error')
            else
                res.json(result)
        })
    }
    
     



})

app.post('/deleteBook/:id', middleWare.authenticationToken, (req, res) => {
    const query_email = req.email.email;
    const id = parseInt(req.params.id)

    Get_Requests.getUyeByMail(query_email, (err, uye) => {
        Get_Requests.deleteBook(id, (err, result) => {
            if(err){
                console.log("Veritabani hatasi");
                res.status(500).send("Veritabani hatasi")
            }else{
                console.log("Kitap silindi");
                Get_Requests.getKitaplarAllList((err, kitaplar) => {
                    res.redirect('/books', 201, {activeUser: uye, book: kitaplar})
                })
            }
        })
    })
})

app.get('/list', (req, res) => {
    const selectedOption = req.query.selectedOption;
    console.log(selectedOption); // 'selectedOption' yerine değişkenin değerini loglamak için değiştirildi
    // selectedOption'a göre işlem yapılabilir
    // Örnek olarak:
    if (selectedOption === 'value1') {
        // Eğer selectedOption 'value1' ise, örnek bir dizi döndür
        const data = Get_Requests.getKategoriAllList((err, result) => {
            if (err) {
                res.status(500).send('Interval server error')
            }
            else{
                res.json(result)
            }
        })
    } 
    else {
        // Diğer durumlar için hata mesajı döndür
        res.status(400).send('Geçersiz seçenek');
    }
});



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
                    res.status(200).redirect('members')
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
