import { fetchTrending, searchPornhub, getDownloadLinks } from "./services.js";

const app = document.getElementById("app");

let lang = "EN";
let pinVerified = false;

const langText = {
  EN: { trending: "Trending Now", adult: "Adult Zone", pin: "Enter PIN to Access", wrong: "Wrong PIN" },
  HI: { trending: "ट्रेंडिंग", adult: "एडल्ट ज़ोन", pin: "पिन डालें", wrong: "गलत पिन" }
};

function toggleLang() {
  lang = lang === "EN" ? "HI" : "EN";
  renderApp();
}

function verifyPIN() {
  const entered = prompt(langText[lang].pin);
  pinVerified = entered === "0000";
  renderApp();
}

function createCard(item) {
  return `
    <div class="card">
      <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" />
      <div>${item.title || item.name}</div>
    </div>
  `;
}

async function renderApp() {
  const trending = await fetchTrending();
  const adult = pinVerified ? await searchPornhub("indian") : [];

  app.innerHTML = `
    <header>StreamFlix</header>
    <div class="lang-toggle"><button onclick="toggleLang()">Switch to ${lang === "EN" ? "Hindi" : "English"}</button></div>

    <div class="section">
      <h2>${langText[lang].trending}</h2>
      <div class="grid">${trending.map(createCard).join("")}</div>
    </div>

    <div class="section">
      <h2>${langText[lang].adult}</h2>
      ${
        pinVerified
          ? `<div class="grid">${adult.map(item => `<div class="card">${item.title}</div>`).join("")}</div>`
          : `<button class="pin-lock" onclick="verifyPIN()">${langText[lang].pin}</button>`
      }
    </div>
  `;
}

window.toggleLang = toggleLang;
window.verifyPIN = verifyPIN;

renderApp();
