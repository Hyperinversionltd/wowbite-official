/* Updated script with DOMContentLoaded, localStorage persistence for cookie, font size, and favorites */
(function(){
  // Utilities
  function $(id){ return document.getElementById(id); }
  function showToast(msg, timeout=2000){
    let t = document.getElementById('wbt-toast');
    if(!t){ t = document.createElement('div'); t.id = 'wbt-toast'; t.className='toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._to);
    t._to = setTimeout(()=> t.classList.remove('show'), timeout);
  }

  // Cookie Notice
  function closeCookie(){
    const el = $('cookieNotice');
    if(el){ el.classList.add('popup-hide'); localStorage.setItem('wb_cookie_dismissed','1'); }
  }

  // Font sizing
  function getStoredFont(){ return parseInt(localStorage.getItem('wb_font_size')||'16',10) || 16; }
  function setFont(size){ size = Math.max(12, Math.min(20, size)); document.body.style.fontSize = size + 'px'; localStorage.setItem('wb_font_size', String(size)); }
  function fontS(direction){ const cur = parseInt(document.body.style.fontSize||getComputedStyle(document.body).fontSize||'16',10); setFont(direction==='+'?cur+1:cur-1); showToast('Font size '+(direction==='+'? 'increased':'decreased')) }

  // Clock
  function updateClock(){
    const now = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const formattedTime = now.toLocaleTimeString();
    const dayName = days[now.getDay()];
    const el = $('liveClock'); if(el) el.innerText = `${dayName} | ${formattedTime}`;
  }

  // Favorites
  let savedList = [];
  function loadSaved(){ try{ const j = JSON.parse(localStorage.getItem('wb_saved')||'[]'); if(Array.isArray(j)) savedList = j; }catch(e){ savedList = []; } }
  function persistSaved(){ localStorage.setItem('wb_saved', JSON.stringify(savedList)); }
  function toggleFavList(){ const box = document.querySelector('.fav-area'); if(!box) return; if(savedList.length){ box.innerHTML = savedList.map((it,i)=> `<div class="item">${i+1}. ${escapeHtml(it)}</div>`).join(''); } else { box.innerHTML = '<p>No saved items yet. Click on stories to save them!</p>'; } }
  function addToFav(item){ if(!item) return; if(!savedList.includes(item)){ savedList.push(item); persistSaved(); showToast('Saved to your list'); toggleFavList(); } else { showToast('Already in your list'); } }

  function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    // Restore cookie notice state
    if(localStorage.getItem('wb_cookie_dismissed')==='1'){ const el = $('cookieNotice'); if(el) el.classList.add('popup-hide'); }
    // Wire close button
    const closeBtn = document.querySelector('#cookieNotice .btn'); if(closeBtn) closeBtn.addEventListener('click', closeCookie);

    // Font init
    setFont(getStoredFont());
    // Rebind font buttons
    const plus = Array.from(document.querySelectorAll('.btn')).find(b=>b.innerText.trim()==='A+');
    const minus = Array.from(document.querySelectorAll('.btn')).find(b=>b.innerText.trim()==='A-');
    if(plus) plus.addEventListener('click', ()=> fontS('+'));
    if(minus) minus.addEventListener('click', ()=> fontS('-'));

    // Fav list load
    loadSaved(); toggleFavList();
    // Bind star button
    const star = document.querySelector('.star-btn'); if(star) star.addEventListener('click', toggleFavList);

    // Allow items to be saved by clicking (delegation)
    document.body.addEventListener('click', function(ev){ const t = ev.target; if(t && t.matches && t.matches('.item')){ addToFav(t.innerText.trim()); } });

    // Clock
    updateClock(); setInterval(updateClock,1000);
  });

  // Expose some functions for inline onclicks
  window.fontS = fontS;
  window.closeCookie = closeCookie;
  window.toggleFavList = toggleFavList;
  window.addToFav = addToFav;
})();
