const fs = require('fs');
const { rmdir } = require('fs/promises');

// // dosya oku
// fs.readFile("pass.txt", "utf8", (err, data) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log(data);
//     console.log("Dosya okundu");
// })

// // dosya yazdir 
// fs.writeFile("example.txt", "omere gotten", "utf-8", (err) => {
//     if(err) console.error(err);
//     fs.readFile("example.txt", "utf-8", (err, data) => {
//         if(err) console.error(err);
//         console.log(data);
//     })    
// })

// //veri ekle
// fs.appendFile("pass.txt", "\n2. sifre: 456", (err, data) => {
//     if(err) console.log(err);
//     console.log("Dosya yazildi");
// } )

//dosya sil
// fs.unlink("example.txt", (err) => {
//     if(err) console.log(err);
//     console.log("Basariyla silindi");
// })

// dosya olustur
// fs.mkdir("uploads/img", { recursive: true }, (err) => {
//     if(err) console.log(err);
// })

//dosya sil
// rmdir("uploads", { recursive: true } , (err) => {
//     if(err) console.log(err);
//     console.log("klasor silindi");
// })

console.log(__dirname);