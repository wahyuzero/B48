const posts = [];

function addPost(event) {
  event.preventDefault();

  let judul = document.getElementById("projectName").value;
  let tanggal1 = document.getElementById("startDate").value;
  let tanggal2 = document.getElementById("endDate").value;
  let konten = document.getElementById("konten").value;
  let image = document.getElementById("file-input").files;


  
  // Bocoran dari mas guswandi di Discord, tengkyu maseh
  const nodeJsimg = `<img src="assets/minilogo/nodejs.png" />`;
  const reactJsimg = `<img src="assets/minilogo/reactjs.png" />`;
  const nextJsimg = `<img src="assets/minilogo/nextjs.png" />`;
  const typeScriptJsimg = `<img src="assets/minilogo/typescr.png" />`;
  let nodeJs = document.getElementById("nodeJs").checked ? nodeJsimg : "";
  let reactJs = document.getElementById("reactJs").checked ? reactJsimg : "";
  let nextJs = document.getElementById("nextJs").checked ? nextJsimg : "";
  let typeScript = document.getElementById("typeScript").checked ? typeScriptJsimg : "";
  // Bocoran dari mas guswandi di Discord, tengkyu maseh


  if (!judul || !tanggal1 || !tanggal2 || !konten || !image) {
    alert("Masih ada yang kosong, tolong dilengkapi ya manis :)");
    return;
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
    postAt: `${tanggal1}`,
  };

  posts.push(post);
  console.log(posts);
  renderPost();
}

function renderPost(event) {
  document.getElementById("kontent").innerHTML = "";
  for (let index = 0; index < posts.length; index++) {
    document.getElementById("kontent").innerHTML += `
      <div class="card">
        <div class="card-image">
          <img src="${posts[index].image}" alt="assets/404.jpg">
        </div>
        <h3 class="card-heading"><a href="blog-detail.html">${posts[index].judul}</a></h3>
        <h6>${posts[index].author} | ${posts[index].postAt}</h6>
        <h5>$hari, bulan, tahun yang lalu</h5>
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

