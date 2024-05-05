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

app.get('/getBooks', async (req, res) => {
    try {
        var selectedQuery = req.query;
        
        if (selectedQuery.menu === 'null') {
            const result = await new Promise((resolve, reject) => {
                Get_Requests.getKitaplarAllList((err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            res.json(result);
        } else if (selectedQuery.menu.toLowerCase() === 'kategori') {
            console.log(selectedQuery.query);
            const result = await new Promise((resolve, reject) => {
                Get_Requests.getKitaplarByTur(selectedQuery.query, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            res.json(result);
        } else {
            res.status(400).json('Invalid request');
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.post('/deleteBook', middleWare.authenticationToken, async (req, res) => {
    try {
        const query_email = req.email.email;
        const kitapId = req.query.kitapId;

        console.log(kitapId);

        const uye = await new Promise((resolve, reject) => {
            Get_Requests.getUyeByMail(query_email, (err, uye) => {
                if (err) reject(err);
                else resolve(uye);
            });
        });

        await new Promise((resolve, reject) => {
            Get_Requests.deleteBook(kitapId, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        console.log("Kitap silindi");

        const kitaplar = await new Promise((resolve, reject) => {
            Get_Requests.getKitaplarAllList((err, kitaplar) => {
                if (err) reject(err);
                else resolve(kitaplar);
            });
        });
        res.status(201).redirect('/books'); 
    } catch (err) {
        console.log(err);
        res.json(500)("Internal server error");
    }
});

app.post('/deleteOrder', middleWare.authenticationToken, async (req, res) => {
    try {
        const query_email = req.email.email;
        const orderId = req.query.orderId;

        console.log(orderId);

        const uye = await new Promise((resolve, reject) => {
            Get_Requests.getUyeByMail(query_email, (err, uye) => {
                if (err) reject(err);
                else resolve(uye);
            });
        });

        await new Promise((resolve, reject) => {
            Get_Requests.deleteOrder(orderId, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        console.log("Kitap silindi");

        const orders = await new Promise((resolve, reject) => {
            Get_Requests.getSiparisAllList((err, siparisler) => {
                if (err) reject(err);
                else resolve(siparisler);
            });
        });
        res.status(201).redirect('/orders'); 
    } catch (err) {
        console.log(err);
        res.json(500)("Internal server error");
    }
})

app.post('/deleteMember', middleWare.authenticationToken, async (req, res) => {
    try {
        const query_email = req.email.email;
        const uyeId = req.query.uyeId;

        console.log(uyeId);

        const uye = await new Promise((resolve, reject) => {
            Get_Requests.getUyeByMail(query_email, (err, uye) => {
                if (err) reject(err);
                else resolve(uye);
            });
        });

        await new Promise((resolve, reject) => {
            Get_Requests.deleteMember(uyeId, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        console.log("Uye silindi");

        const members = await new Promise((resolve, reject) => {
            Get_Requests.getUyeAllList((err, uyeler) => {
                if (err) reject(err);
                else resolve(uyeler);
            });
        });
        res.status(201).redirect('/members'); 
    } catch (err) {
        console.log(err);
        res.json(500).status("")
    }
})

app.get('/list', (req, res) => {
    const selectedOption = req.query.selectedOption;
    console.log(selectedOption); // 'selectedOption' yerine değişkenin değerini loglamak için değiştirildi
    // selectedOption'a göre işlem yapılabilir
    // Örnek olarak:
    if (selectedOption === 'kategori') {
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

app.get('/searchBook', async(req, res) => {
    const query = req.query.searchQuery;

    console.log(query);
    try{
        const data = await new Promise((resolve, reject) => {
            Get_Requests.getKitaplarBySearchQuery(query, (err, result) => {
                if (err) reject(err)
                else{
                    resolve(result)
                }
            })
        })
        res.json(data); 
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.get('/searchMembers', async (req, res) => {
    const query = req.query.searchQuery;

    console.log(query);
    try{
        const data = await new Promise((resolve, reject) => {
            Get_Requests.getUyelerBySearchQuery(query, (err, result) => {
                if(err) reject(err)
                else{
                    resolve(result)
                }
            })
        })
        res.json(data);
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.post('/addBook', async (req, res) => {
    const {kitapAdi, yazar, tur, baski, fiyat} = req.body;
    const { sayfa, basim, adet } = req.body;
    const sayfaInt = parseInt(sayfa);
    const basimInt = parseInt(basim);
    const adetInt = parseInt(adet);
    console.log(kitapAdi, yazar, tur, sayfa, basim, baski, adet, fiyat);
    if(isNaN(sayfa)){
        res.status(400).send('Please enter a valid number for page count!');
        return;
    }
    try {
        if (kitapAdi === '' || yazar === '' || tur === '' || sayfa === '' || basim === '' || baski === '' || adet === '' || fiyat === '') {
            res.status(400).send('Please fill all the fields!');
        } else {
            const result = await new Promise((resolve, reject) => {
                Get_Requests.addNewBook(kitapAdi, yazar, tur, sayfa, basim, baski, adet, fiyat, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            if (result) {
                res.redirect('/books');
            } else {
                res.status(500).send('Internal server error 201');
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error 205');
    }
});

app.post('/addMember', async (req, res) => {
    const {uyeAdi, soyadi, mail, sifre} = req.body;
    console.log(uyeAdi, soyadi, mail, sifre);
    try {
        if (uyeAdi === '' || soyadi === '' || mail === '' || sifre == '') {
            res.status(400).send('Please fill all the fields!');
        } else {
            const result = await new Promise((resolve, reject) => {
                Get_Requests.addNewUser(uyeAdi, soyadi, mail, sifre, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            if (result) {
                res.redirect('/members');
            } else {
                res.status(500).send('Internal server error 201');
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error 205');
    }
})

app.get('/users', middleWare.authenticationToken, (req, res) => {
    res.render('users')
})

app.get('/profile', middleWare.authenticationToken, (req, res) => { 
    res.render('profile')
})

app.get('/userInfo', middleWare.authenticationToken, async (req, res) => {
    const userName = req.email.email;
    try{
        const result = await new Promise((resolve, reject) => {
            Get_Requests.getUyeByMail(userName, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        })
        // console.log(result);
        res.json(result);
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

// simdi kullanici bilgileri guncelleme kismi yapilacak
app.post('/updateUser', middleWare.authenticationToken, async (req, res) => {
    const {adi, soyadi} = req.body;
    const id = req.id;
    try{
        if(adi === '' || soyadi === ''){
            alert('Please fill all the fields!');
        }else{
            const result = await new Promise((resolve, reject) => {
                Get_Requests.updateUser(id, adi, soyadi, (err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                })
            })
            if(result){
                res.redirect('/profile');
            }else{
                res.status(500).send('Internal server error 201');
            }
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal server error 205');
    }
})

app.post('/updatePassword', middleWare.authenticationToken, async (req, res) => {
    const {newPassword, confirmPassword} = req.body;
    const id = req.id;
    try{
        if(newPassword === '' || confirmPassword === ''){
            alert('Please fill all the fields!');
        }else{
            const result = await new Promise((resolve, reject) => {
                Get_Requests.updatePassword(id, newPassword, (err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                })
            })
            if(result){
                res.redirect('/profile');
            }else{
                res.status(500).send('Internal server error 201');
            }
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal server error 205');
    }
})


app.get('/fetchMembers', async (req, res) => {
    const query = req.query.searchQuery;
    try{
        if(query === 'all'){
            const result = await new Promise((resolve, reject) => {
                Get_Requests.getUyeAllList((err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                })
            })
            res.json(result);
        }
        else{
            const result = await new Promise((resolve, reject) => {
                Get_Requests.getUyeBySearchQuery(query, (err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                })
            })
            res.json(result);
        }
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.get('/fetchOrders', async (req, res) => {
    try{
        const result = await new Promise((resolve, reject) => {
            Get_Requests.getSiparisAllList((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
        res.json(result)
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.get('/userOperations', middleWare.authenticationToken, (req, res) => {
    res.render('userOperations')
})

app.get('/orders', middleWare.authenticationToken, async (req, res) => {
    const query_email = req.email.email;
    // console.log(query_email);
    const locals = {
        title : 'Members',
        description : 'Welcome to the dashboard!',
        // activeUserName : req.uye_adi, // Assuming you have a middleware that sets the authenticated user in the request object
    }
    Get_Requests.getUyeByMail(query_email, (err, uye) => {
       res.render('orders', {activeUser: uye})
    });
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

app.post('/submit', async (req, res) => {
    const { name, surname, email, password } = req.body;
    let errorMessage = '';

    if (name === '' || surname === '' || email === '' || password === '') {
        console.log("Please fill all the fields!");
        errorMessage = 'Please fill all the fields!';
        res.render('registerFail', { errorMessage });
    } else {
        try {
            const isUserExist = await Get_Requests.isUserExist(email , (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                } else {
                    return result;
                }
            });
            if (isUserExist) {
                console.log('User already exists!');
                errorMessage = 'User already exists!';
                res.render('registerFail', { errorMessage });
            } else {
                const result = await new Promise((resolve, reject) => {
                    Get_Requests.addNewUser(name, surname, email, password, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
                if (result) {
                    console.log('User registered successfully!');
                    res.redirect('/');
                } else {
                    console.log('Internal server error');
                    errorMessage = 'Internal server error';
                    res.render('registerFail', { errorMessage });
                }
            }    
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
    }
});

app.post('/addOrder', middleWare.authenticationToken, async (req, res) => {	
    const {urun, musteri, miktar, adres} = req.body;
    const miktarInt = parseInt(miktar);
    console.log(urun, musteri, miktarInt, adres);
    try {
        if (urun === '' || musteri === '' || miktar === '' || adres === '') {
            res.status(400).send('Please fill all the fields!');
        } else {
            const result = await new Promise((resolve, reject) => {
                Get_Requests.addNewOrder(urun, musteri, miktarInt, adres, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            if (result) {
                res.redirect('/orders');
            } else {
                alert('Internal server error 201');
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error 205');
    }
})

app.get('/deleteAccount', middleWare.authenticationToken, async (req, res) => {
    const id = req.id;
    try {
        const result = await new Promise((resolve, reject) => {
            Get_Requests.deleteAccount(id, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (result === true) { // Hesap başarıyla silindiğinde
            res.redirect('/logout');
        } else { // Hesap silinemediğinde
            res.status(500).send('Hesap silinemedi');
        }
    } catch (err) { // Hata durumunda
        console.error(err);
        res.status(500).send('Bir hata oluştu');
    }
});

app.get('/logout', async (req, res) => {
    // Cookie'yi geçersiz kılma
    res.clearCookie('token'); // 'token' isimli cookie'yi siler
    
    // Kullanıcıyı başka bir sayfaya yönlendirme veya mesaj gönderme
    console.log('Oturumunuz sonlandırıldı. Token silindi.');
        
    // Sayfayı yenileyin
    res.redirect('/');
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
