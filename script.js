// --- ১. এলিমেন্ট সিলেক্টর ---
const navDrawer = document.getElementById('nav-drawer');
const overlay = document.getElementById('drawer-overlay');
const appGrid = document.getElementById('app-grid');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('searchBar');
const toggleSearch = document.getElementById('toggle-search');
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// --- ২. অ্যাপ ডেটা ---
const apps = [
    { 
        id: 1, 
        name: "Al Quran Kareem", 
        icon: "https://via.placeholder.com/150/065f46/FFFFFF?text=Quran", 
        rating: 4.9, 
        category: "আল-কুরআন", 
        link: "#", 
        description: "এই অ্যাপটিতে আপনি অর্থসহ আল-কুরআন পড়তে পারবেন এবং তিলাওয়াত শুনতে পারবেন। এতে তাজবীদ শেখার বিশেষ ফিচার রয়েছে।",
        screenshots: ["https://via.placeholder.com/200x350/065f46/FFFFFF?text=S1", "https://via.placeholder.com/200x350/065f46/FFFFFF?text=S2"] 
    },
    { 
        id: 2, 
        name: "Muslim Pro", 
        icon: "icon/Audio.png", 
        rating: 4.8, 
        category: "নামাজ ও সময়", 
        link: "#", 
        description: "নামাজের সঠিক সময় এবং কিবলার দিক নির্ণয়ের জন্য এটি একটি সেরা অ্যাপ। এতে আজান অ্যালার্মের ব্যবস্থাও আছে।",
        screenshots: ["ss/ss3.jpg","ss/ss2.jpg","ss/ss1.jpg"] 
    },
    { 
        id: 3, 
        name: "Hadith BD", 
        icon: "https://via.placeholder.com/150/047857/FFFFFF?text=Hadith", 
        rating: 4.7, 
        category: "হাদিস", 
        link: "#", 
        description: "সহীহ বুখারী, মুসলিমসহ গুরুত্বপূর্ণ হাদিস গ্রন্থগুলোর বাংলা অনুবাদ এখন আপনার হাতের মুঠোয়।",
        screenshots: [] 
    },
{ 
        id: 9, 
        name: "Mufo", 
        icon: "https://via.placeholder.com/150/059669/FFFFFF?text=Muslim", 
        rating: 4.8, 
        category: "নামাজসময়", 
        link: "#", 
        description: "নামাজের সঠিক সময় এবং কিবলার দিক নির্ণয়ের জন্য এটি একটি সেরা অ্যাপ। এতে আজান অ্যালার্মের ব্যবস্থাও আছে।",
        screenshots: [] 
    },
{ 
        id: 7, 
        name: "Muslifdm Pro", 
        icon: "https://via.placeholder.com/150/059669/FFFFFF?text=Muslim", 
        rating: 4.8, 
        category: "সময়", 
        link: "#", 
        description: "নামাজের সঠিক সময় এবং কিবলার দিক নির্ণয়ের জন্য এটি একটি সেরা অ্যাপ। এতে আজান অ্যালার্মের ব্যবস্থাও আছে।",
        screenshots: [] 
    },
    { 
        id: 4, 
        name: "Dua & Zikir", 
        icon: "icon/Audio.png", 
        rating: 4.8, 
        category: "দোয়া", 
        link: "#", 
        description: "দৈনন্দিন জীবনের প্রয়োজনীয় দোয়া এবং জিকিরসমূহ অডিওসহ এই অ্যাপে পাওয়া যাবে।",
        screenshots: [] 
    }
];

// --- ৩. থিম টগল লজিক ---
function updateIcons(isDark) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons(isDark);
});

if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    updateIcons(true);
} else {
    updateIcons(false);
}

// --- ৪. ড্রয়ার এবং মেনু লজিক ---
function toggleDrawer() {
    navDrawer.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    if (!navDrawer.classList.contains('-translate-x-full')) {
        renderDrawer(); 
    }
}

document.getElementById('open-drawer').addEventListener('click', toggleDrawer);
document.getElementById('close-drawer').addEventListener('click', toggleDrawer);
overlay.addEventListener('click', toggleDrawer);

function renderDrawer() {
    const categories = ['সব অ্যাপ', ...new Set(apps.map(app => app.category))];
    const listContainer = navDrawer.querySelector('ul');
    
    const catIconSvg = `<svg class='w-5 h-5 mr-3 stroke-current fill-none' viewBox='0 0 24 24' stroke-width='1.5'><path d='M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z'></path><path d='M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z'></path><path d='M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z'></path><path d='M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z'></path></svg>`;
    const histIconSvg = `<svg class='w-5 h-5 mr-3 stroke-current fill-none' viewBox='0 0 24 24' stroke-width='1.5'><path d='M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z'></path><path d='M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001'></path></svg>`;

    let htmlContent = categories.map(cat => `
        <li><button onclick="filterByCategory('${cat}')" class="w-full flex items-center text-left p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-700 dark:text-gray-100 transition-colors">
            ${catIconSvg} <span class="text-sm font-medium">${cat}</span>
        </button></li>
    `).join('');

    htmlContent += `
        <li class="pt-4 border-t dark:border-slate-700">
            <button onclick="toggleHistory(true)" class="w-full flex items-center text-left p-3 rounded-xl bg-emerald-600 text-white shadow-md font-semibold">
                ${histIconSvg} <span class="text-sm">আমার অ্যাপ (হিস্ট্রি)</span>
            </button>
        </li>
    `;
    listContainer.innerHTML = htmlContent;
}

function filterByCategory(cat) {
    displayApps(cat === 'সব অ্যাপ' ? apps : apps.filter(a => a.category === cat));
    toggleDrawer();
}

// --- ৫. সার্চ লজিক ---
function closeSearch() {
    searchContainer.classList.remove('w-full', 'opacity-100', 'visible', 'show');
    searchContainer.classList.add('w-0', 'opacity-0', 'invisible');
    searchInput.value = "";
    displayApps(apps);
}

toggleSearch.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = searchContainer.classList.contains('visible');
    if (!isVisible) {
        searchContainer.classList.remove('w-0', 'opacity-0', 'invisible');
        searchContainer.classList.add('w-full', 'opacity-100', 'visible', 'show');
        setTimeout(() => searchInput.focus(), 300);
    } else {
        closeSearch();
    }
});

document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && e.target !== toggleSearch) {
        closeSearch();
    }
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    displayApps(apps.filter(app => app.name.toLowerCase().includes(term)));
});

// --- ৬. অ্যাপ এবং মোডাল লজিক ---
function displayApps(appList) {
    appGrid.innerHTML = appList.map((app) => {
        const appIndex = apps.findIndex(a => a.id === app.id);
        return `
        <div onclick="openAppDetails(${appIndex})" class="app-card cursor-pointer p-3 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <img src="${app.icon}" class="w-full aspect-square rounded-2xl mb-3 object-cover shadow-sm">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm">${app.name}</h3>
            <p class="text-[10px] text-gray-500 mt-1">${app.category}</p>
            <div class="flex justify-between items-center mt-3">
                <span class="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 px-2 py-1 rounded font-bold">${app.rating} ★</span>
                <span class="text-[10px] bg-emerald-600 text-white px-3 py-1 rounded-full uppercase">Install</span>
            </div>
        </div>`;
    }).join('');
}

function openAppDetails(index) {
    const app = apps[index];
    document.getElementById('modal-title').innerText = app.name;
    document.getElementById('modal-category').innerText = app.category;
    document.getElementById('modal-rating').innerText = app.rating + " ★";
    document.getElementById('modal-icon').src = app.icon;
    
    const descEl = document.querySelector('#app-modal p.text-gray-600') || document.getElementById('modal-desc'); 
    if (descEl) descEl.innerText = app.description || "এই অ্যাপটি সম্পর্কে কোনো তথ্য নেই।";

    document.getElementById('download-link').onclick = () => {
        saveToHistory(app);
        window.open(app.link, '_blank');
    };

    const ss = document.getElementById('modal-screenshots');
    ss.innerHTML = app.screenshots.length > 0 
        ? app.screenshots.map(s => `<img src="${s}" class="w-32 h-56 rounded-xl flex-shrink-0 shadow-sm border dark:border-slate-700">`).join('') 
        : '<p class="text-gray-400 text-xs">কোনো স্ক্রিনশট নেই</p>';

    document.getElementById('app-modal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

document.getElementById('close-modal').onclick = () => {
    document.getElementById('app-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
};

// --- ৭. হিস্ট্রি এবং সোয়াইপ লজিক ---
function saveToHistory(app) {
    let history = JSON.parse(localStorage.getItem('appHistory') || '[]');
    if (!history.find(h => h.id === app.id)) {
        history.push(app);
        localStorage.setItem('appHistory', JSON.stringify(history));
    }
}

function toggleHistory(show) {
    let historyPanel = document.getElementById('history-panel');
    if (!historyPanel) {
        historyPanel = document.createElement('div');
        historyPanel.id = 'history-panel';
        historyPanel.className = 'fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 z-[70] transform -translate-x-full transition-transform duration-300 shadow-2xl border-r dark:border-slate-700';
        document.body.appendChild(historyPanel);
    }
    show ? (renderHistoryList(), historyPanel.classList.remove('-translate-x-full')) : historyPanel.classList.add('-translate-x-full');
}

function renderHistoryList() {
    const history = JSON.parse(localStorage.getItem('appHistory') || '[]');
    const panel = document.getElementById('history-panel');
    const deleteIcon = `<svg class='w-6 h-6 stroke-current fill-none' viewBox='0 0 24 24' stroke-width='2'><path d='M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001M10.33 16.5H13.66M9.5 12.5H14.5'></path></svg>`;

    panel.innerHTML = `
        <div class="p-5 border-b dark:border-slate-700 flex justify-between items-center bg-emerald-600 text-white">
            <span class="font-bold">আমার হিস্ট্রি</span>
            <button onclick="toggleHistory(false)" class="text-3xl">&times;</button>
        </div>
        <div class="p-2 space-y-3 overflow-y-auto h-[calc(100%-70px)] scrollbar-hide">
            ${history.length === 0 ? '<p class="text-center text-gray-400 mt-10 text-xs">কোনো হিস্ট্রি নেই</p>' : 
              history.map((app, i) => `
                <div class="relative bg-red-500 rounded-2xl overflow-hidden h-16 shadow-sm">
                    <button onclick="deleteHistory(${i})" class="absolute inset-y-0 right-0 flex items-center justify-center w-16 text-white active:scale-90 transition-transform">
                        ${deleteIcon}
                    </button>
                    <div class="absolute inset-0 bg-white dark:bg-slate-900 p-2 flex items-center justify-between transition-transform duration-200 touch-pan-x border dark:border-slate-800 rounded-2xl" 
                         style="transform: translateX(0)" ontouchstart="handleTS(event)" ontouchmove="handleTM(event, this)">
                        <div class="flex items-center space-x-3 pointer-events-none">
                            <img src="${app.icon}" class="w-10 h-10 rounded-lg">
                            <p class="text-[11px] font-bold dark:text-white truncate w-24">${app.name}</p>
                        </div>
                        <a href="${app.link}" class="bg-emerald-600 text-white text-[9px] px-2 py-1 rounded-lg font-bold">Install</a>
                    </div>
                </div>`).join('')}
        </div>`;
}

let startX = 0;
function handleTS(e) { startX = e.touches[0].clientX; }
function handleTM(e, el) {
    const diff = startX - e.touches[0].clientX;
    if (diff > 0) el.style.transform = `translateX(-${Math.min(diff, 80)}px)`;
    else el.style.transform = `translateX(0)`;
}

function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem('appHistory') || '[]');
    history.splice(index, 1);
    localStorage.setItem('appHistory', JSON.stringify(history));
    renderHistoryList();
}

// --- ৮. ইনিশিয়াল লোড ---
displayApps(apps);


// back to top
const backToTop = document.getElementById('back-to-top');
const progressBar = document.getElementById('progress-bar');
const totalLength = 283; // সার্কেলের পরিধি

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // ১. প্রগ্রেস বার আপডেট
    if (docHeight > 0) {
        const progress = scrollTop / docHeight;
        const offset = totalLength - (progress * totalLength);
        progressBar.style.strokeDashoffset = offset;
    }

    // ২. বাটন দেখানো (Show/Hide)
    if (scrollTop > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// ক্লিক করলে টপে যাওয়া
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
