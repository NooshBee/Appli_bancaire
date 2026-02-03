// ======================
// CONFIG
// ======================

// ✅ Bougainvillier officiel
const BOUGAIN = {
  id: "bougain",
  img: "assets/flowers/icons8-bougainvillea-58.png",
  label: "bougainvillier",
  message:
    "C'est un bougainvillier. Je te l’offre comme symbole de notre joie, de notre énergie… et de tout ce que je veux construire avec toi."
};

const TARGET_ID = "bougain";
const MESSAGE_SECONDS = 15;

// ✅ Rareté : plus le nombre est grand, plus il est rare
// Exemple: 6 => ~1 bougain pour 6 fleurs en moyenne
const BOUGAIN_RARITY = 7;

// 🔁 Mets ici TOUS les noms de tes autres fichiers PNG (ceux que tu m’as envoyés)
// Exemple : "fleur-01.png", "fleur-02.png", ...
const OTHER_FLOWER_FILES = [
  // TODO: remplace par tes vrais noms de fichiers :
  // "fleur-01.png",
  // "fleur-02.png",
];

const OTHER_FLOWERS = OTHER_FLOWER_FILES.map((file, idx) => ({
  id: `f${idx + 1}`,
  img: `assets/flowers/${file}`,
  label: "une fleur",
  message:
    "C'est une jolie fleur… mais ce n'est pas un bougainvillier."
}));

const FLOWERS = [...OTHER_FLOWERS, BOUGAIN];

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

const loveTimerEl = document.getElementById("loveTimer");

const giftBtn = document.getElementById("giftBtn");

let overlayTimer = null;
let countdownTimer = null;
let isLocked = false;

let proposalStart = null;
let proposalInterval = null;

let openProgress = 0;
let giftOpened = false;

// ======================
// HELPERS
// ======================
function rand(min, max) { return Math.random() * (max - min) + min; }

function clearTimers() {
  if (overlayTimer) clearTimeout(overlayTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  overlayTimer = null;
  countdownTimer = null;
}

function hideAllScreens() {
  overlay.classList.add("hidden");
  proposal.classList.add("hidden");
  gift.classList.add("hidden");
  burst.classList.add("hidden");
}

function resetToHome() {
  clearTimers();
  stopProposalTimer();
  hideAllScreens();
  isLocked = false;
}

function formatTime(sec) {
  if (sec < 60) return `${sec} seconde${sec > 1 ? "s" : ""}`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m} minute${m > 1 ? "s" : ""} ${s} seconde${s > 1 ? "s" : ""}`;
}

function startProposalTimer() {
  proposalStart = Date.now();
  stopProposalTimer();

  const tick = () => {
    const sec = Math.floor((Date.now() - proposalStart) / 1000);
    loveTimerEl.textContent = `${formatTime(sec)} avant d’accepter mon amour ?`;
  };

  tick();
  proposalInterval = setInterval(tick, 1000);
}

function stopProposalTimer() {
  if (proposalInterval) clearInterval(proposalInterval);
  proposalInterval = null;
}

// ======================
// FLOWERS GENERATION
// ======================
function pickFlowerForSpawn() {
  // ✅ Bougain rare
  const roll = Math.floor(rand(1, BOUGAIN_RARITY + 1)); // 1..RARITY
  if (roll === 1) return BOUGAIN;

  // Sinon une fleur normale
  if (OTHER_FLOWERS.length === 0) return BOUGAIN; // fallback
  return OTHER_FLOWERS[Math.floor(Math.random() * OTHER_FLOWERS.length)];
}

function spawnFloatingFlower(flower) {
  const el = document.createElement("button");
  el.className = "flower";
  el.type = "button";
  el.setAttribute("aria-label", flower.label);

  // ✅ Image PNG à la place de l’emoji
  const img = document.createElement("img");
  img.src = flower.img;
  img.alt = flower.label;
  img.draggable = false;
  img.className = "flowerImg";
  el.appendChild(img);

  // ✅ Glow discret sur le bougainvillier
  if (flower.id === TARGET_ID) el.classList.add("bougainGlow");

  // Position de départ n'importe où
  const x = rand(8, 92);
  const y = rand(10, 92);
  el.style.left = `${x}%`;
  el.style.top = `${y}%`;

  // Trajectoires aléatoires
  el.style.setProperty("--dx1", `${rand(-20, 20)}vw`);
  el.style.setProperty("--dy1", `${rand(-25, 25)}vh`);
  el.style.setProperty("--dx2", `${rand(-30, 30)}vw`);
  el.style.setProperty("--dy2", `${rand(-35, 35)}vh`);

  // ✅ durée en secondes (pas en ms)
  const duration = rand(7, 13);
  const delay = rand(0, 1.2);
  el.style.animation = `drift ${duration}s ease-in-out ${delay}s infinite alternate`;

  el.addEventListener("click", () => onFlowerClick(flower));
  field.appendChild(el);
}

function buildField() {
  field.innerHTML = "";
  const copies = 14;
  for (let i = 0; i < copies; i++) {
    spawnFloatingFlower(pickFlowerForSpawn());
  }
}

// ======================
// INTERACTIONS
// ======================
function showOverlay(flower, onDone) {
  isLocked = true;
  hideAllScreens();

  // ✅ Mettre l’image dans l’overlay
  overlayFlower.innerHTML = "";
  const big = document.createElement("img");
  big.src = flower.img;
  big.alt = flower.label;
  big.className = "overlayImg";
  big.draggable = false;
  overlayFlower.appendChild(big);

  overlayTitle.textContent = `C'est ${flower.label}.`;
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

function onFlowerClick(flower) {
  if (isLocked) return;

  const isTarget = (flower.id === TARGET_ID);

  if (!isTarget) {
    showOverlay(flower, () => {
      resetToHome();
      buildField();
    });
    return;
  }

  // Bougain : overlay puis demande
  showOverlay(flower, () => {
    proposal.classList.remove("hidden");
    startProposalTimer();
    isLocked = false;
  });
}

function playGiftSequence(includeBougain) {
  isLocked = true;
  hideAllScreens();

  // Attendre 5 secondes
  setTimeout(() => {
    gift.classList.remove("hidden");
    setupTapToOpenGift(includeBougain);
    isLocked = false; // on laisse tap sur le cadeau
  }, 5000);
}

// ✅ ouverture progressive au tap
function setupTapToOpenGift(includeBougain) {
  openProgress = 0;
  giftOpened = false;

  giftBtn.style.setProperty("--lid-rot", "0deg");
  giftBtn.style.setProperty("--lid-up", "0px");
  giftBtn.style.animation = "none";

  const onTap = () => {
    if (giftOpened) return;

    openProgress = Math.min(1, openProgress + 0.18); // ~6 taps
    const rot = -35 * openProgress;
    const up = -8 * openProgress;

    giftBtn.style.setProperty("--lid-rot", `${rot}deg`);
    giftBtn.style.setProperty("--lid-up", `${up}px`);

    if (openProgress >= 1) {
      giftOpened = true;
      giftBtn.removeEventListener("click", onTap);

      giftBtn.style.animation = "inflate 900ms ease-in-out forwards";

      setTimeout(() => {
        gift.classList.add("hidden");
        burst.classList.remove("hidden");
        launchBurst(includeBougain);

        setTimeout(() => {
          resetToHome();
          buildField();
        }, 2800);
      }, 950);
    }
  };

  // ⚠️ évite d’empiler plusieurs listeners
  giftBtn.replaceWith(giftBtn.cloneNode(true));
  // On récupère le nouveau bouton cloné
  const newBtn = document.getElementById("giftBtn");
  // réassocier styles
  newBtn.style.setProperty("--lid-rot", "0deg");
  newBtn.style.setProperty("--lid-up", "0px");
  newBtn.style.animation = "none";
  // remettre la référence globale
  window.giftBtn = newBtn;
  window.giftBtn.addEventListener("click", onTap);
}

// ======================
// EXPLOSION
// ======================
function launchBurst(includeBougain) {
  burst.innerHTML = "";

  // Ici tu peux mettre aussi des mini PNG plus tard si tu veux.
  const base = ["💖", "✨", "💐"];
  if (includeBougain) base.push("🌸");
  const petalsCount = 40;

  for (let i = 0; i < petalsCount; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = base[Math.floor(Math.random() * base.length)];

    const startX = 50 + rand(-6, 6);
    const startY = 55 + rand(-6, 6);
    p.style.left = `${startX}%`;
    p.style.top = `${startY}%`;

    p.style.setProperty("--dx", `${rand(-45, 45)}vw`);
    p.style.setProperty("--dy", `${rand(-55, 35)}vh`);
    p.style.setProperty("--rot", `${rand(-180, 180)}deg`);

    const dur = rand(2200, 3400);
    const delay = rand(0, 140);
    p.style.animation = `burstFly ${dur}ms ease-out ${delay}ms forwards`;

    burst.appendChild(p);
  }
}

// ======================
// BUTTONS
// ======================
btnYesWith.addEventListener("click", () => {
  stopProposalTimer();
  playGiftSequence(true);
});

btnYesWithout.addEventListener("click", () => {
  stopProposalTimer();
  playGiftSequence(false);
});

// ======================
// INIT
// ======================
buildField();