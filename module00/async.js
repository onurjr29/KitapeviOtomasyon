function getData(data) {
    return new Promise((resolve, reject) => {
        console.log("Veriler alinmaya calisiyor");

        if (data) {
            resolve("Veriler alindi")
        }else{
            reject("Veriler alinamadi")
        }
    })
}

function cleanData(receivedData) {
    return new Promise((resolve, reject) => {
        console.log("Veriler duzenleniyor");

        if (receivedData) {
            resolve("Veriler duzenlendi")
        }else{
            reject("Veriler duzenlenemedi")
        }
    })
}

getData(true)
    .then(result => {
        console.log(result);
        return cleanData(true)
    }).then(result => {
        console.log(result);
    }).catch(result => {
        console.log(result);
    })