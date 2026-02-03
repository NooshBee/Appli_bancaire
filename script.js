// ======================
// CONFIG (à personnaliser)
// ======================
const FLOWERS = [
  { id: "lotus", emoji: "🪷", label: "lotus", message: "C'est un lotus. Il représente la paix que je ressens quand je suis avec toi. Ceci étant… ce n'est pas un bougainvillier." },
  { id: "rose", emoji: "🌹", label: "rose", message: "C'est une rose. Elle représente l’ardeur de mon amour pour toi. Ceci étant… ce n'est pas un bougainvillier." },
  { id: "hibiscus", emoji: "🌺", label: "hibiscus", message: "C'est un hibiscus. Il représente la beauté solaire que tu dégages. Ceci étant… ce n'est pas un bougainvillier." },
  { id: "tulip", emoji: "🌷", label: "tulipe", message: "C'est une tulipe. Elle représente la douceur que tu m’apportes. Ceci étant… ce n'est pas un bougainvillier." },
  // Bougainvillier (choix par défaut 🌸)
  { id: "bougain", emoji: "🌸", label: "bougainvillier", message: "C'est un bougainvillier. Je te l’offre comme symbole de notre joie, de notre énergie… et de tout ce que je veux construire avec toi." }
];

const TARGET_ID = "bougain"; // la bonne fleur
const MESSAGE_SECONDS = 30;

// ======================
// STATE
// ======================
const field = document.getElementById("field");
const overlay = document.getElementById("overlay");
const proposal = document.getElementById("proposal");
const gift = document.getElementById("gift");
const burst = document.getElementById("burst");

const overlayFlower = document.getElementById("overlayFlower");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const countdownEl = document.getElementById("countdown");

const btnYesWith = document.getElementById("btnYesWith");
const btnYesWithout = document.getElementById("btnYesWithout");

let overlayTimer = null;
let countdownTimer = null;
let isLocked = false;

// ======================
// HELPERS
// ======================
function rand(min, max){ return Math.random() * (max - min) + min; }

function clearTimers(){
  if (overlayTimer) clearTimeout(overlayTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  overlayTimer = null;
  countdownTimer = null;
}

function hideAllScreens(){
  overlay.classList.add("hidden");
  proposal.classList.add("hidden");
  gift.classList.add("hidden");
  burst.classList.add("hidden");
}

function resetToHome(){
  clearTimers();
  hideAllScreens();
  isLocked = false;
}

// ======================
// FLOWERS GENERATION
// ======================
function spawnFloatingFlower(flower){
  const el = document.createElement("button");
  el.className = "flower";
  el.type = "button";
  el.setAttribute("aria-label", flower.label);
  el.textContent = flower.emoji;

  // random position near bottom half to float upward
  const x = rand(10, 90);   // %
  const y = rand(65, 95);   // %

  el.style.left = `${x}%`;
  el.style.top  = `${y}%`;

  // animations
  const duration = rand(6.5, 11.5);
  const delay = rand(0, 2.5);
  el.style.animation = `floatUp ${duration}s linear ${delay}s infinite, sway ${rand(2.2, 3.8)}s ease-in-out ${rand(0,1)}s infinite`;

  el.addEventListener("click", () => onFlowerClick(flower));
  field.appendChild(el);
}

function buildField(){
  field.innerHTML = "";
  // spawn multiple instances to feel “filled”
  const copies = 12; // total count on screen
  for (let i=0; i<copies; i++){
    const f = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
    spawnFloatingFlower(f);
  }
}

// ======================
// INTERACTIONS
// ======================
function showOverlay(flower, onDone){
  isLocked = true;
  hideAllScreens();

  overlayFlower.textContent = flower.emoji;
  overlayTitle.textContent = `C'est ${flower.label === "hibiscus" ? "un" : "un"} ${flower.label}.`;
  overlayText.textContent = flower.message;

  overlay.classList.remove("hidden");

  let remaining = MESSAGE_SECONDS;
  countdownEl.textContent = remaining;

  clearTimers();

  countdownTimer = setInterval(() => {
    remaining -= 1;
    countdownEl.textContent = Math.max(0, remaining);
    if (remaining <= 0) clearTimers();
  }, 1000);

  overlayTimer = setTimeout(() => {
    clearTimers();
    overlay.classList.add("hidden");
    if (typeof onDone === "function") onDone();
  }, MESSAGE_SECONDS * 1000);
}

function onFlowerClick(flower){
  if (isLocked) return;

  const isTarget = (flower.id === TARGET_ID);

  if (!isTarget){
    showOverlay(flower, () => {
      // retour accueil
      resetToHome();
      buildField();
    });
    return;
  }

  // Bougainvillier: overlay 30s puis proposition
  showOverlay(flower, () => {
    overlay.classList.add("hidden");
    proposal.classList.remove("hidden");
    isLocked = false; // on autorise les boutons
  });
}

function playGiftSequence(includeBougain){
  isLocked = true;
  hideAllScreens();
  gift.classList.remove("hidden");

  // ouvrir le couvercle après petit délai
  const lid = document.querySelector(".giftLid");
  lid.style.animation = "none";
  void lid.offsetWidth; // reset reflow
  lid.style.animation = "openLid 700ms ease forwards";

  // explosion bouquet
  setTimeout(() => {
    gift.classList.add("hidden");
    burst.classList.remove("hidden");
    launchBurst(includeBougain);

    // retour accueil
    setTimeout(() => {
      resetToHome();
      buildField();
    }, 2200);
  }, 900);
}

function launchBurst(includeBougain){
  burst.innerHTML = "";

  // pool d'emojis selon choix
  const base = ["🪷","🌹","🌺","🌷","💖","✨","💐"];
  if (includeBougain) base.push("🌸"); // bougainvillier
  const petalsCount = 36;

  for (let i=0; i<petalsCount; i++){
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = base[Math.floor(Math.random() * base.length)];

    const startX = 50 + rand(-6, 6); // %
    const startY = 55 + rand(-6, 6); // %
    p.style.left = `${startX}%`;
    p.style.top  = `${startY}%`;

    // trajectoires
    const dx = `${rand(-45, 45)}vw`;
    const dy = `${rand(-55, 35)}vh`;
    const rot = `${rand(-180, 180)}deg`;
    p.style.setProperty("--dx", dx);
    p.style.setProperty("--dy", dy);
    p.style.setProperty("--rot", rot);

    const dur = rand(1100, 1900);
    const delay = rand(0, 120);

    p.style.animation = `burstFly ${dur}ms ease-out ${delay}ms forwards`;
    burst.appendChild(p);
  }
}

// ======================
// BUTTONS
// ======================
btnYesWith.addEventListener("click", () => playGiftSequence(true));
btnYesWithout.addEventListener("click", () => playGiftSequence(false));

// ======================
// INIT
// ======================
buildField();
