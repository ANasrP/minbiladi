/* ═══ HERO DATA (YouTube) ═══ */
const heroSlides = [
  { yt:'LXb3EKWsInQ', quote:'"This is where it all begins."', title:'Morocco: Between Mountains & Sea', date:'April 14, 2026', dur:'42:34' },
  { yt:'jNQXAC9IVRw', quote:'"I am obsessed by my work."', title:'Annette Messager: Like in a Dream', date:'April 16, 2026', dur:'10:15' },
  { yt:'hFZFjoX2cGg', quote:'"A poem has a moment."', title:'Seán Hewitt: The Gift of Shame', date:'April 7, 2026', dur:'11:28' },
];

/* ═══ GRID DATA ═══ */
const grid = [
  { small:true, isNew:true, yt:'dQw4w9WgXcQ', artist:'Paulina Olowska', title:'Art Is an Exchange', dur:'11:33' },
  { small:true, isNew:true, yt:'9bZkp7q19f0', artist:'Seán Hewitt', title:'The Gift of Shame', dur:'11:28' },
  { small:true, isNew:false, yt:'kJQP7kiw5Fk', artist:'Xu Tiantian', title:'Beauty in Itself Is Dangerous', dur:'15:09' },
  { small:true, isNew:false, yt:'OPf0YbXqDm0', artist:'', title:'Becoming Sophie Calle', dur:'27:06' },
  { big:true, isNew:false, yt:'LXb3EKWsInQ', quote:'"This is where it all begins."', title:'Morocco: Between Mountains & Sea', dur:'42:34' },
];

/* ═══ SERIES DATA ═══ */
const series = [
  { yt:'RgKAFK5djSk', title:'Seen & Selected by Katy Hessel', sub:'From the author & founder of The Great Women Artists podcast', meta:'Series / 12 videos' },
  { yt:'YQHsXMglC9A', title:'Advice to the Young', sub:'Advice from one generation of artists to the next', meta:'Series / 96 videos' },
  { yt:'JGwWNGJdvx8', title:'Facing the Blank Page', sub:'Writers talk about the horror of the blank page', meta:'Series / 17 videos' },
  { yt:'CevxZvSJLk8', title:'Artists on One Work', sub:'Works of art explored by acclaimed artists', meta:'Series / 36 videos' },
  { yt:'60ItHLz5WEA', title:'On Jørn Utzon', sub:'Architects on Danish architect Jørn Utzon', meta:'Series / 11 videos' },
  { yt:'hT_nvWreIhg', title:'On Outer Space', sub:'Artists on Outer Space', meta:'Series / 12 videos' },
  { yt:'7PCkvCPvDXk', title:'On Marsden Hartley', sub:'Artists on American painter Marsden Hartley', meta:'Series / 8 videos' },
  { yt:'AbPED9bisSc', title:'Writers on Art', sub:'Artworks interpreted by acclaimed writers', meta:'Series / 24 videos' },
  { yt:'fWNaR-rxAic', title:'Becoming Paul McCarthy', sub:'On the influential contemporary American artist', meta:'Series / 6 videos' },
];

/* helper: YouTube thumbnail URL with fallback chain */
function ytThumb(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

/* ═══ BUILD GRID ═══ */
const gridEl = document.getElementById('grid-section');

const playSVG = '<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20"/></svg>';

grid.forEach(v => {
  const a = document.createElement('a');
  a.href = '#';
  a.className = 'g-card' + (v.big ? ' big' : '');
  a.dataset.yt = v.yt;

  let textHTML = '';
  if (v.big) {
    textHTML = `<div class="g-text">${v.quote}<span class="title">${v.title}</span></div>`;
  } else {
    const parts = v.artist ? `${v.artist}<br>${v.title}` : v.title;
    textHTML = `<div class="g-text">${parts}</div>`;
  }

  a.innerHTML = `
    <img src="${ytThumb(v.yt)}" alt="" loading="lazy" onerror="this.src='https://img.youtube.com/vi/${v.yt}/hqdefault.jpg'">
    ${v.isNew ? '<span class="new-badge">New</span>' : ''}
    <button class="g-plus" aria-label="Add">+</button>
    <div class="g-play">${playSVG}</div>
    ${textHTML}
    <span class="g-duration">${v.dur}</span>
  `;
  gridEl.appendChild(a);
});

/* ═══ BUILD SERIES ═══ */
const seriesEl = document.getElementById('series-grid');
series.forEach(s => {
  const a = document.createElement('a');
  a.href = '#';
  a.className = 's-card';
  a.dataset.yt = s.yt;
  a.innerHTML = `
    <div class="s-card-head">
      <div class="s-title">${s.title}</div>
      <div class="s-sub">${s.sub}</div>
    </div>
    <div class="s-img"><img src="${ytThumb(s.yt)}" alt="" loading="lazy" onerror="this.src='https://img.youtube.com/vi/${s.yt}/hqdefault.jpg'"></div>
    <div class="s-meta">${s.meta}</div>
  `;
  seriesEl.appendChild(a);
});

/* ═══ HERO CAROUSEL ═══ */
let hi = 0;
function showHero(n) {
  hi = (n + heroSlides.length) % heroSlides.length;
  const s = heroSlides[hi];
  const img = document.getElementById('hero-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = ytThumb(s.yt);
    img.onerror = () => { img.src = `https://img.youtube.com/vi/${s.yt}/hqdefault.jpg`; };
    img.onload = () => { img.style.opacity = '1'; };
  }, 200);
  document.getElementById('overlay-quote').textContent = s.quote;
  document.getElementById('overlay-title').textContent = s.title;
  document.getElementById('overlay-date').textContent = s.date;
  document.getElementById('hero-duration').textContent = s.dur;
  document.getElementById('hero').dataset.yt = s.yt;
}
/* set initial hero thumb + sync text from data */
showHero(0);

document.getElementById('hero-img').style.transition = 'opacity .3s';
document.getElementById('hero-prev').addEventListener('click', (e) => { e.stopPropagation(); showHero(hi - 1); });
document.getElementById('hero-next').addEventListener('click', (e) => { e.stopPropagation(); showHero(hi + 1); });

let t = setInterval(() => showHero(hi + 1), 7000);
document.getElementById('hero').addEventListener('mouseenter', () => clearInterval(t));
document.getElementById('hero').addEventListener('mouseleave', () => { t = setInterval(() => showHero(hi + 1), 7000); });

/* ═══ LIGHTBOX / YOUTUBE PLAYER ═══ */
const modal = document.getElementById('yt-modal');
const frame = document.getElementById('yt-frame');

function openVideo(id) {
  frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVideo() {
  frame.src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* click on hero overlay play → open */
document.querySelector('.overlay-play').addEventListener('click', (e) => {
  e.stopPropagation();
  openVideo(document.getElementById('hero').dataset.yt);
});
document.querySelector('.hero-overlay').addEventListener('click', (e) => {
  e.stopPropagation();
  openVideo(document.getElementById('hero').dataset.yt);
});

/* click on any card with data-yt → open */
document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-yt]');
  if (!card) return;
  if (card.id === 'hero') return; /* handled above */
  if (e.target.closest('.g-plus') || e.target.closest('.plus-btn')) return;
  e.preventDefault();
  openVideo(card.dataset.yt);
});

/* modal close */
document.getElementById('yt-close').addEventListener('click', closeVideo);
modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });
