document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamburger.innerHTML = nav.classList.contains("open") ? "&#10005;" : "&#9776;";
});

const params = new URLSearchParams(window.location.search);
document.getElementById("display-first").textContent = params.get("first-name");
document.getElementById("display-last").textContent = params.get("last-name");
document.getElementById("display-email").textContent = params.get("email");
document.getElementById("display-phone").textContent = params.get("phone");
document.getElementById("display-org").textContent = params.get("org-name");
document.getElementById("display-timestamp").textContent = params.get("timestamp");
