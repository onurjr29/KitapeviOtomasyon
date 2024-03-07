const mysqlClient = require('../Client/mysqlClient');

const client = new mysqlClient();

function getKategoriAllList() {
    client.query("Select * from onur.kategori", (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kategori_id: row.kategori_id,
                kategori_adi: row.kategori_adi
            }
        })
        console.log(_list);
        return _list;
    });   
}

function getKategoriById(id) {
    client.query(`Select * from onur.kategori where kategori_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kategori_id: row.kategori_id,
                kategori_adi: row.kategori_adi
            }
        })
        console.log(_list);
        return _list;

    });   
}

function getKategoriByName(name) {
    client.query(`Select * from onur.kategori where kategori_adi = ${name}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kategori_id: row.kategori_id,
                kategori_adi: row.kategori_adi
            }
        })
        console.log(_list);
        return _list;
    });   
}

// Kitaplar Table
function getKitaplarAllList(){
    client.query("Select * from onur.kitaplar", (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKitaplarById(id){
    client.query(`Select * from onur.kitaplar where kitap_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKitaplarByName(name){
    client.query(`Select * from onur.kitaplar where kitap_adi = ${name}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Kitap bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKitaplarByYazar(yazar){
    client.query(`Select * from onur.kitaplar where kitap_yazar = ${yazar}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Kitap bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKitaplarByTur(tur){
    client.query(`Select * from onur.kitaplar where kitap_tur = ${tur}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKitaplarBySayfa(sayfa){
    client.query(`Select * from onur.kitaplar where kitap_sayfa = ${sayfa}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKitaplarByBasim(basim){
    client.query(`Select * from onur.kitaplar where kitap_basim = ${basim}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKitaplarByBaski(baski){
    client.query(`Select * from onur.kitaplar where kitap_baski = ${baski}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kitap_id: row.kitap_id,
                kitap_adi: row.kitap_adi,
                kitap_yazar: row.kitap_yazar,
                kitap_tur: row.kitap_tur,
                kitap_sayfa: row.kitap_sayfa,
                kitap_basim: row.kitap_basim,
                kitap_baski: row.kitap_baski,
                kitap_adet: row.kitap_adet,
                kitap_fiyat: row.kitap_fiyat
            }
        });
        console.log(_list);
        return _list;
    });
}

function getKullaniciAllList(){
    client.query("Select * from onur.kullanici", (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kullanici_id: row.kullanici_id,
                kullanici_adi: row.kullanici_adi,
                kullanici_soyadi: row.kullanici_soyadi,
                kullanici_email: row.kullanici_email,
                kullanici_sifre: row.kullanici_sifre,
                kullanici_adres: row.kullanici_adres,
                kullanici_tel: row.kullanici_tel
            }
        });
        console.log(_list);
        return _list;
    });

}

function getKullaniciById(id){
    client.query(`Select * from onur.kullanici where kullanici_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Kullanici bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                kullanici_id: row.kullanici_id,
                kullanici_adi: row.kullanici_adi,
                kullanici_soyadi: row.kullanici_soyadi,
                kullanici_email: row.kullanici_email,
                kullanici_sifre: row.kullanici_sifre,
                kullanici_adres: row.kullanici_adres,
                kullanici_tel: row.kullanici_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelAllList(){
    client.query("Select * from onur.personel", (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelById(id){
    client.query(`Select * from onur.personel where personel_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Personel bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelListByName(name){
    client.query(`Select * from onur.personel where personel_adi = ${name}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelListBySurname(surname){
    client.query(`Select * from onur.personel where personel_soyadi = ${surname}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelByTc(tc){
    client.query(`Select * from onur.personel where personel_tc = ${tc}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Personel bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelByPhone(phone) {
    client.query(`Select * from onur.personel where personel_tel = ${phone}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Personel bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelListByMail(mail){
    client.query(`Select * from onur.personel where personel_email = ${mail}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getPersonelByUsername(username){
    client.query(`Select * from onur.personel where personel_username = ${username}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Personel bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                personel_id: row.personel_id,
                personel_adi: row.personel_adi,
                personel_soyadi: row.personel_soyadi,
                personel_email: row.personel_email,
                personel_sifre: row.personel_sifre,
                personel_adres: row.personel_adres,
                personel_tel: row.personel_tel
            }
        });
        console.log(_list);
        return _list;
    });
}

function getSiparisListByUyeId(id){
    client.query(`Select * from onur.siparis where uye_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Siparis bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                siparis_id: row.siparis_id,
                uye_id: row.uye_id,
                kitap_id: row.kitap_id,
                siparis_tarih: row.siparis_tarih,
                siparis_adet: row.siparis_adet,
                siparis_tutar: row.siparis_tutar
            }
        });
        console.log(_list);
        return _list;
    });
}

function getSiparisByKitapId(id){
    client.query(`Select * from onur.siparis where kitap_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Siparis bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                siparis_id: row.siparis_id,
                uye_id: row.uye_id,
                kitap_id: row.kitap_id,
                siparis_tarih: row.siparis_tarih,
                siparis_adet: row.siparis_adet,
                siparis_tutar: row.siparis_tutar
            }
        });
        console.log(_list);
        return _list;
    });
}

function getSiparisByAlimTarih(tarih){
    client.query(`Select * from onur.siparis where siparis_tarih = ${tarih}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Siparis bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                siparis_id: row.siparis_id,
                uye_id: row.uye_id,
                kitap_id: row.kitap_id,
                siparis_tarih: row.siparis_tarih,
                siparis_adet: row.siparis_adet,
                siparis_tutar: row.siparis_tutar
            }
        });
        console.log(_list);
        return _list;
    });
}

function getSiparisBySiparisId(id){
    client.query(`Select * from onur.siparis where siparis_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Sipariş bulunamadı");
            return
        }
        const _list = result.map(row => {
            return{
                siparis_id: row.siparis_id,
                uye_id: row.uye_id,
                kitap_id: row.kitap_id,
                siparis_tarih: row.siparis_tarih,
                siparis_adet: row.siparis_adet,
                siparis_tutar: row.siparis_tutar
            }
        });
        console.log(_list);
        

        return _list;
    });
}


//uye tablosu

function getUyeAllList(){
    client.query("Select * from onur.uye", (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Liste bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_adi: row.uye_adi,
                uye_soyadi: row.uye_soyadi,
                uye_email: row.uye_email,
                uye_sifre: row.uye_sifre,
                uye_adres: row.uye_adres,
            }
        });
        console.log(_list);
        return _list;
    });
}

function getUyeById(id){
    client.query(`Select * from onur.uye where uye_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Uye bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_adi: row.uye_adi,
                uye_soyadi: row.uye_soyadi,
                uye_email: row.uye_email,
                uye_sifre: row.uye_sifre,
                uye_adres: row.uye_adres,
            }
        });
        console.log(_list);
        return _list;
    });
}

function getUyeByName(name){
    client.query(`Select * from onur.uye where uye_adi = ${name}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Uye bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_adi: row.uye_adi,
                uye_soyadi: row.uye_soyadi,
                uye_email: row.uye_email,
                uye_sifre: row.uye_sifre,
                uye_adres: row.uye_adres,
            }
        });
        console.log(_list);
        return _list;
    });
}

function getUyeBySurname(surname){
    client.query(`Select * from onur.uye where uye_soyadi = ${surname}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Uye bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_adi: row.uye_adi,
                uye_soyadi: row.uye_soyadi,
                uye_email: row.uye_email,
                uye_sifre: row.uye_sifre,
                uye_adres: row.uye_adres,
            }
        });
        console.log(_list);
        return _list;
    });
}   


function getUyeByMail(mail){
    client.query(`Select * from onur.uye where uye_email = ${mail}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Uye bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_adi: row.uye_adi,
                uye_soyadi: row.uye_soyadi,
                uye_email: row.uye_email,
                uye_sifre: row.uye_sifre,
                uye_adres: row.uye_adres,
            }
        });
        console.log(_list);
        return _list;
    });
}

// uye bilgileri

function getUyeKrediKartiNoByUyeId(id){
    client.query(`Select * from onur.uye_bilgileri where uye_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Kart bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_kredi_kart_no: row.uye_kredikarti
            }
        });
        console.log(_list);
        return _list;
    });
}

function getUyeKrediKartiSktByUyeId(id){
    client.query(`Select * from onur.uye_bilgileri where uye_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Kart bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_kredi_kart_skt: row.uye_sonkullanim
            }
        });
        console.log(_list);
        return _list;
    });
}

function getUyeKrediKartiGvcByUyeId(id){
    if(result.length == 0){
        console.log("Kart bulunamadı");
        return null;
    }
    client.query(`Select * from onur.uye_bilgileri where uye_id = ${id}`, (err, result) => {
        if(err) throw err;
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_kredi_kart_gvc: row.uye_guvenlikkodu
            }
        });
        console.log(_list);
        return _list;
    });
}

function getUyeAdresByUyeId(id){
    client.query(`Select * from onur.uye_bilgileri where uye_id = ${id}`, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
            console.log("Adres bulunamadı");
            return null;
        }
        const _list = result.map(row => {
            return{
                uye_id: row.uye_id,
                uye_adres: row.uye_adres
            }
        });
        console.log(_list);
        return _list;
    });
}

