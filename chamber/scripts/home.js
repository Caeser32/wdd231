const API_KEY = "7d0392c4689279935bb6db24e5f2ecab";
const LAT = -25.75;
const LON = 28.23;

async function getWeather() {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);
        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        document.getElementById("weather-current").innerHTML = "<p>Weather data is currently unavailable.</p>";
        document.getElementById("weather-forecast").innerHTML = "<p>Forecast data is currently unavailable.</p>";
    }
}

function capitalize(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

function displayCurrentWeather(data) {
    const container = document.getElementById("weather-current");
    const temp = Math.round(data.main.temp);
    const desc = capitalize(data.weather[0].description);
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);

    container.innerHTML = `
        <div class="weather-now">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="80" height="80">
            <div>
                <p class="weather-temp">${temp}&deg;C</p>
                <p class="weather-desc">${desc}</p>
                <p>High: ${high}&deg;C &bull; Low: ${low}&deg;C</p>
                <p>Humidity: ${humidity}%</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.getElementById("weather-forecast");
    const today = new Date().toDateString();
    const days = [];

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toDateString();
        const hour = date.getHours();

        if (dateStr !== today && hour >= 11 && hour <= 13) {
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            if (!days.find(d => d.name === dayName) && days.length < 3) {
                days.push({
                    name: dayName,
                    temp: Math.round(item.main.temp)
                });
            }
        }
    });

    if (days.length === 0) {
        container.innerHTML = "<p>Forecast not available yet.</p>";
        return;
    }

    container.innerHTML = days.map(day =>
        `<div class="forecast-day">
            <p class="forecast-name">${day.name}</p>
            <p class="forecast-temp">${day.temp}&deg;C</p>
        </div>`
    ).join("");
}

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        const qualified = data.members.filter(m => m.membershipLevel >= 2);

        for (let i = qualified.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [qualified[i], qualified[j]] = [qualified[j], qualified[i]];
        }

        const count = Math.min(qualified.length, Math.random() < 0.5 ? 2 : 3);
        const selected = qualified.slice(0, count);
        displaySpotlights(selected);
    } catch (error) {
        document.getElementById("spotlight-cards").innerHTML = "<p>Spotlight data is currently unavailable.</p>";
    }
}

function displaySpotlights(members) {
    const container = document.getElementById("spotlight-cards");
    container.innerHTML = "";
    const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        const img = document.createElement("img");
        img.src = `images/${member.image}`;
        img.alt = `${member.name} logo`;
        img.loading = "lazy";
        img.width = 80;
        img.height = 80;

        const name = document.createElement("h3");
        name.textContent = member.name;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const address = document.createElement("p");
        address.textContent = member.address;

        const link = document.createElement("a");
        link.href = member.website;
        link.textContent = "Visit Website";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const level = document.createElement("p");
        level.classList.add("membership");
        level.textContent = `${levels[member.membershipLevel]} Member`;
        if (member.membershipLevel === 3) level.classList.add("gold");
        if (member.membershipLevel === 2) level.classList.add("silver");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(link);
        card.appendChild(level);
        container.appendChild(card);
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

getWeather();
getSpotlights();
