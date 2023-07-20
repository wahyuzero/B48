const posts = [];

function addPost(event) {
  event.preventDefault();

  let judul = document.getElementById("projectName").value;
  let tanggal1 = document.getElementById("startDate").value;
  let tanggal2 = document.getElementById("endDate").value;
  let konten = document.getElementById("konten").value;
  let image = document.getElementById("file-input").files;

  const nodeJsimg = `<img src="assets/minilogo/nodejs.png" />`;
  const reactJsimg = `<img src="assets/minilogo/reactjs.png" />`;
  const nextJsimg = `<img src="assets/minilogo/nextjs.png" />`;
  const typeScriptJsimg = `<img src="assets/minilogo/typescr.png" />`;

  let nodeJs = document.getElementById("nodeJs").checked ? nodeJsimg : "";
  let reactJs = document.getElementById("reactJs").checked ? reactJsimg : "";
  let nextJs = document.getElementById("nextJs").checked ? nextJsimg : "";
  let typeScript = document.getElementById("typeScript").checked ? typeScriptJsimg : "";

  if (!judul || !tanggal1 || !tanggal2 || !konten || !image) {
    alert("Masih ada yang kosong, tolong dilengkapi ya manis :)"); 
    return;
  }
  else if (!nodeJs && !reactJs && !nextJs && !typeScript) {
    alert("pilih salah satu teknologi ya manis :)");
    return
  }

  image = URL.createObjectURL(image[0]);
  let post = {
    judul,
    tanggal1,
    tanggal2,
    konten,
    nodeJs,
    reactJs,
    nextJs,
    typeScript,
    image,
    author: "Wahyu Zero",
    postAt: new Date,
    durasiPost1: countDate1(tanggal1, tanggal2),
    durasiPost2: countDate2(tanggal1, tanggal2),
    durasiPost3: countDate3(tanggal1, tanggal2)
  };

  posts.push(post);
  console.log(posts);
  renderPost();
}
function countDate1(tanggal1, tanggal2) {
  let startDate = new Date (tanggal1);
  let endDate = new Date (tanggal2);
  let jarakTime = endDate.getTime() - startDate.getTime();
  let jarakDay = Math.floor(jarakTime / (1000 * 60 * 60 * 24));
  while (jarakDay > 30 ) {
    jarakDay -= 30;
  }
  if (jarakDay < 0) {
    alert("Tanggalnya kok mundur si :v")
  }
  return jarakDay
}

function countDate2(tanggal1, tanggal2) {
  let startDate = new Date (tanggal1);
  let endDate = new Date (tanggal2);
  let jarakTime = endDate.getTime() - startDate.getTime();
  let jarakMonth = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 30));
  while (jarakMonth > 12) {
    jarakMonth -= 12;
  }
  while (jarakMonth < 0){
    jarakMonth += 1;
  }
  return jarakMonth
}
function countDate3(tanggal1, tanggal2) {
  let startDate = new Date (tanggal1);
  let endDate = new Date (tanggal2);
  let jarakTime = endDate.getTime() - startDate.getTime();
  let jarakYear = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 365));
  while (jarakYear < 0) {
    jarakYear += 1
  }
  return jarakYear
}


function renderPost(event) {
  document.getElementById("kontent").innerHTML = "";
  for (let index = 0; index < posts.length; index++) {
    document.getElementById("kontent").innerHTML += `
    <div class="card border-primary mb-3 mt-lg-5" style="max-width: 20rem;">
    <div class="card-header img-fluid"><img src="${posts[index].image}" class="card-img-top img-fluid rounded img-thumbnail" style="max-height: 240; max-width: 280; object-fit: contain;" /></div>
    <div class="card-body">
      <h4 class="card-title text-black d-flex justify-content-center">${posts[index].judul}</h4>
      <h6 class="card-title text-black-75 d-flex justify-content-center">${posts[index].author}</h6>
      <h6 class="card-title text-black-25 d-flex justify-content-center">${posts[index].postAt}</h6>
      <h5 class="card-title text-black-50 d-flex justify-content-center">Duration</h5>
      <h6 class="card-title text-black d-flex justify-content-center">${posts[index].durasiPost1} Day,${posts[index].durasiPost2} Month,${posts[index].durasiPost3} Year</h6>
      <p class="card-text text-black d-flex justify-content-center">${posts[index].konten}</p>
      <p class="d-flex justify-content-between" style="width: 25px; height: 25px; margin-left: 10px;">${posts[index].nodeJs} ${posts[index].reactJs} ${posts[index].nextJs} ${posts[index].typeScript}</p>
      <div class="card-body d-flex justify-content-lg-between">
        <a href="#" class="card-link btn btn-secondary">Edit</a>
        <a href="#" class="card-link btn btn-secondary">Delete</a>
      </div>
    </div>
    </div>      
    `;
  }
}
