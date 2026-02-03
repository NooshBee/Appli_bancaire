// ======================
// CONFIG
// ======================
const TARGET_ID = "bougain";
const MESSAGE_SECONDS = 15;

// plus grand = plus rare (ex: 7 => ~1 bougain pour 7 spawns)
const BOUGAIN_RARITY = 7;

// --- FLOWERS ---
const FLOWERS = [
  {
    id: "f1",
    img: "https://github.com/user-attachments/assets/c3365114-7047-4c05-ae8c-2a6fc07f2c17",
    label: "une fleur",
    message: "Cette fleur me fait penser à la douceur de tes gestes… mais ce n’est pas un bougainvillier."
  },
  {
    id: "bougain",
    img: "https://github.com/user-attachments/assets/8fb5b985-b8b4-4a9a-ae6f-2515ceb81f5f",
    label: "un bougainvillier",
    isBougain: true,
    message: "C'est un bougainvillier. Je te l’offre comme symbole de notre joie, de notre énergie… et de tout ce que je veux construire avec toi."
  },
  {
    id: "f3",
    img: "https://github.com/user-attachments/assets/ad8ed4b0-6b57-4107-8944-1f20969afaa0",
    label: "une fleur",
    message: "Celle-ci, c’est l’élégance. Comme toi quand tu ne fais rien… et que tu brilles quand même. (Mais ce n’est pas un bougainvillier.)"
  },
  {
    id: "f4",
    img: "https://github.com/user-attachments/assets/44ec2ab6-626a-458b-aeaf-6ad533073a35",
    label: "une fleur",
    message: "Une fleur pleine d’énergie… comme toi quand tu me donnes envie d’être meilleure. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f5",
    img: "https://github.com/user-attachments/assets/e3501e12-5593-49d2-b2e9-74ff90614195",
    label: "une fleur",
    message: "Ça ressemble à un petit secret… et j’adore tes secrets. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f6",
    img: "https://github.com/user-attachments/assets/35883ac8-2875-4750-8530-5cef93520c69",
    label: "une fleur",
    message: "Celle-là, c’est la tendresse. Celle qui calme mon cœur quand je pense à toi… mais ce n’est pas un bougainvillier."
  },
  {
    id: "f7",
    img: "https://github.com/user-attachments/assets/26929324-4854-46b5-a605-3602f1e14e5f",
    label: "une fleur",
    message: "Une fleur qui dit “je suis là”. Comme moi, quand tu doutes. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f8",
    img: "https://github.com/user-attachments/assets/a94dff84-db3f-48d9-a9a8-427442028893",
    label: "une fleur",
    message: "Elle me fait penser à tes sourires qui arrivent sans prévenir… et qui me restent dans la tête. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f9",
    img: "https://github.com/user-attachments/assets/700c902d-0b1c-4db9-9ae9-03fcb27e42bf",
    label: "une fleur",
    message: "Celle-ci a un côté “rayon de soleil”. Et toi, tu sais exactement comment me réchauffer. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f10",
    img: "https://github.com/user-attachments/assets/e2a37172-6e1e-48cb-899c-f8fae75f9f5e",
    label: "une fleur",
    message: "Une fleur douce, mais avec du caractère… ça te ressemble trop. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f11",
    img: "https://github.com/user-attachments/assets/77017518-486b-4662-87eb-12859cf70208",
    label: "une fleur",
    message: "Elle est trop mignonne… mais ce n’est pas encore la bonne. Pas un bougainvillier."
  },
  {
    id: "f12",
    img: "https://github.com/user-attachments/assets/a906a7eb-04f3-4b99-9d12-20ed16240c75",
    label: "une fleur",
    message: "Celle-là, c’est la passion. La vraie. Et oui… j’en ai pour toi. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f13",
    img: "https://github.com/user-attachments/assets/e4e3503c-b7bd-4486-88e9-a4da224a5c18",
    label: "une fleur",
    message: "Une petite fleur qui dit “viens”. Et moi je viens toujours vers toi. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f14",
    img: "https://github.com/user-attachments/assets/82e25fe3-6541-441b-a9b3-b10bead438c7",
    label: "une fleur",
    message: "Elle me fait penser à tes yeux quand tu es concentrée… et je fonds. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f15",
    img: "https://github.com/user-attachments/assets/f82fd824-6847-49ee-b7f8-e6cea4f5a7af",
    label: "une fleur",
    message: "Cette fleur, c’est l’affection tranquille. Celle qui dure. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f16",
    img: "https://github.com/user-attachments/assets/d192016c-4938-41c3-872b-3a322ae6a36b",
    label: "une fleur",
    message: "Jolie, délicate… et pourtant forte. Ça te décrit parfaitement. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f17",
    img: "https://github.com/user-attachments/assets/66bafcaa-49d8-47cd-b2ba-484869d76c6a",
    label: "une fleur",
    message: "Une fleur qui donne envie de dire merci… merci d’être toi. Mais ce n’est pas un bougainvillier."
  },
  {
    id: "f18",
    img: "https://github.com/user-attachments/assets/0521e833-0503-407f-95a8-afea74a7d9c0",
    label: "une fleur",
    message: "Encore une belle fleur… mais la bonne fleur, c’est celle qui me mène à toi. Pas un bougainvillier."
  }
];


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
let proposalStart = null;
let proposalInterval = null;

const giftBtn = document.getElementById("giftBtn");
let openProgress = 0;
let giftOpened = false;

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
  stopProposalTimer();
  hideAllScreens();
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
    loveTimerEl.textContent = `${formatTime(sec)} avant d’accepter mon amour ?`;
  };

  tick();
  proposalInterval = setInterval(tick, 1000);
}

function stopProposalTimer(){
  if (proposalInterval) clearInterval(proposalInterval);
  proposalInterval = null;
}

// ======================
// FLOWERS GENERATION (rarity + drift everywhere)
// ======================
const BOUGAIN = FLOWERS.find(f => f.id === TARGET_ID);

function pickFlowerForSpawn(){
  // bougain rare
  const roll = Math.floor(rand(1, BOUGAIN_RARITY + 1)); // 1..rarity
  if (roll === 1 && BOUGAIN) return BOUGAIN;

  // autres fleurs
  const others = FLOWERS.filter(f => f.id !== TARGET_ID);
  return others[Math.floor(Math.random() * others.length)];
}

function spawnFloatingFlower(flower){
  const el = document.createElement("button");
  el.className = "flower";
  el.type = "button";
  el.setAttribute("aria-label", flower.label);

  // image
  const img = document.createElement("img");
  img.src = flower.img;
  img.alt = flower.label;
  img.draggable = false;
  img.className = "flowerImg";
  el.appendChild(img);

  // glow sur bougainvillier
  if (flower.id === TARGET_ID) el.classList.add("bougainGlow");

  // position départ
  el.style.left = `${rand(8, 92)}%`;
  el.style.top  = `${rand(10, 92)}%`;

  // trajectoires
  el.style.setProperty("--dx1", `${rand(-20, 20)}vw`);
  el.style.setProperty("--dy1", `${rand(-25, 25)}vh`);
  el.style.setProperty("--dx2", `${rand(-30, 30)}vw`);
  el.style.setProperty("--dy2", `${rand(-35, 35)}vh`);

  const duration = rand(7, 13); // secondes
  const delay = rand(0, 1.2);
  el.style.animation = `drift ${duration}s ease-in-out ${delay}s infinite alternate`;

  el.addEventListener("click", () => onFlowerClick(flower));
  field.appendChild(el);
}

function buildField(){
  field.innerHTML = "";
  const copies = 14;
  for (let i=0; i<copies; i++){
    spawnFloatingFlower(pickFlowerForSpawn());
  }
}

// ======================
// INTERACTIONS
// ======================
function showOverlay(flower, onDone){
  isLocked = true;
  hideAllScreens();

  // image dans l’overlay
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

function onFlowerClick(flower){
  if (isLocked) return;

  const isTarget = (flower.id === TARGET_ID);

  if (!isTarget){
    showOverlay(flower, () => {
      resetToHome();
      buildField();
    });
    return;
  }

  // bougain
  showOverlay(flower, () => {
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
  stopProposalTimer();

  // attente 5s après choix
  setTimeout(() => {
    gift.classList.remove("hidden");
    setupTapToOpenGift(includeBougain);
    isLocked = false;
  }, 5000);
}

function setupTapToOpenGift(includeBougain){
  openProgress = 0;
  giftOpened = false;

  giftBtn.style.setProperty("--lid-rot", "0deg");
  giftBtn.style.setProperty("--lid-up", "0px");
  giftBtn.style.animation = "none";

  // on évite d’empiler les listeners
  const newBtn = giftBtn.cloneNode(true);
  giftBtn.parentNode.replaceChild(newBtn, giftBtn);

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

// ======================
// INIT
// ======================
buildField();
