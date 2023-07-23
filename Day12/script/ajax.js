// Membuat class baru untuk company
// "comp" digunakan untuk menggantikan "usr" jadi peritah get usr digunakan untuk menggantikan usr untuk nantinya dipanggil di dalam array 
// Jangan lupa tanda ";" karena sering kelewat :v
// Di tugas day 9 entah aku yang ngga bisa atau emang ngga class nya ngga bisa dipakai
// class Company {
//     constructor(comp, quote, img, rate) {
//         this.comp = comp;
//         this.quote = quote;
//         this.img = img;
//         this.rate = rate;
//     }
//     get usr() {
//         return "Company : " + this.comp;
//     }
//     get ratingStyle() {
//         if (this.comp) {
//             return "color:blue;font-style:italic;";
//         }
//     }
// }

// Ajax untuk memanggil json dari server
// xhttp.open ditulis dengan urutan Method, Url dan kondisi.. defaultnya true jadi tidak usah ditulis true juga tidak apa
const promise = new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", "https://api.npoint.io/de53732dac47e9444e92", true ),
    xhttp.onload = function() {
        if (xhttp.status = 200) {
            console.log("Data sucessfully loaded")
            alert("Data sucessfully loaded")
            resolve(JSON.parse(xhttp.responseText))
        } else if (xhttp.status >= 400) {
            console.log("Data not loaded")
            reject("Error cannot load data")
            alert("Error cannot load data")
        }
    }
// Jika data tidak termuat atau koneksi terputus
    xhttp.onerror = function () {
        reject("Error Network")
        alert("Error Network")
    }
    xhttp.send()
})
// promise.then((value) => {
//     const dataJson = value
//     dataJson.forEach((entry) => {
//         const {comp, quote, img, rate} = entry;
//         const company = new Company(comp, quote, img, rate);
//         dataTestimoni.push(company);
//     });
//     console.log(value)
//     allTestimoni();
// }).catch((reason) => {
//     console.log(reason)
// })
// async function getData() {
//     const response = await promise
//     console.log(response)
// }



// Membuat array yang berisi objek berupa usr, quote, img dan rating... 
// bagian ini mendefinisikan array yang nantinya akan ditampilkan ke html
//  Bisa berupa teks, url ataupun angka
// New Company untuk memanggil class diatas
// jangan lupa setelah selesai memberi value pada objek dengan tanda "kutip" di kasih "koma" agar tidak error :v


// Tugas day 9 data diambil dari json jadi data bawaan akan dimatikan dan diganti data dari json
let dataTestimoni = [
    // {
    //     usr : "Mas Eoln",
    //     quote : "Mantap sir ngga kaya Threads",
    //     img : "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg",
    //     rate : 5
    // },
    // {
    //     usr : "Mas Zuck",
    //     quote : "Keren sekali gan, btw mas eoln gelut yok?",
    //     img : "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    //     rate : 5
    // },
    // {
    //     usr : "Jefry Besos",
    //     quote : "Lumayan menarik",
    //     img : "https://upload.wikimedia.org/wikipedia/commons/9/91/Jeff_Bezos%27_iconic_laugh_crop.jpg",
    //     rate : 4
    // },
    // {
    //     usr : "Satosi Motonaka",
    //     quote : "Mungkin bisa ditambah fitur lain lagi",
    //     img : "https://upload.wikimedia.org/wikipedia/commons/7/77/Satoshi_Nakamoto.jpg",
    //     rate : 4
    // },
    // new Company (
    //     "Mikroskop",
    //     "Nggak rekomen, kelihatan masih pemula",
    //     "https://www.nicepng.com/png/full/48-482252_spotify-logo-png-transparent.png",
    //     1
    // ),
    // new Company (
    //     "Morgan JP",
    //     "Kelihatannya anda kekurangan investor",
    //     "https://upload.wikimedia.org/wikipedia/commons/4/41/JohnPierpontMorgan.png",
    //     2
    // )
]
async function datas() {
    try {
        const response = await promise
        console.log (response)
        // agar nilai yang diterima dari "promise" disimpan dalam variabel "dataTestimoni"
        // melalui response
        dataTestimoni = response
        // Default page awal yang di load, jika tidak dimasukan maka defaultnya kosong sebelum menekan tombol rating
        // filterTestmoni(1)
        allTestimoni()
    } catch (error) {
        console.log(error)
    }
}
datas()
// Mendefinisikan fungsi untuk menampilkan semua data yang diberikan dari dataTestimoni
// Dalam fungsi ini metode yang digunakan adalah forEach()
// seharusnya array dari dataTestimoni string HTML untuk setiap objek 
//  String ini kemudian ditambahkan ke variabel testimoniHTML. 
// Setelah itu, isi elemen dengan id "testimoni" di dalam dokumen HTML akan ditampilkan ke html menggunakan
//  document.getElementById("testimoni").innerHTML
function allTestimoni() {
    let testimoniHTML = "";
    dataTestimoni.forEach((profil,index) => {
        // Karena class Company tidak bisa dipanggil dari json maka di bagian author data yang dipanggil berupa usr dan comp
        // Dikarenakan usr dan comp jika dimasukan bersama maka salah satu akan undifiend
        // maka ditambahkan pengkondisian jika salah satu dari mereka undifiend maka akan diganti dengan value kosong
        if (profil.comp == undefined) {
            profil.comp = ""
        } else if (profil.usr == undefined) {
            profil.usr = ""
        }
        //  Di tugas day 8 terdapat pengkondisian di dalam class Company yaitu if this.comp maka style teks menjadi biru.
        // penggantinya menjadi default kosong tetapi terdapat pengkondisian jika profil.comp maka akan melakukan styling lagi
        let compStyle = ""
        if (profil.comp) {
            compStyle = 'style = "text-transform: uppercase; color: blue;"';
        }
        testimoniHTML += `<div class="testimonial">
            <img src="${profil.img}" class="profile-testimonial" />
            <p class="quote">"${profil.quote}"</p>
            <p class="author" ${compStyle}>- ${profil.usr} ${profil.comp}</p>
            <p class="author"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
            <polygon fill="#FFD700" points="12.5 0 15.177 8.09 23.074 9.361 17.363 14.466 18.698 22.639 12.5 18.885 6.302 22.639 7.637 14.466 1.926 9.361 9.823 8.09" />
          </svg>${profil.rate}</p>
        </div>`;
    });
    document.getElementById("testimoni").innerHTML = testimoniHTML;
}

// Eksekusi awal innerhtml agar tidak hilang ketika halaman mulai dimuat
// allTestimoni();

// Mendefinisikan fungsi untuk melakukan filter sesuai dengan "rate"
// Dalam fungsi ini variabel filterTestimoniHTML sebagai string kosong yang akan digunakan untuk menggabungkan string HTML yang telah difilter. 
// menggunakan metode filter() pada array dataTestimoni[] 
// untuk mengembalikan array filterData yang hanya berisi objek dengan "rate" yang sesuai. 
// Kemudian data difilter dari array filterData  menggunakan forEach() dan menghasilkan string HTML untuk setiap objek. 
// String HTML ditambahkan ke variabel filterTestimoniHTML. 
// Setelah filter selesai, isi elemen dengan id "testimoni" di HTML menggunakan document.getElementById().innerHTML untuk menampilkannya ke html
function filterTestmoni(rating) {
    let filterTestimoniHTML = ""
    const filterData = dataTestimoni.filter((profil) => {
        return profil.rate === rating;
    });
    filterData.forEach((profil) => {
        // Karena class Company tidak bisa dipanggil dari json maka di bagian author data yang dipanggil berupa usr dan comp
        // Dikarenakan usr dan comp jika dimasukan bersama maka salah satu akan undifiend
        // maka ditambahkan pengkondisian jika salah satu dari mereka undifiend maka akan diganti dengan value kosong
        if (profil.comp == undefined) {
            profil.comp = ""
        } else if (profil.usr == undefined) {
            profil.usr = ""
        }
        //  Di tugas day 8 terdapat pengkondisian di dalam class Company yaitu if this.comp maka style teks menjadi biru.
        // berikut adalah penggantinya
        let compStyle = ""
        if (profil.comp) {
            compStyle = '"text-transform: uppercase; color: blue;"';
        }
        filterTestimoniHTML += `<div class="testimonial">
            <img src="${profil.img}" class="profile-testimonial" />
            <p class="quote">"${profil.quote}"</p>
            <p class="author" style = ${compStyle}>- ${profil.usr} ${profil.comp}</p>
            <p class="author"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
            <polygon fill="#FFD700" points="12.5 0 15.177 8.09 23.074 9.361 17.363 14.466 18.698 22.639 12.5 18.885 6.302 22.639 7.637 14.466 1.926 9.361 9.823 8.09" />
          </svg>${profil.rate}</p>
        </div>`;
    });
    document.getElementById("testimoni").innerHTML = filterTestimoniHTML;
}

// Output testimoni dengan rate
// console.log(filterTestmoni(5));
// Output semua testimoni
// console.log(allTestimoni);
// Output dari ajax
// console.log(promise)
// console.log(dataTestimoni)


// Berantakan mas kayak fikiranku saat ini :v

// let angka = 16
// if (angka > 0 && angka < 10) {
//     angka = angka * 2
// } else if (angka > 10) {
//     angka = angka * 14094074017
// }
// Cara bikin browser lag :v
// while (angka > 10) {
//     angka = angka * 2
// }
// console.log(angka)
// setTimeout(function() {
//     location.reload();
//   }, 8000);
  