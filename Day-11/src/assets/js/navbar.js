let isOpen = false // true
function openhumberger() {
    let humbergerNav = document.getElementById("humberger-container")
    let testing = document.getElementsByClassName("humberger-container")
    console.log(testing);
    if (!isOpen) {
        humbergerNav.style.display = "block";
        isOpen = true
    } else {
        humbergerNav.style.display = "none";
        isOpen = false
    }
}