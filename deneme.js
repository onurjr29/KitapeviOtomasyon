const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "onur",
    waitForConnection: true,
    connectLimit: 10,
    queueLimit: 0
});

function getKategoriAllList(id) {
    con.connect(function(err) {
        if(err) throw err;
        con.query("Select * from onur.uye where uye_id = ?" , [id], (err, result) => {
            console.log(result);
        })
    })
}

getKategoriAllList(1)


