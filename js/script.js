/* ============================================
   WOWBITE JAVASCRIPT
   Organized JS for clean, maintainable logic
   ============================================ */

// ========== Cookie Notice ==========
/**
 * Close the cookie notice popup
 */
function closeCookie() {
  document.getElementById('cookieNotice').classList.add('popup-hide');
}

// ========== Font Sizing ==========
/**
 * Adjust font size globally
 * @param {string} direction - '+' to increase, '-' to decrease
 */
function fontS(direction) {
  let size = parseInt(document.body.style.fontSize || 16);

  if (direction === '+' && size < 20) size++;
  if (direction === '-' && size > 12) size--;

  document.body.style.fontSize = size + 'px';
}

// ========== Clock & Time Display ==========
/**
 * Update the live clock in the header
 */
function updateClock() {
  const now = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const formattedTime = now.toLocaleTimeString();
  const dayName = days[now.getDay()];

  document.getElementById(
    'liveClock'
  ).innerText = `${dayName} | ${formattedTime}`;
}

// Initialize clock and update every second
updateClock();
setInterval(updateClock, 1000);

// ========== Favorites List ==========
let savedList = [];

/**
 * Toggle and display the favorites list
 */
function toggleFavList() {
  const box = document.querySelector('.fav-area');

  if (savedList.length) {
    box.innerHTML = savedList
      .map((it, i) => `<div class="item">${i + 1}. ${it}</div>`)
      .join('');
  } else {
    box.innerHTML = '<p>No saved items yet. Click on stories to save them!</p>';
  }
}

/**
 * Add item to favorites
 * @param {string} item - The item to add
 */
function addToFav(item) {
  if (!savedList.includes(item)) {
    savedList.push(item);
    alert('✅ Saved to your list!');
  }
}