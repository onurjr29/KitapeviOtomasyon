const express = require("express")

const app = express()

app.get('/fetch', (req, res) => {
    console.log("i recieved fetch request");

    var tryFetch = {myString : "i am working fetch"}
    res.json(tryFetch)
})


const fromServer = fetch('http://localhost:5000/fetch')
    .then(response => response.json())
    .then(data => console.log(data.myString))
    .catch(error => console.error('Error fetching data:', error));


console.log(fromServer);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
