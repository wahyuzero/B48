function toggleNightMode() {
    var element = document.body;
    element.classList.toggle("night-mode");
    var div = document.querySelector(".contact-container");
    div.classList.toggle("night-mode");
}

var switchButton = document.querySelector(".switch");
switchButton("click", toggleNightMode);
