const navbar = document.getElementById("navbar")
const open = document.getElementById("open");
const close = document.getElementById("close");

open.addEventListener("click", () => {
  navbar.setAttribute('data-visible', "true");
})

close.addEventListener("click", () => {
  navbar.setAttribute('data-visible', "false");
})

