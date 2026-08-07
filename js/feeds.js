// ============================================
// WOWBITE LIVE FEEDS SYSTEM
// Real-time feed management and updates
// ============================================

// Sample live feed data (replace with API calls for real data)
const sampleFeeds = {
  home: [
    { title: "🔥 Manchester United wins 2-1", description: "Man Utd secures crucial victory against rivals", time: "2 mins ago" },
    { title: "⚽ City Transfer News", description: "Man City linked with new striker signing", time: "15 mins ago" },
    { title: "📱 Viral: TikTok Challenge Trends", description: "#WowBiteChallenge reaches 10M views", time: "1 hour ago" }
  ],
  news: [
    { title: "UK Economy Shows Growth", description: "Latest quarterly report indicates positive trend", time: "30 mins ago" },
    { title: "Manchester Weather Update", description: "Sunny conditions expected throughout the week", time: "45 mins ago" },
    { title: "North West News Roundup", description: "Week's top stories from the region", time: "2 hours ago" }
  ],
  trending: [
    { title: "Celebrity A announces new project", description: "Major collaboration in the works", time: "1 hour ago" },
    { title: "Viral meme goes global", description: "Hilarious internet trend spreading worldwide", time: "3 hours ago" },
    { title: "Movie premiere tonight", description: "Blockbuster film hits theaters", time: "5 hours ago" }
  ],
  mysteries: [
    { title: "🔮 Bermuda Triangle Mystery", description: "Scientists propose new theory about disappearances", time: "6 hours ago" },
    { title: "👽 Ancient Astronaut Theory", description: "New evidence surfaces in Egypt", time: "12 hours ago" },
    { title: "🏛️ Lost City Discovery", description: "Underwater ruins found in Mediterranean", time: "1 day ago" }
  ],
  community: [
    { user: "UserA", text: "Just discovered WowBite! Love the live feeds!", time: "10 mins ago" },
    { user: "UserB", text: "Best news app ever! Keep it up! 🚀", time: "25 mins ago" },
    { user: "UserC", text: "The community section is amazing", time: "1 hour ago" }
  ]
};

const dailyFacts = [
  "🧠 Honey never spoils — lasts thousands of years!",
  "🐙 Octopuses have three hearts and blue blood!",
  "🌍 A day on Venus is longer than its year!",
  "🦁 Lions sleep up to 20 hours a day!",
  "🌙 The moon is slowly drifting away from Earth!",
  "🦅 Eagles can see fish in water from 100m away!",
  "🧬 Humans share 50% DNA with bananas!",
  "⚡ Lightning strikes Earth 100 times every second!",
  "🐢 Some turtles can breathe through their butts!",
  "🌊 Octopuses can taste with their arms!"
];

// Initialize live feeds on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeLiveClock();
  initializeFeeds();
  setInterval(updateLiveClock, 1000);
});

// Live Clock Function
function initializeLiveClock() {
  updateLiveClock();
}

function updateLiveClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  const dateString = now.toLocaleDateString('en-GB', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });
  
  const clockElement = document.getElementById('liveClock');
  const footerElement = document.getElementById('footerTime');
  
  if (clockElement) clockElement.textContent = `🕐 ${timeString} | ${dateString}`;
  if (footerElement) footerElement.textContent = timeString;
}

// Initialize all feeds
function initializeFeeds() {
  populateFeed('homeFeeds', sampleFeeds.home);
  populateFeed('newsFeed', sampleFeeds.news);
  populateFeed('trendingFeed', sampleFeeds.trending);
  populateFeed('mysteriesFeed', sampleFeeds.mysteries);
  loadCommunityFeed();
}

// Populate feed with items
function populateFeed(elementId, feedData) {
  const feedElement = document.getElementById(elementId);
  if (!feedElement) return;
  
  feedElement.innerHTML = '';
  feedData.forEach(item => {
    const feedItem = document.createElement('div');
    feedItem.className = 'feed-item';
    feedItem.innerHTML = `
      <div class="feed-item-title">${item.title}</div>
      <div class="feed-item-description">${item.description}</div>
      <div class="feed-item-meta">⏱️ ${item.time}</div>
    `;
    feedElement.appendChild(feedItem);
  });
}

// Refresh news feed based on category
function refreshNews() {
  const category = document.getElementById('newsCategory').value;
  const feedElement = document.getElementById('newsFeed');
  
  feedElement.innerHTML = '<div class="loading">📡 Fetching ' + category + ' news...</div>';
  
  // Simulate API delay
  setTimeout(() => {
    populateFeed('newsFeed', sampleFeeds.news);
  }, 800);
}

// Get random daily fact
function getRandomFact() {
  const randomIndex = Math.floor(Math.random() * dailyFacts.length);
  const factFeed = document.getElementById('factFeed');
  
  if (factFeed) {
    factFeed.innerHTML = `
      <div class="item">
        <strong>${dailyFacts[randomIndex]}</strong>
        <div style="margin-top: 8px; font-size: 12px; color: #999;">
          ✨ Updated ${new Date().toLocaleTimeString()}
        </div>
      </div>
    `;
  }
}

// Community Comment System
function postComment() {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  
  if (!text) {
    alert('Please enter a comment!');
    return;
  }
  
  const commentFeed = document.getElementById('communityFeed');
  const newComment = document.createElement('div');
  newComment.className = 'comment';
  newComment.innerHTML = `
    <div class="comment-user">👤 You</div>
    <div class="comment-text">${escapeHtml(text)}</div>
    <div class="comment-time">just now</div>
  `;
  
  // Insert at top
  commentFeed.insertBefore(newComment, commentFeed.firstChild);
  input.value = '';
  
  // Add sample replies
  setTimeout(() => {
    addSampleReply(commentFeed);
  }, 2000);
}

function loadCommunityFeed() {
  const communityFeed = document.getElementById('communityFeed');
  if (!communityFeed) return;
  
  communityFeed.innerHTML = '';
  sampleFeeds.community.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
      <div class="comment-user">👤 ${comment.user}</div>
      <div class="comment-text">${comment.text}</div>
      <div class="comment-time">⏱️ ${comment.time}</div>
    `;
    communityFeed.appendChild(commentDiv);
  });
}

function addSampleReply(container) {
  const replies = [
    "Great point! 👍",
    "Totally agree! 🎯",
    "Thanks for sharing! ✨"
  ];
  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  const users = ["Community Mod", "Active User", "Fellow Reader"];
  const randomUser = users[Math.floor(Math.random() * users.length)];
  
  const replyDiv = document.createElement('div');
  replyDiv.className = 'comment';
  replyDiv.style.marginLeft = '20px';
  replyDiv.innerHTML = `
    <div class="comment-user">👤 ${randomUser}</div>
    <div class="comment-text">${randomReply}</div>
    <div class="comment-time">a few seconds ago</div>
  `;
  container.insertBefore(replyDiv, container.firstChild);
}

// Auto-refresh feeds periodically
setInterval(() => {
  // Refresh home feed every 5 minutes
  if (document.getElementById('homeFeeds') && isPageVisible()) {
    sampleFeeds.home.unshift({
      title: "🔄 New story just in!",
      description: "Live update at " + new Date().toLocaleTimeString(),
      time: "just now"
    });
    if (sampleFeeds.home.length > 10) sampleFeeds.home.pop();
    populateFeed('homeFeeds', sampleFeeds.home);
  }
}, 300000); // 5 minutes

// Check if page is visible
function isPageVisible() {
  return document.visibilityState === 'visible';
}

// Security: Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Font size adjustment (from original script.js)
function fontS(action) {
  const main = document.querySelector('main');
  const currentSize = window.getComputedStyle(main).fontSize;
  const size = parseFloat(currentSize);
  
  if (action === '+') {
    main.style.fontSize = (size + 2) + 'px';
  } else if (action === '-') {
    main.style.fontSize = Math.max(12, size - 2) + 'px';
  }
}

// Cookie management (from original script.js)
function closeCookie() {
  document.getElementById('cookieNotice').classList.add('popup-hide');
  localStorage.setItem('cookieAccepted', 'true');
}

// Check if cookie was already accepted
window.addEventListener('load', () => {
  if (localStorage.getItem('cookieAccepted')) {
    document.getElementById('cookieNotice').classList.add('popup-hide');
  }
});

// Toggle favorites list
function toggleFavList() {
  const favArea = document.querySelector('.fav-area');
  favArea.style.display = favArea.style.display === 'none' ? 'block' : 'none';
}
