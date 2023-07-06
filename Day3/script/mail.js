function sendEmail(event) {
    event.preventDefault();
    
    var nama = document.getElementById('namaInput').value;
    var email = document.getElementById('emailInput').value;
    var nomer = document.getElementById('nomerInput').value;
    var subject = document.getElementById('subjectInput').value;
    var pesan = document.getElementById('pesanInput').value;
    
    if (!nama || !email || !nomer || !subject || !pesan) {
        alert("Masih ada yang kosong, Tolong di isi ya manis :)");
        return;
    }
    
    var body = `Hai perkenalkan nama saya ${nama}\n` +
               ` silahkan kontak saya di nomor ${nomer} atau email berikut ${email} , ` +
               `saya memiliki pesan untuk anda ${pesan}`;
    const emailReceiver = "wahyuzeros@gmail.com"
    
    window.location.href = `mailto:${emailReceiver}?subject=${subject}&body=${body}`;
}