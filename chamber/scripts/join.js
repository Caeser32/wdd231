document.getElementById("timestamp").value = new Date().toISOString();

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamburger.innerHTML = nav.classList.contains("open") ? "&#10005;" : "&#9776;";
});

document.querySelectorAll(".card-link").forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        document.getElementById(modalId).showModal();
    });
});

document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});

document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });
});
