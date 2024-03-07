const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("mehaba node")
})

app.listen(port, () => {
    console.log(`Uygulama https://localhost:${port} uzerinde calisiyor `);
})