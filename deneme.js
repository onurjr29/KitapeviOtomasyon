


function getKategoriAllList() {
    con.connect(function(err) {
        if(err) throw err;
        con.query("Select * from onur.kategori" , (err, result) => {
            console.log(result);
        })
    })
}

getKategoriAllList()


