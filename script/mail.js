function sendEmail(event) {
    event.preventDefault();
    
    let nama = document.getElementById('namaInput').value;
    let email = document.getElementById('emailInput').value;
    let nomer = document.getElementById('nomerInput').value;
    let subject = document.getElementById('subjectInput').value;
    let pesan = document.getElementById('pesanInput').value;
    
    if (!nama || !email || !nomer || !subject || !pesan) {
        alert("Masih ada yang kosong, Tolong di isi ya manis :)");
        return;
    }
    
    let body = `Hai perkenalkan nama saya ${nama} silahkan kontak saya di nomor ${nomer} atau email berikut ${email} ,saya memiliki pesan untuk anda ${pesan}`;
    const emailReceiver = "wahyuzeros@gmail.com"
    
    window.location.href = `mailto:${emailReceiver}?subject=${subject}&body=${body}`;
}