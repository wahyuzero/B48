function sendEmail(event) {
    event.preventDefault();    
    let nama = document.getElementById('namaInput').value;
    let email = document.getElementById('emailInput').value;
    let nomer = document.getElementById('nomerInput').value;
    let subjek = document.getElementById('subjekInput').value;
    let pesan = document.getElementById('pesanInput').value;    
    if (!nama, !email, !nomer, !subjek, !pesan) {
        alert("Mohon dilengkapi, Masih ada yang kosong");
        return;
    }    
    let body = `Halo, Perkenalkan nama saya ${nama}. silahkan kontak saya di nomor ${nomer} atau email berikut ${email}. Saya memiliki pesan untuk anda ${pesan}`;
    const mailTo = "wahyuzeros@gmail.com";    
    window.location.href = `mailto:${mailTo}?subject=${subjek}&body=${body}`;
    if (window.location.href) {
        alert("Anda akan dialihkan");
    }
}
