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
  // let jarakYear = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 365));
  // let jarakMonth = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 30));
  let jarakDay = Math.floor(jarakTime / (1000 * 60 * 60 * 24));
  // let startDay = startDate.getDay();
  // let endDay = endDate.getDay();
  // let startMonth = startDate.getMonth();
  // let endMonth = endDate.getMonth();
  // let startYear = startDate.getFullYear();
  // let endYear = startDate.getFullYear();
  // let diffDay = (endDay - startDay) + (30 * (endMonth - startMonth));
  // let diffMonths = (endMonth - startMonth) + (12 * (endYear - startYear));
  // let diffYears = endYear - startYear;
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
  // let jarakYear = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 365));
  let jarakMonth = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 30));
  // let jarakDay = Math.floor(jarakTime / (1000 * 60 * 60 * 24));
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
  // let jarakMonth = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 30));
  // let jarakDay = Math.floor(jarakTime / (1000 * 60 * 60 * 24));
  while (jarakYear < 0) {
    jarakYear += 1
  }
  return jarakYear
}


function renderPost(event) {
  document.getElementById("kontent").innerHTML = "";
  for (let index = 0; index < posts.length; index++) {
    document.getElementById("kontent").innerHTML += `
      <div class="card">
        <div class="card-image"><a href="blog-detail.html">
          <img src="${posts[index].image}" alt="assets/404.jpg"></a>
        </div>
        <h3 class="card-heading"><a href="blog-detail.html">${posts[index].judul}</a></h3>
        <h6 style="opacity: 70%;">${posts[index].author}</h6>
        <h6 style="opacity: 35%;">${posts[index].postAt}</h6>
        <h4>Duration</h4>
        <h5>${posts[index].durasiPost1} Day,${posts[index].durasiPost2} Month,${posts[index].durasiPost3} Year ago..</h5>
        <p class="card-description">${posts[index].konten}</p>
        <div class="card-images">
          ${posts[index].nodeJs} ${posts[index].reactJs} ${posts[index].nextJs} ${posts[index].typeScript}
        </div>
        <div class="card-buttons">
          <button class="tombol">Edit</button>
          <button class="tombol">Delete</button>
        </div>
      </div>      
    `;
  }
}




// const date = new Date()
// console.log("tanggal: ", date)

// function countDate(event) {
//   event.preventDefault();
//   let startDateInput = document.getElementById("startDate");
//   let endDateInput = document.getElementById("endDate");
//   let startDateValue = startDateInput.value;
//   let endDateValue = endDateInput.value;
//   let startDate = new Date(startDateValue);
//   let endDate = new Date(endDateValue);
//   let timeDistance = endDate.getTime() - startDate.getTime();
//   let distanceYear = Math.floor(timeDistance / (1000 * 60 * 60 * 24 * 365));
//   let distanceMonth = Math.floor(timeDistance / (1000 * 60 * 60 * 24 * 30));
//   let distanceDay = Math.floor(timeDistance / (1000 * 60 * 60 * 24));
//   let distanceHours = Math.floor(timeDistance / (1000 * 60 * 60));
//   let distanceMinutes = Math.floor(timeDistance / (1000 * 60));
//   let distanceSeconds = Math.floor(timeDistance / 1000);
//   let startMonth = startDate.getMonth();
//   let endMonth = endDate.getMonth();
//   let startYear = startDate.getFullYear();
//   let endYear = endDate.getFullYear();
//   let diffMonths = (endMonth - startMonth) + (12 * (endYear - startYear));
//   let diffYears = endYear - startYear;
//   }

// function countDate(tanggal1, tanggal2) {
  // let startDateInput = document.getElementById("startDate").value;
  // let endDateInput = document.getElementById("endDate").value;
  // let startDate = new Date (startDateInput);
  // let endDate = new Date (endDateInput);
  // let jarakTime = endDate.getTime() - startDate.getTime();
  // let jarakYear = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 365));
  // let jarakMonth = Math.floor(jarakTime / (1000 * 60 * 60 * 24 * 30));
  // let jarakDay = Math.floor(jarakTime / (1000 * 60 * 60 * 24));
  // let startDay = startDate.getDay();
  // let endDay = endDate.getDay();
  // let startMonth = startDate.getMonth();
  // let endMonth = endDate.getMonth();
  // let startYear = startDate.getFullYear();
  // let endYear = startDate.getFullYear();
  // let diffDay = (endDay - startDay) + (30 * (endMonth - startMonth));
  // let diffMonths = (endMonth - startMonth) + (12 * (endYear - startYear));
  // let diffYears = endYear - startYear;
//   return 

// }

