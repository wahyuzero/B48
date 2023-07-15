// Membuat class baru untuk company
// "comp" digunakan untuk menggantikan "usr" jadi peritah get usr digunakan untuk menggantikan usr untuk nantinya dipanggil di dalam array 
// Jangan lupa tanda ";" karena sering kelewat :v
// Di tugas day 9 ini sudah tidak bisa
class Company {
    constructor(comp, quote, img, rate) {
        this.comp = comp;
        this.quote = quote;
        this.img = img;
        this.rate = rate;
    }
    get usr() {
        return "Company : " + this.comp;
    }
    get ratingStyle() {
        if (this.comp) {
            return "color:blue;font-style:italic;";
        }
    }
}

// Membuat array yang berisi objek berupa usr, quote, img dan rating... 
// bagian ini mendefinisikan array yang nantinya akan ditampilkan ke html
//  Bisa berupa teks, url ataupun angka
// New Company untuk memanggil class diatas
// jangan lupa setelah selesai memberi value pada objek dengan tanda "kutip" di kasih "koma" agar tidak error :v

const dataTestimoni = [
    {
        usr : "Mas Eoln",
        quote : "Mantap sir ngga kaya Threads",
        img : "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg",
        rate : 5
    },
    {
        usr : "Mas Zuck",
        quote : "Keren sekali gan, btw mas eoln gelut yok?",
        img : "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
        rate : 5
    },
    {
        usr : "Jefry Besos",
        quote : "Lumayan menarik",
        img : "https://upload.wikimedia.org/wikipedia/commons/9/91/Jeff_Bezos%27_iconic_laugh_crop.jpg",
        rate : 4
    },
    {
        usr : "Satosi Motonaka",
        quote : "Mungkin bisa ditambah fitur lain lagi",
        img : "https://upload.wikimedia.org/wikipedia/commons/7/77/Satoshi_Nakamoto.jpg",
        rate : 4
    },
    new Company (
        "Mikroskop",
        "Nggak rekomen, kelihatan masih pemula",
        "https://www.nicepng.com/png/full/48-482252_spotify-logo-png-transparent.png",
        1
    ),
    new Company (
        "Morgan JP",
        "Kelihatannya anda kekurangan investor",
        "https://upload.wikimedia.org/wikipedia/commons/4/41/JohnPierpontMorgan.png",
        2
    )
];

// Mendefinisikan fungsi untuk menampilkan semua data yang diberikan dari dataTestimoni
// Dalam fungsi ini metode yang digunakan adalah forEach()
// seharusnya array dari dataTestimoni string HTML untuk setiap objek 
//  String ini kemudian ditambahkan ke variabel testimoniHTML. 
// Setelah itu, isi elemen dengan id "testimoni" di dalam dokumen HTML akan ditampilkan ke html menggunakan
//  document.getElementById("testimoni").innerHTML
function allTestimoni() {
    let testimoniHTML = "";
    dataTestimoni.forEach((profil,index) => {
        testimoniHTML += `<div class="testimonial">
            <img src="${profil.img}" class="profile-testimonial" />
            <p class="quote">"${profil.quote}"</p>
            <p class="author" style = ${profil.ratingStyle}>- ${profil.usr}</p>
            <p class="author"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
            <polygon fill="#FFD700" points="12.5 0 15.177 8.09 23.074 9.361 17.363 14.466 18.698 22.639 12.5 18.885 6.302 22.639 7.637 14.466 1.926 9.361 9.823 8.09" />
          </svg>${profil.rate}</p>
        </div>`;
    });
    document.getElementById("testimoni").innerHTML = testimoniHTML;
}

// Eksekusi awal innerhtml agar tidak hilang ketika halaman mulai dimuat
allTestimoni();

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
        filterTestimoniHTML += `<div class="testimonial">
            <img src="${profil.img}" class="profile-testimonial" />
            <p class="quote">"${profil.quote}"</p>
            <p class="author" style = ${profil.ratingStyle}>- ${profil.usr}</p>
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
console.log(allTestimoni);
