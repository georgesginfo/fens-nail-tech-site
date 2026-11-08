import './style.css';
import { loadGallery } from './gallery.js';

const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const grid = document.querySelector('#galleryGrid');
const filters = [...document.querySelectorAll('.filter')];
const lightbox = document.querySelector('#lightbox');
const lbImage = document.querySelector('#lightboxImage');
const lbCaption = document.querySelector('#lightboxCaption');
let galleryItems = [];
let activeItems = [];
let activeFilter = 'all';
let activeIndex = 0;
const categoryNames = { gel:'Pose Gel', nailart:'Nail Art', french:'French', pedicure:'Pédicure', creations:'Créations' };
function renderGallery(filter=activeFilter) {
  activeFilter = filter;
  activeItems = galleryItems.filter(item => filter === 'all' || item.category === filter);
  grid.innerHTML = activeItems.map((item,index) => `<button class="gallery-item ${index%5===0?'gallery-tall':''}" data-index="${index}" aria-label="Voir ${esc(item.title)}"><img src="${esc(item.src)}" alt="${esc(item.title)}" loading="lazy"><span class="gallery-overlay"><small>${categoryNames[item.category] || 'Création'}</small><b>${esc(item.title)}</b><i>↗</i></span>${item.local?'':'<span class="inspiration-label">INSPIRATION</span>'}</button>`).join('');
  grid.querySelectorAll('.gallery-item').forEach(el => el.addEventListener('click', () => openLightbox(Number(el.dataset.index))));
}
function openLightbox(index) { activeIndex=index; updateLightbox(); lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
function updateLightbox(){const item=activeItems[activeIndex];lbImage.src=item.src;lbImage.alt=item.title;lbCaption.textContent=`${item.title} · ${categoryNames[item.category]||'Création'}${item.local?'':' · Image d’inspiration'}`;}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
function stepLightbox(dir){activeIndex=(activeIndex+dir+activeItems.length)%activeItems.length;updateLightbox();}
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(f=>f.classList.remove('active'));btn.classList.add('active');renderGallery(btn.dataset.filter);}));
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>stepLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>stepLightbox(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')stepLightbox(-1);if(e.key==='ArrowRight')stepLightbox(1);});
loadGallery().then((items) => { galleryItems = items; renderGallery(); });

const menuToggle=document.querySelector('#menuToggle');const nav=document.querySelector('#mainNav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');document.body.classList.toggle('nav-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');document.body.classList.remove('nav-open');}));
const sections=[...document.querySelectorAll('main section[id]')];const navLinks=[...document.querySelectorAll('.nav-link')];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>observer.observe(s));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
document.querySelector('#year').textContent=new Date().getFullYear();
