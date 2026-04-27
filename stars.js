// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, 80);
});

// ─── STARFIELD ───
const canvas = document.getElementById('starfield');
const ctx    = canvas.getContext('2d');
let stars = [];

function initStars() {
  canvas.width  = window.innerWidth;
  canvas.height = document.body.scrollHeight;
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 3200);
  for (let i = 0; i < count; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.5,
      a:     Math.random(),
      speed: 0.002 + Math.random() * 0.005,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.9 ? '#ffb347'
           : Math.random() > 0.8 ? '#a8c8e8'
           : '#ffffff'
    });
  }
}

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    const a = s.a * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = a;
    ctx.fill();
    if (s.r > 1.2 && a > 0.7) {
      ctx.globalAlpha = a * 0.35;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(s.x - 5, s.y); ctx.lineTo(s.x + 5, s.y);
      ctx.moveTo(s.x, s.y - 5); ctx.lineTo(s.x, s.y + 5);
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

initStars();
requestAnimationFrame(drawStars);
window.addEventListener('resize', () => { initStars(); });
