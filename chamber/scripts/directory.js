const directory = document.getElementById("directory");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

gridBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
    gridBtn.classList.add("active-btn");
    listBtn.classList.remove("active-btn");
});

listBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
    listBtn.classList.add("active-btn");
    gridBtn.classList.remove("active-btn");
});

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    directory.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const img = document.createElement("img");
        img.src = `images/${member.image}`;
        img.alt = `${member.name} logo`;
        img.loading = "lazy";
        img.width = 100;
        img.height = 100;

        const name = document.createElement("h3");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const link = document.createElement("a");
        link.href = member.website;
        link.textContent = "Visit Website";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const level = document.createElement("p");
        level.classList.add("membership");
        const levels = { 1: "Member", 2: "Silver", 3: "Gold" };
        level.textContent = `Membership: ${levels[member.membershipLevel]}`;
        if (member.membershipLevel === 3) level.classList.add("gold");
        if (member.membershipLevel === 2) level.classList.add("silver");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(link);
        card.appendChild(level);
        directory.appendChild(card);
    });
}

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamburger.innerHTML = nav.classList.contains("open") ? "&#10005;" : "&#9776;";
});

getMembers();
