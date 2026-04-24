const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== TIMER =====
const startDate = new Date("2025-05-01");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  document.getElementById("timer").innerText =
    `Mi amor por ti comenzó hace...\n${d} días ${h} horas ${m} minutos ${s} segundos`;
}
setInterval(updateTimer, 1000);

// ===== PARTICELLE CUORE =====
class Heart {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.alpha = 0;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x, this.y - this.size,
      this.x - this.size, this.y - this.size,
      this.x - this.size, this.y);

    ctx.bezierCurveTo(this.x - this.size, this.y + this.size,
      this.x, this.y + this.size * 1.5,
      this.x, this.y + this.size * 2);

    ctx.bezierCurveTo(this.x, this.y + this.size * 1.5,
      this.x + this.size, this.y + this.size,
      this.x + this.size, this.y);

    ctx.bezierCurveTo(this.x + this.size, this.y - this.size,
      this.x, this.y - this.size,
      this.x, this.y);

    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    this.alpha += 0.01;
    if (this.alpha > 1) this.alpha = 1;
  }
}

let hearts = [];

// ===== FORMA CUORE =====
function heartShape(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

let t = 0;

// ===== ANIMAZIONE =====
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 5; i++) {
    if (t < Math.PI * 2) {
      const p = heartShape(t);
      const x = canvas.width/2 + p.x * 15;
      const y = canvas.height/2 + p.y * 15;

      hearts.push(new Heart(x, y, 4 + Math.random()*4, 0.3));
      t += 0.02;
    }
  }

  hearts.forEach(h => {
    h.update();
    h.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// ===== CUORI FLOATING =====
function floatingHearts() {
  const el = document.createElement("div");
  el.className = "floating-heart";
  el.innerHTML = "❤️";
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = (3 + Math.random()*3) + "s";

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 6000);
}

setInterval(floatingHearts, 200);

// ===== RESPONSIVE =====
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
