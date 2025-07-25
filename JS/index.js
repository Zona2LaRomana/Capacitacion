const header = document.querySelector("header")
const menuBtn = document.getElementById("menu-btn")
const closeMenuBtn = document.getElementById("close-menu-btn")

menuBtn.addEventListener("click", () =>{
    header.classList.toggle("show-mobile-menu")
})

closeMenuBtn.addEventListener("click", () =>{
    menuBtn.click()
})