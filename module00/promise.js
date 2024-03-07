const promise1 = new Promise((resolve, reject) => {
    // resolve("Veriler alindi");
    reject("Baglanti hatasi")
})

promise1.then(value => {
    console.log(value);
}).catch(value => {
    console.log(value);
})



