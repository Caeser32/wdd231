import discover from "../data/discover.mjs";

const discoverContainer = document.getElementById("discover-cards");
const visitorMessageContainer = document.getElementById("visitor-message");

function buildCards(items) {
    items.forEach(function (item) {
        const card = document.createElement("div");
        card.classList.add("discover-card");

        const title = document.createElement("h2");
        title.textContent = item.name;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = "images/" + item.photo;
        img.alt = item.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = item.address;

        const description = document.createElement("p");
        description.textContent = item.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.addEventListener("click", function () {
            window.open(item.url, "_blank");
        });

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        discoverContainer.appendChild(card);
    });
}

function displayVisitorMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (lastVisit === null) {
        visitorMessageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const difference = now - Number(lastVisit);
        const millisecondsPerDay = 86400000;
        const daysBetween = Math.floor(difference / millisecondsPerDay);

        if (daysBetween < 1) {
            visitorMessageContainer.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitorMessageContainer.textContent = "You last visited 1 day ago.";
        } else {
            visitorMessageContainer.textContent = "You last visited " + daysBetween + " days ago.";
        }
    }

    localStorage.setItem("lastVisit", now.toString());
}

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", function () {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
        hamburger.innerHTML = "&#10005;";
    } else {
        hamburger.innerHTML = "&#9776;";
    }
});

buildCards(discover);
displayVisitorMessage();
