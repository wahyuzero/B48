let hamburgOpen = false
function openHamburg() {
    let hamburgContainer = document.getElementById("hamburg-container")
    if (!hamburgOpen) {
        hamburgContainer.style.display = "flex"
        hamburgOpen = true;
    } else {
        hamburgContainer.style.display = "none"
        hamburgOpen = false;
    }
}