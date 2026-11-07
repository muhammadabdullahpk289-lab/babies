/* ================= CUSTOMIZE HERE ================= */

const CONFIG = {
  music: "music/birthday.mp3",

  // Example: "2026-05-07"
  // Empty rakho agar days counter nahi chahiye.
  birthDate: "",

  kids: [
    {
      name: "Halima",
      role: "Our Little Princess",
      badge: "Baby Girl",
      color: "#e0709e",
      photo: "images/halima.jpeg",
      wish: "Meri pyari gudiya, hamesha khush raho. Allah tumhein dher saari khushiyan, sehat aur lambi umar de. Ameen!"
    },
    {
      name: "Noor",
      role: "Our Sweet Angel",
      badge: "Baby Girl",
      color: "#b28ae8",
      photo: "images/noor.jpeg",
      wish: "Tumhari masoom hansi ghar ki jaan hai. Allah tumhein nazar-e-bad se bachaye aur hamesha khush rakhe."
    },
    {
      name: "Abu-Bakar",
      role: "Our Little Prince",
      badge: "Baby Boy",
      color: "#68b5ed",
      photo: "images/abubakar.jpeg",
      wish: "Mere chhote shehzade, Allah tumhein nek, sehatmand aur kamyab banaye. Dher saari duain aur pyar!"
    }
  ],

  // Gallery ki third image group photo hai.
  gallery: [
    "images/halima.jpeg",
    "images/noor.jpeg",
    "images/all.jpeg",
    "images/abubakar.jpeg",
    "images/halima.jpeg"
  ],

  wishes: [
    "Allah aap teeno ko hamesha salamat rakhe 🤲",
    "Aap ki saari khwahishein poori hon 💫",
    "Hamesha khush aur salamat raho ❤️"
  ]
};


/* ================= HELPERS ================= */

const $ = id => document.getElementById(id);

const random = (min, max) =>
  Math.random() * (max - min) + min;


/* ================= KIDS CARDS ================= */

const names = CONFIG.kids.map(kid => kid.name);

$("names").textContent = names.join(" ♥ ");

CONFIG.kids.forEach((kid, index) => {

  const card = document.createElement("article");
  card.className = "card";
  card.style.setProperty("--accent", kid.color);
  card.style.transitionDelay = `${index * 0.15}s`;

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = kid.badge;

  const role = document.createElement("div");
  role.className = "tag gold";
  role.textContent = kid.role;

  const photo = document.createElement("img");
  photo.className = "kid-photo";
  photo.src = kid.photo;
  photo.alt = `${kid.name}'s photo`;
  photo.loading = "lazy";

  photo.onerror = () => {
    photo.alt = `${kid.name}'s photo unavailable`;
    photo.style.display = "none";
  };

  const heading = document.createElement("h2");
  heading.className = "gold";
  heading.textContent = `Happy Half Birthday ${kid.name}`;

  const age = document.createElement("div");
  age.className = "age";
  age.textContent = "6 MONTHS";

  const wish = document.createElement("p");
  wish.textContent = kid.wish;

  const hug = document.createElement("button");
  hug.className = "hug";
  hug.type = "button";
  hug.innerHTML = '🤗 Send a Hug (<span>0</span>)';

  let hugs = 0;

  hug.addEventListener("click", event => {
    hugs++;
    hug.querySelector("span").textContent = hugs;

    for (let i = 0; i < 6; i++) {
      createHeart(event.clientX, event.clientY);
    }
  });

  inner.append(
    badge,
    role,
    photo,
    heading,
    age,
    wish,
    hug
  );

  card.appendChild(inner);
  $("kids-grid").appendChild(card);
});


/* ================= DAYS COUNTER ================= */

if (CONFIG.birthDate) {

  const birth = new Date(`${CONFIG.birthDate}T00:00:00`);

  const days = Math.floor(
    (Date.now() - birth.getTime()) / 86400000
  );

  if (Number.isFinite(days) && days >= 0) {
    $("days").hidden = false;

    $("days").innerHTML =
      `🍼 <b>${days}</b> days of love and happiness`;
  }
}


/* ================= CONFETTI ================= */

const canvas = $("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {

  const dpr = window.devicePixelRatio || 1;

  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;

  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

addEventListener("resize", resizeCanvas);


function confetti(x, y, count = 90) {

  const colors = [
    "#f9e3a6",
    "#ff8fb8",
    "#8fd0ff",
    "#c8a2ff",
    "#9be8c4",
    "#ffd27a"
  ];

  for (let i = 0; i < count; i++) {

    const angle = random(0, Math.PI * 2);
    const speed = random(3, 10);

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      w: random(5, 10),
      h: random(4, 8),
      r: random(0, 6),
      vr: random(-0.3, 0.3),
      color: colors[i % colors.length],
      life: 100
    });
  }

  if (!animationRunning) {
    animationRunning = true;
    requestAnimationFrame(drawConfetti);
  }
}


function drawConfetti() {

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  particles = particles.filter(p => p.life > 0);

  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    p.vy += 0.22;
    p.vx *= 0.99;
    p.r += p.vr;
    p.life--;

    ctx.save();

    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);

    ctx.globalAlpha = Math.min(1, p.life / 25);
    ctx.fillStyle = p.color;

    ctx.fillRect(
      -p.w / 2,
      -p.h / 2,
      p.w,
      p.h
    );

    ctx.restore();
  });

  if (particles.length) {
    requestAnimationFrame(drawConfetti);
  } else {
    animationRunning = false;
  }
}


function confettiRain() {

  for (let i = 0; i < 5; i++) {

    setTimeout(
      () => confetti(random(0, innerWidth), -10, 35),
      i * 250
    );
  }
}


/* ================= HEARTS ================= */

function createHeart(x, y) {

  const heart = document.createElement("span");

  heart.className = "heart";

  heart.textContent = [
    "💖",
    "💕",
    "🤗",
    "✨",
    "🧸"
  ][Math.floor(random(0, 5))];

  heart.style.left = (x + random(-40, 40)) + "px";
  heart.style.top = (y - 10) + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1500);
}


/* ================= MUSIC ================= */

const audio = new Audio();

audio.loop = true;

let playing = false;
let audioContext = null;
let synthTimer = null;

if (CONFIG.music) {
  audio.src = CONFIG.music;
}

const melody = [
  [392, .75],
  [392, .25],
  [440, 1],
  [392, 1],
  [523, 1],
  [494, 2],

  [392, .75],
  [392, .25],
  [440, 1],
  [392, 1],
  [587, 1],
  [523, 2],

  [392, .75],
  [392, .25],
  [784, 1],
  [659, 1],
  [523, 1],
  [494, 1],
  [440, 1],

  [698, .75],
  [698, .25],
  [659, 1],
  [523, 1],
  [587, 1],
  [523, 2]
];


function playSynth() {

  const AudioCtx =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioCtx) return;

  if (!audioContext) {
    audioContext = new AudioCtx();
  }

  audioContext.resume();

  let time = audioContext.currentTime + 0.1;
  const beat = 0.45;

  melody.forEach(([frequency, duration]) => {

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.001, time);

    gain.gain.linearRampToValueAtTime(
      0.12,
      time + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      time + duration * beat - 0.02
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(time);
    oscillator.stop(time + duration * beat);

    time += duration * beat;
  });

  synthTimer = setTimeout(
    playSynth,
    Math.max(
      1000,
      (time - audioContext.currentTime + 1.5) * 1000
    )
  );
}


function stopSynth() {

  clearTimeout(synthTimer);

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}


function updateMusicButton() {

  $("music").textContent = playing ? "🔊" : "🔇";
  $("music").classList.toggle("on", playing);
}


async function startMusic() {

  if (playing) return;

  playing = true;
  updateMusicButton();

  if (CONFIG.music) {

    try {
      await audio.play();
      return;
    } catch (error) {
      // MP3 unavailable, built-in melody will play.
    }
  }

  playSynth();
}


function stopMusic() {

  playing = false;

  audio.pause();
  stopSynth();

  updateMusicButton();
}


$("music").addEventListener("click", () => {
  playing ? stopMusic() : startMusic();
});


/* ================= OPENING COVER ================= */

$("cover").addEventListener("click", () => {

  $("cover").classList.add("gone");

  document.body.classList.remove("locked");

  startMusic();

  confetti(
    innerWidth / 2,
    innerHeight / 2,
    150
  );

  confettiRain();

  setTimeout(() => $("cover").remove(), 1100);
});


/* ================= BIRTHDAY CAKE ================= */

let candlesLit = true;

$("blow").addEventListener("click", () => {

  const cake = $("cakebox");

  if (candlesLit) {

    candlesLit = false;

    cake.classList.add("out");

    $("blow").textContent = "🕯️ Dobara Jalayein";

    const randomWish =
      CONFIG.wishes[
        Math.floor(Math.random() * CONFIG.wishes.length)
      ];

    $("wishmsg").textContent = randomWish;

    const rect = cake.getBoundingClientRect();

    confetti(
      rect.left + rect.width / 2,
      rect.top + 55,
      130
    );

  } else {

    candlesLit = true;

    cake.classList.remove("out");

    $("blow").textContent = "🌬️ Blow the Candles";

    $("wishmsg").textContent = "";
  }
});


/* ================= PHOTO GALLERY ================= */

CONFIG.gallery.slice(0, 5).forEach((src, index) => {

  const item = document.createElement("div");

  item.className =
    "gallery-item" + (index === 2 ? " feature" : "");

  const img = document.createElement("img");

  img.src = src;

  img.alt = index === 2
    ? "A photo of all three children together"
    : `Birthday memory ${index + 1}`;

  img.loading = "lazy";

  img.onerror = () => {

    item.textContent = `Photo not found: ${src}`;

    item.style.color = "#f8e2a1";
    item.style.padding = "12px";
    item.style.fontSize = "12px";
  };

  item.appendChild(img);

  item.addEventListener("click", () => {

    if (img.complete && img.naturalWidth) {

      $("lightbox-img").src = src;

      $("lightbox").classList.add("open");
    }
  });

  $("gallery").appendChild(item);
});


/* ================= LIGHTBOX ================= */

function closeLightbox() {

  $("lightbox").classList.remove("open");
  $("lightbox-img").src = "";
}

$("close-lightbox").addEventListener("click", closeLightbox);

$("lightbox").addEventListener("click", event => {

  if (event.target === $("lightbox")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeLightbox();
  }
});


/* ================= WISHES WALL ================= */

let wishes = [];

try {

  wishes = JSON.parse(
    localStorage.getItem("birthdayWishes") || "[]"
  );

  if (!Array.isArray(wishes)) {
    wishes = [];
  }

} catch (error) {

  wishes = [];
}


function renderWishes() {

  $("wall").replaceChildren();

  wishes.forEach(wish => {

    const note = document.createElement("div");
    note.className = "note";

    const author = document.createElement("b");
    author.textContent = wish.name;

    const message = document.createElement("span");
    message.textContent = wish.text;

    note.append(author, message);

    $("wall").appendChild(note);
  });
}


$("send-wish").addEventListener("click", () => {

  const name = $("wish-name").value.trim();
  const message = $("wish-text").value.trim();

  if (!name || !message) {

    alert("Please enter your name and wish first.");

    return;
  }

  // PUSH: New wish array ke end mein add hogi.
  wishes.push({
    name: name,
    text: message
  });

  try {

    localStorage.setItem(
      "birthdayWishes",
      JSON.stringify(wishes)
    );

  } catch (error) {

    console.warn("Could not save wishes:", error);
  }

  $("wish-name").value = "";
  $("wish-text").value = "";

  renderWishes();

  confetti(
    innerWidth / 2,
    innerHeight / 2,
    65
  );
});


renderWishes();


/* ================= WHATSAPP SHARE ================= */

const shareText =
  `🎂 ${names.join(", ")} ka 6 Month Birthday! Card dekhein 💖 ${location.href}`;

$("share").href =
  "https://wa.me/?text=" + encodeURIComponent(shareText);


/* ================= SCROLL REVEAL ================= */

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

      observer.unobserve(entry.target);
    }
  });

}, {
  threshold: 0.08
});

document.querySelectorAll(".card").forEach(card => {
  observer.observe(card);
});


/* ================= BACKGROUND BOKEH ================= */

for (let i = 0; i < 7; i++) {

  const dot = document.createElement("div");

  dot.className = "bokeh";

  const size = random(60, 150);

  dot.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${random(0, 95)}%;
    top: ${random(0, 95)}%;
    animation-delay: ${-random(0, 7)}s;
  `;

  $("fx").appendChild(dot);
}


/* ================= SPARKLES ================= */

for (let i = 0; i < 28; i++) {

  const star = document.createElement("div");

  star.className = "sparkle";

  star.style.cssText = `
    left: ${random(0, 100)}%;
    top: ${random(0, 100)}%;
    animation-delay: ${-random(0, 3)}s;
    animation-duration: ${random(2, 4.5)}s;
  `;

  $("fx").appendChild(star);
}


/* ================= FLOATING BALLOONS ================= */

const balloonPalette = [
  ["#ffd9a8", "#c98a3a"],
  ["#ffc2d6", "#c4587f"],
  ["#f9e3a6", "#b8862c"],
  ["#e6d3ff", "#8a62c4"],
  ["#bfe3ff", "#3f86c9"]
];


function addBalloon() {

  const balloon = document.createElement("div");

  const colors =
    balloonPalette[
      Math.floor(random(0, balloonPalette.length))
    ];

  balloon.className = "balloon";

  balloon.style.setProperty("--b1", colors[0]);
  balloon.style.setProperty("--b2", colors[1]);

  balloon.style.left = random(3, 92) + "%";

  balloon.style.animationDuration = random(14, 24) + "s";

  balloon.addEventListener("click", event => {

    confetti(
      event.clientX,
      event.clientY,
      35
    );

    balloon.remove();
  });

  balloon.addEventListener("animationend", () => {
    balloon.remove();
  });

  $("balloons").appendChild(balloon);
}


for (let i = 0; i < 5; i++) {

  setTimeout(addBalloon, i * 1100);
}


setInterval(() => {

  if ($("balloons").children.length < 7) {
    addBalloon();
  }

}, 2600);