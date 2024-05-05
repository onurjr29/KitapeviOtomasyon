const list = document.getElementById('list');
const tbody = document.getElementById('book-table-body');
var selectedQuery = {menu: null, query: null}

document.getElementById('ekle').addEventListener('click', () => {
    const form = document.getElementById("ekleForm")
    if(form.style.display=== 'none'){
      form.style.display = 'block'
    }else{
      form.style.display = 'none'
    }
})

fetchBook(selectedQuery)
document.getElementById('menu').addEventListener('change', (event) => {
  selectedQuery.menu = event.target.value;
  console.log(selectedQuery.menu);
  
  fetchCategory(selectedQuery.menu);
  
  list.addEventListener('change', (event) => {
    selectedQuery.query = event.target.value;
    console.log(selectedQuery.query);
    fetchBook(selectedQuery)
  })
});

function fetchCategory(selectedOption) {
    fetch(`http://localhost:5000/list?selectedOption=${selectedOption}`)
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      data.forEach((item, index) => {
        var option = document.createElement('option');
        option.value = item.kategori_adi;
        option.text = item.kategori_adi;
        list.appendChild(option);
      });
      list.disabled = false; //Liste öğesini etkinleştir
    })
    .catch(error => console.error('Error fetching data:', error));
  } 
  
  
  
function fetchBook(selectedQuery) {
fetch(`http://localhost:5000/getBooks?menu=${selectedQuery.menu}&query=${selectedQuery.query}`)
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // Bu `then` bloğu, `response.json()` işlemi başarılı olduğunda çalışır
    tbody.innerHTML = ``
    console.log(data); // Elde edilen JSON verisini konsola yazdırabilirsiniz
    // Burada `data` verisini işleyebilirsiniz
    data.forEach((item, index) => {
    var row = document.createElement('tr');
    
    row.innerHTML = `
    <td scope="row">${index + 1}</td>
    <td>${item.kitap_adi}</td>
    <td>${item.kitap_yazar}</td>
    <td>${item.kitap_tur}</td>
    <td>${item.kitap_sayfa}</td>
    <td>${item.kitap_basim}</td>
    <td>${item.kitap_baski}</td>
    <td>${item.kitap_adet}</td> 
    <td>${item.kitap_fiyat}</td>
    <td><button type="button" id="${item.kitap_id}" onclick="deleteBook(${item.kitap_id})" class="btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" style="fill: white;" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button></td>
    `;
    tbody.appendChild(row);
    });
})
.catch(error => { 
    var row = document.createElement('tr');
    row.innerHTML = `<td colspan="5">Kitap bulunamadı.</td>`;
    tbody.appendChild(row);
    console.error('Error fetching data', error)});
}

function deleteBook(kitapId){
    fetch(`http://localhost:5000/deleteBook?kitapId=${kitapId}`, {
    method: 'POST'
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok', response);
    }else{
        fetchBook(selectedQuery)
    }
    })
}
    
function searchBooks(searchQuery){
    fetch(`http://localhost:5000/searchBook?searchQuery=${searchQuery}`)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    tbody.innerHTML = ``
    console.log(data); // Elde edilen JSON verisini konsola yazdırabilirsiniz
    // Burada `data` verisini işleyebilirsiniz
    data.forEach((item, index) => {
        var row = document.createElement('tr');
        
        row.innerHTML = `
        <td scope="row">${index + 1}</td>
        <td>${item.kitap_adi}</td>
        <td>${item.kitap_yazar}</td>
        <td>${item.kitap_tur}</td>
        <td>${item.kitap_sayfa}</td>
        <td>${item.kitap_basim}</td>
        <td>${item.kitap_baski}</td>
        <td>${item.kitap_adet}</td> 
        <td>${item.kitap_fiyat}</td>
        <td><button type="button" id="${item.kitap_id}" onclick="deleteBook(${item.kitap_id})" class="btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" style="fill: white;" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button></td>
        `;
        tbody.appendChild(row);
    });
    })
}