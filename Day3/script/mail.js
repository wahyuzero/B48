function sendEmail(event) {
    event.preventDefault();
    
    var nama = document.getElementById('namaInput').value;
    var email = document.getElementById('emailInput').value;
    var nomer = document.getElementById('nomerInput').value;
    var subject = document.getElementById('subjectInput').value;
    var pesan = document.getElementById('pesanInput').value;
    
    if (!nama || !email || !nomer || !subject || !pesan) {
        alert("Masih ada yang kosong, Tolong di isi ya sayang :)");
        return;
    }
    
    var body = "Hai perkenalkan nama saya " + nama + "\n" +
               "nomor hp saya " + nomer + "\n" +
               "Saya seorang " + subject + "\n" +
               "dan berikut pesan saya: " + pesan;
    
    window.location.href = "mailto:wahyuakat@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}