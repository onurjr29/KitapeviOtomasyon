const Get_Requests = require('./Request_Functions/Get_Requests')


// const query = {menu: 'kategori', query: 'düşünce'}
Get_Requests.getKitaplarByTur('Düşünce',(err, result) => {
    if (err) {
        console.log('Interval server error')
    }
    else{
        console.log(result)
    }
})
// fetchBook(query)
