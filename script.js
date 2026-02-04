// ======================
// CONFIG
// ======================
const TARGET_ID = "bougain";
const MESSAGE_SECONDS = 0;

const MIN_PER_VARIETY = 3; // 3 de chaque variété => 54
const FLOW_SIZE = 54;      // taille des bulles (doit matcher ton CSS .flower width/height)
const RADIUS = FLOW_SIZE / 2;

const BOUNCE_SPEED_MIN = 18; // px/s (lent)
const BOUNCE_SPEED_MAX = 42; // px/s (plus vivant)

// --- FLOWERS ---
const FLOWERS = [
  { id: "f1", img: "https://github.com/user-attachments/assets/c3365114-7047-4c05-ae8c-2a6fc07f2c17", label: "bégonia", message: "Symbole de la prudence et de la protection… mais ce n’est pas un bougainvillier." },
  { id: "bougain", img: "https://github.com/user-attachments/assets/8fb5b985-b8b4-4a9a-ae6f-2515ceb81f5f", label: "bougainvillier", isBougain: true, message: "Ta fleur préféré haha Je te l’offre comme symbole de l'abondance et de la joie que je ressens lorsque je suis avec toi." },
  { id: "f3", img: "https://github.com/user-attachments/assets/ad8ed4b0-6b57-4107-8944-1f20969afaa0", label: "broméliacée", message: "Celle-ci représente la résilience, l'unité... mais ce n’est pas un bougainvillier." },
  { id: "f4", img: "https://github.com/user-attachments/assets/44ec2ab6-626a-458b-aeaf-6ad533073a35", label: "hibiscus", message: "Pour ta féminité, ta douceur... mais ce n’est pas un bougainvillier." },
  { id: "f5", img: "https://github.com/user-attachments/assets/e3501e12-5593-49d2-b2e9-74ff90614195", label: "hibiscus", message: "Une autre hibiscus, symbole de ta beauté... mais ce n’est pas un bougainvillier." },
  { id: "f6", img: "https://github.com/user-attachments/assets/35883ac8-2875-4750-8530-5cef93520c69", label: "hoya", message: "Symbole de l'attachement que j'ai pour toi... mais ce n’est pas un bougainvillier." },
  { id: "f7", img: "https://github.com/user-attachments/assets/26929324-4854-46b5-a605-3602f1e14e5f", label: "hortensia", message: "Une fleur qui exprime ma gratitude et la reconnaissance que j'ai envers toi... mais ce n’est pas un bougainvillier." },
  { id: "f8", img: "https://github.com/user-attachments/assets/a94dff84-db3f-48d9-a9a8-427442028893", label: "jasmin", message: "Parce que ton amour m'apaise... il est doux... mais ce n’est pas un bougainvillier." },
  { id: "f9", img: "https://github.com/user-attachments/assets/700c902d-0b1c-4db9-9ae9-03fcb27e42bf", label: "jasmin", message: "Une autre fleur de jasmin, pour la patience que tu m'accordes... mais ce n’est pas un bougainvillier." },
  { id: "f10", img: "https://github.com/user-attachments/assets/e2a37172-6e1e-48cb-899c-f8fae75f9f5e", label: "lantana", message: "Parce que cette relation nous apporte énormément de changements... et aussi de belles surprises... mais ce n’est pas un bougainvillier." },
  { id: "f11", img: "https://github.com/user-attachments/assets/77017518-486b-4662-87eb-12859cf70208", label: "lys", message: "Lily pour les intimes... pour l'équilibre qu'on se crée toutes les trois... mais ce n’est pas un bougainvillier." },
  { id: "f12", img: "https://github.com/user-attachments/assets/a906a7eb-04f3-4b99-9d12-20ed16240c75", label: "orchidée", message: "Une petite fleur luxueuse et rafinée, comme toi... mais ce n’est pas un bougainvillier." },
  { id: "f13", img: "https://github.com/user-attachments/assets/e4e3503c-b7bd-4486-88e9-a4da224a5c18", label: "poinsettia", message: "Représentation de la renaissance, la transformation... mais ce n’est pas un bougainvillier." },
  { id: "f14", img: "https://github.com/user-attachments/assets/82e25fe3-6541-441b-a9b3-b10bead438c7", label: "rose", message: "La fleur de l'amour universel, l'amour pur...mais ce n’est pas un bougainvillier." },
  { id: "f15", img: "https://github.com/user-attachments/assets/f82fd824-6847-49ee-b7f8-e6cea4f5a7af", label: "sisyrinchium", message: "Cette fleur, c’est la confiance, la tranquilité, la simplicité... mais ce n’est pas un bougainvillier." },
  { id: "f16", img: "https://github.com/user-attachments/assets/d192016c-4938-41c3-872b-3a322ae6a36b", label: "arugula", message: "Définition de l'attirance physique que j'ai pour toi...l'amour du corps lorsque les mots sont muets...mais ce n’est pas un bougainvillier." },
  { id: "f17", img: "https://github.com/user-attachments/assets/66bafcaa-49d8-47cd-b2ba-484869d76c6a", label: "amaryllis", message: "La fierté que je ressens lorsque mes yeux se posent sur toi ...mais ce n’est pas un bougainvillier." },
  { id: "f18", img: "https://github.com/user-attachments/assets/0521e833-0503-407f-95a8-afea74a7d9c0", label: "anthurium", message: "Pour te remercier de m'avoir acceuilli...dans ton environnement... physique et spirituel...mais ce n'est pas un bougainvillier." }
];

// ======================
// DOM
// ======================
const field = document.getElementById("field");
const overlay = document.getElementById("overlay");
const proposal = document.getElementById("proposal");
const gift = document.getElementById("gift");
const burst = document.getElementById("burst");

const overlayFlower = document.getElementById("overlayFlower");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");

const btnYesWith = document.getElementById("btnYesWith");
const btnYesWithout = document.getElementById("btnYesWithout");
const loveTimerEl = document.getElementById("loveTimer");

const topHeader = document.querySelector(".top");

// ======================
// STATE
// ======================
let overlayTimer = null;
let countdownTimer = null;
let isLocked = false;

let proposalStart = null;
let proposalInterval = null;

let animId = null;
let lastT = null;

// 54 fleurs “physiques”
const flowersState = []; // { flower, el, x, y, vx, vy }

// ======================
// HELPERS
// ======================
function rand(min, max){ return Math.random() * (max - min) + min; }

function shuffleInPlace(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

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
  stopProposalTimer();
  hideAllScreens();
  if (topHeader) topHeader.classList.remove("hideTop");
  isLocked = false;
}

function formatTime(sec){
  if (sec < 60) return `${sec} seconde${sec>1?"s":""}`;
  const m = Math.floor(sec/60);
  const s = sec % 60;
  return `${m} minute${m>1?"s":""} ${s} seconde${s>1?"s":""}`;
}

function startProposalTimer(){
  proposalStart = Date.now();
  stopProposalTimer();

  const tick = () => {
    const sec = Math.floor((Date.now() - proposalStart)/1000);
    loveTimerEl.textContent = `${formatTime(sec)} avant d’accepter mon amour ? Really ?`;
  };
  tick();
  proposalInterval = setInterval(tick, 1000);
}

function stopProposalTimer(){
  if (proposalInterval) clearInterval(proposalInterval);
  proposalInterval = null;
}

// Zone “carte d’accueil” : on rebondit dessus
function getCardRect(){
  const card = document.querySelector(".topCard") || document.querySelector(".top");
  if (!card) return null;

  const r = card.getBoundingClientRect();
  const pad = 10;
  return { left: r.left - pad, right: r.right + pad, top: r.top - pad, bottom: r.bottom + pad };
}

// Test cercle vs rect (simple)
function circleIntersectsRect(cx, cy, radius, rect){
  const closestX = Math.max(rect.left, Math.min(cx, rect.right));
  const closestY = Math.max(rect.top, Math.min(cy, rect.bottom));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return (dx*dx + dy*dy) <= radius*radius;
}

// ======================
// BUILD 54 fleurs fixes
// ======================
function buildField(){
  field.innerHTML = "";
  flowersState.length = 0;

  const list = [];
  FLOWERS.forEach(f => { for (let i=0;i<MIN_PER_VARIETY;i++) list.push(f); });
  shuffleInPlace(list);

  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i=0;i<list.length;i++){
    const flower = list[i];
    const el = createFlowerElement(flower);

    let x = rand(RADIUS, w - RADIUS);
    let y = rand(RADIUS, h - RADIUS);

    const rect = getCardRect();
    let tries = 0;
    while (rect && circleIntersectsRect(x, y, RADIUS, rect) && tries < 80){
      x = rand(RADIUS, w - RADIUS);
      y = rand(RADIUS, h - RADIUS);
      tries++;
    }

    const speed = rand(BOUNCE_SPEED_MIN, BOUNCE_SPEED_MAX);
    const ang = rand(0, Math.PI * 2);
    const vx = Math.cos(ang) * speed;
    const vy = Math.sin(ang) * speed;

    flowersState.push({ flower, el, x, y, vx, vy });
    field.appendChild(el);
    renderOne({ el, x, y });
  }

  startAnimation();
}

function createFlowerElement(flower){
  const el = document.createElement("button");
  el.className = "flower";
  el.type = "button";
  el.setAttribute("aria-label", flower.label);

  el.style.animation = "none";

  const img = document.createElement("img");
  img.src = flower.img;
  img.alt = flower.label;
  img.draggable = false;
  img.className = "flowerImg";
  el.appendChild(img);

  if (flower.id === TARGET_ID) el.classList.add("bougainGlow");

  el.addEventListener("click", () => onFlowerClick(flower));
  return el;
}

function renderOne(s){
  s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
}

// ======================
// ANIMATION (rebonds)
// ======================
function startAnimation(){
  stopAnimation();
  lastT = null;

  const loop = (t) => {
    if (!lastT) lastT = t;
    const dt = Math.min(0.033, (t - lastT) / 1000);
    lastT = t;

    stepPhysics(dt);
    animId = requestAnimationFrame(loop);
  };

  animId = requestAnimationFrame(loop);
}

function stopAnimation(){
  if (animId) cancelAnimationFrame(animId);
  animId = null;
}

function stepPhysics(dt){
  const w = window.innerWidth;
  const h = window.innerHeight;
  const rect = getCardRect();

  for (const s of flowersState){
    let nx = s.x + s.vx * dt;
    let ny = s.y + s.vy * dt;

    if (nx < RADIUS){ nx = RADIUS; s.vx *= -1; }
    if (nx > w - RADIUS){ nx = w - RADIUS; s.vx *= -1; }
    if (ny < RADIUS){ ny = RADIUS; s.vy *= -1; }
    if (ny > h - RADIUS){ ny = h - RADIUS; s.vy *= -1; }

    if (rect && circleIntersectsRect(nx, ny, RADIUS, rect)){
      const prevX = s.x;
      const prevY = s.y;

      const tryX = { x: prevX - s.vx * dt, y: ny };
      const hitX = circleIntersectsRect(tryX.x, tryX.y, RADIUS, rect);

      const tryY = { x: nx, y: prevY - s.vy * dt };
      const hitY = circleIntersectsRect(tryY.x, tryY.y, RADIUS, rect);

      if (!hitX && hitY) s.vx *= -1;
      else if (hitX && !hitY) s.vy *= -1;
      else { s.vx *= -1; s.vy *= -1; }

      nx = s.x + s.vx * dt * 1.2;
      ny = s.y + s.vy * dt * 1.2;
    }

    s.x = nx;
    s.y = ny;
    renderOne(s);
  }
}

// ======================
// INTERACTIONS
// ======================
function showOverlay(flower, onDone){
  isLocked = true;
  hideAllScreens();

  overlayFlower.innerHTML = "";
  const big = document.createElement("img");
  big.src = flower.img;
  big.alt = flower.label;
  big.className = "overlayImg";
  big.draggable = false;
  overlayFlower.appendChild(big);

  overlayTitle.textContent = `Voici ${flower.label}`;
  overlayText.textContent = flower.message;

  overlay.classList.remove("hidden");
  clearTimers();

  const card = overlay.querySelector(".card");
  if (!card) return;

  // Si tu n’as plus <p class="hint"> dans le HTML, on le crée proprement
  let hint = overlay.querySelector(".hint");
  if (!hint){
    hint = document.createElement("p");
    hint.className = "hint";
    card.appendChild(hint);
  }

  const isTarget = (flower.id === TARGET_ID);
  hint.innerHTML = isTarget ? "Bien joué sexy ! 🥳😂" : "👆🏾 Touche la carte pour réessayer 👆🏾";

  const close = () => {
    overlay.classList.add("hidden");
    card.removeEventListener("pointerdown", close);
    card.removeEventListener("touchstart", close);
    if (typeof onDone === "function") onDone();
  };

  card.addEventListener("pointerdown", close);
  card.addEventListener("touchstart", close, { passive: true });
}

function onFlowerClick(flower){
  if (isLocked) return;

  const isTarget = (flower.id === TARGET_ID);

  if (!isTarget){
    showOverlay(flower, () => resetToHome());
    return;
  }

  showOverlay(flower, () => {
    hideAllScreens();
    if (topHeader) topHeader.classList.add("hideTop");
    proposal.classList.remove("hidden");
    startProposalTimer();
    isLocked = false;
  });
}

// ======================
// GIFT SEQUENCE
// ======================
function playGiftSequence(includeBougain){
  isLocked = true;
  hideAllScreens();
  if (topHeader) topHeader.classList.add("hideTop");
  stopProposalTimer();

  setTimeout(() => {
    gift.classList.remove("hidden");
    setupTapToOpenGift(includeBougain);
    isLocked = false;
  }, 5000);
}

function setupTapToOpenGift(includeBougain){
  let giftBtn = document.getElementById("giftBtn");
  if (!giftBtn) return;

  giftBtn.style.setProperty("--lid-rot", "0deg");
  giftBtn.style.setProperty("--lid-up", "0px");
  giftBtn.style.animation = "none";

  const newBtn = giftBtn.cloneNode(true);
  giftBtn.parentNode.replaceChild(newBtn, giftBtn);

  let openProgress = 0;
  let giftOpened = false;

  newBtn.addEventListener("click", () => {
    if (giftOpened) return;

    openProgress = Math.min(1, openProgress + 0.18);
    newBtn.style.setProperty("--lid-rot", `${-35 * openProgress}deg`);
    newBtn.style.setProperty("--lid-up", `${-8 * openProgress}px`);

    if (openProgress >= 1){
      giftOpened = true;
      newBtn.style.animation = "inflate 900ms ease-in-out forwards";

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
  });
}

// ======================
// EXPLOSION
// ======================
function launchBurst(includeBougain){
  burst.innerHTML = "";

  const base = ["💖","✨","💐"];
  if (includeBougain) base.push("🌸");

  const petalsCount = 40;

  for (let i=0; i<petalsCount; i++){
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = base[Math.floor(Math.random() * base.length)];

    p.style.left = `${50 + rand(-6, 6)}%`;
    p.style.top  = `${55 + rand(-6, 6)}%`;

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
btnYesWith.addEventListener("click", () => playGiftSequence(true));
btnYesWithout.addEventListener("click", () => playGiftSequence(false));

window.addEventListener("resize", () => buildField());

// ======================
// INIT
// ======================
resetToHome();
buildField();