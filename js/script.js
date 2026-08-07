/* WOWBITE LIVE FEEDS SYSTEM */

// Feed data
const feeds = {
  home: [
    { title: '🔥 Manchester United wins 2-1', desc: 'Crucial victory against rivals', time: '2 mins ago' },
    { title: '⚽ City Transfer News', desc: 'Man City linked with new striker', time: '15 mins ago' },
    { title: '📱 Viral TikTok Challenge', desc: '#WowBiteChallenge reaches 10M views', time: '1 hour ago' }
  ],
  news: [
    { title: 'UK Economy Shows Growth', desc: 'Latest quarterly report positive', time: '30 mins ago' },
    { title: 'Manchester Weather Update', desc: 'Sunny conditions all week', time: '45 mins ago' },
    { title: 'North West News Roundup', desc: 'Top stories from the region', time: '2 hours ago' }
  ],
  trending: [
    { title: 'Celebrity announces new project', desc: 'Major collaboration confirmed', time: '1 hour ago' },
    { title: 'Viral meme goes global', desc: 'Trending worldwide', time: '3 hours ago' },
    { title: 'Movie premiere tonight', desc: 'Blockbuster hits theaters', time: '5 hours ago' }
  ],
  mysteries: [
    { title: '🔮 Bermuda Triangle Mystery', desc: 'Scientists propose new theory', time: '6 hours ago' },
    { title: '👽 Ancient Astronaut Theory', desc: 'New evidence found in Egypt', time: '12 hours ago' },
    { title: '🏛️ Lost City Discovery', desc: 'Underwater ruins in Mediterranean', time: '1 day ago' }
  ]
};

const facts = [
  '🧠 Honey never spoils!',
  '🐙 Octopuses have 3 hearts!',
  '🌍 Venus day is longer than its year!',
  '🦁 Lions sleep 20 hours daily!',
  '🌙 Moon drifts from Earth!',
  '🦅 Eagles see fish from 100m away!',
  '🧬 Humans share 50% DNA with bananas!'
];

let community = [
  { user: 'UserA', text: 'Love WowBite!', time: '10 mins ago' },
  { user: 'UserB', text: 'Best news app! 🚀', time: '25 mins ago' },
  { user: 'UserC', text: 'Amazing community!', time: '1 hour ago' }
];

// Render feed items
function renderFeed(elementId, feedArray) {
  const elem = document.getElementById(elementId);
  if (!elem) return;
  
  elem.innerHTML = '';
  feedArray.forEach(item => {
    const div = document.createElement('div');
    div.className = 'feed-item';
    div.innerHTML = `<div class="feed-item-title">${item.title}</div><div class="feed-item-description">${item.desc}</div><div class="feed-item-meta">⏱️ ${item.time}</div>`;
    elem.appendChild(div);
  });
}

function renderCommunity() {
  const elem = document.getElementById('communityFeed');
  if (!elem) return;
  
  elem.innerHTML = '';
  community.forEach(item => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<div class="comment-user">👤 ${item.user}</div><div class="comment-text">${item.text}</div><div class="comment-time">${item.time}</div>`;
    elem.appendChild(div);
  });
}

// Initialize all feeds
function loadAllFeeds() {
  console.log('Loading feeds...');
  renderFeed('homeFeeds', feeds.home);
  renderFeed('newsFeed', feeds.news);
  renderFeed('trendingFeed', feeds.trending);
  renderFeed('mysteriesFeed', feeds.mysteries);
  renderCommunity();
}

// Update clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  
  const clock = document.getElementById('liveClock');
  const footer = document.getElementById('footerTime');
  
  if (clock) clock.textContent = `🕐 ${time} | ${date}`;
  if (footer) footer.textContent = time;
}

// Cookie
function closeCookie() {
  const cookie = document.getElementById('cookieNotice');
  if (cookie) cookie.classList.add('popup-hide');
}

// Font size
function fontS(d) {
  let size = parseInt(document.body.style.fontSize || 16);
  if (d === '+' && size < 20) size++;
  if (d === '-' && size > 12) size--;
  document.body.style.fontSize = size + 'px';
}

// Favorites
let favList = [];
function toggleFavList() {
  const box = document.querySelector('.fav-area');
  if (!box) return;
  box.innerHTML = favList.length ? favList.map((it, i) => `<div class="item">${i + 1}. ${it}</div>`).join('') : '<p>No saved items</p>';
}

// Refresh news
function refreshNews() {
  const elem = document.getElementById('newsFeed');
  if (elem) {
    elem.innerHTML = '<div class="loading">📡 Fetching news...</div>';
    setTimeout(() => renderFeed('newsFeed', feeds.news), 800);
  }
}

// Random fact
function getRandomFact() {
  const elem = document.getElementById('factFeed');
  if (elem) {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    elem.innerHTML = `<div class="item"><strong>${fact}</strong></div>`;
  }
}

// Post comment
function postComment() {
  const input = document.getElementById('commentInput');
  if (!input || !input.value.trim()) return;
  
  const newComment = { user: 'You', text: input.value, time: 'just now' };
  community.unshift(newComment);
  renderCommunity();
  input.value = '';
}

// START ON PAGE LOAD
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    loadAllFeeds();
    updateClock();
    setInterval(updateClock, 1000);
  });
} else {
  loadAllFeeds();
  updateClock();
  setInterval(updateClock, 1000);
}
