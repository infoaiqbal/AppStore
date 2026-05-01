// --- ১. এলিমেন্ট সিলেক্টর ---
const navDrawer = document.getElementById('nav-drawer');
const overlay = document.getElementById('drawer-overlay');
const appGrid = document.getElementById('app-grid');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('searchBar');
const toggleSearch = document.getElementById('toggle-search');
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// স্লাইডার ডাটা
const sliderData = [
    { img: "slide/3.jpg", link: "#" },
    { img: "slide/1.jpg", link: "#" },
    { img: "slide/2.jpg", link: "#" }
];

// --- ২. অ্যাপ ডেটা ---
const apps = [
    { 
        id: 1, 
        name: "Al Quran Kareem", 
        icon: "https://via.placeholder.com/150/065f46/FFFFFF?text=Quran", 
        rating: 4.9, 
        category: "আল-কুরআন", 
        link: "https://example.com/quran", 
        size: "২৫ এমবি", 
        downloads: "১০এম+",
        description: "এই অ্যাপটিতে আপনি অর্থসহ আল-কুরআন পড়তে পারবেন...", 
        screenshots: ["https://via.placeholder.com/200x350/065f46/FFFFFF?text=S1"] 
    },
    { 
        id: 2, 
        name: "Muslim Pro", 
        icon: "icon/Audio.png", 
        rating: 4.8, 
        category: "নামাজ ও সময়", 
        link: "https://example.com/muslimpro", 
        size: "৩০ এমবি", 
        downloads: "৫০এম+",
        description: "নামাজের সঠিক সময় এবং কিবলার দিক নির্ণয়ের জন্য...", 
        screenshots: ["ss/ss3.jpg","ss/ss2.jpg"] 
    },
    { 
        id: 3, 
        name: "Hadith BD", 
        icon: "https://via.placeholder.com/150/047857/FFFFFF?text=Hadith", 
        rating: 4.7, 
        category: "হাদিস", 
        link: "#", 
        size: "১৫ এমবি", 
        downloads: "১এম+",
        description: "গুরুত্বপূর্ণ হাদিস গ্রন্থগুলোর বাংলা অনুবাদ...", 
        screenshots: [] 
    }
];

// --- ৩. থিম টগল লজিক ---
function updateIcons(isDark) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (isDark) {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    } else {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
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

// --- ৫. ফিল্টার এবং সার্চ লজিক ---
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

function filterByCategory(cat) {
    const targetCategory = cat.trim();
    const filtered = (targetCategory === 'সব অ্যাপ') ? apps : apps.filter(app => app.category.trim() === targetCategory);
    displayApps(filtered);
    if (searchInput) searchInput.value = "";
    if (!navDrawer.classList.contains('-translate-x-full')) toggleDrawer();
}

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

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    displayApps(apps.filter(app => app.name.toLowerCase().includes(term)));
});

// --- ৬. অ্যাপ এবং মোডাল লজিক (ইন্সটল এনিমেশন সহ) ---
function openAppDetails(index) {
    const app = apps[index];
    if(!app) return;

    // ডাটা সেট করা
    document.getElementById('modal-title').innerText = app.name;
    document.getElementById('modal-rating').innerText = app.rating + " ★";
    document.getElementById('modal-size').innerText = app.size || "০ এমবি";
    document.getElementById('modal-downloads').innerText = app.downloads || "০+";
    document.getElementById('modal-icon').src = app.icon;
    document.getElementById('modal-desc').innerText = app.description || "তথ্য নেই";
    
    const catEl = document.getElementById('modal-category');
    const progText = document.getElementById('progress-text');
    catEl.innerText = app.category;
    catEl.classList.remove('hidden');
    progText.classList.add('hidden');

    const modalIcon = document.getElementById('modal-icon');
    const snakePath = document.querySelector('.snake');
    const installBtn = document.getElementById('download-link');
    
    // রিসেট: ক্লিক করার আগে স্কয়ার থাকবে
    modalIcon.style.borderRadius = "1.25rem"; 
    if(snakePath) snakePath.setAttribute("d", "");
    installBtn.innerText = "ইন্সটল করুন";
    installBtn.disabled = false;

    // ডাউনলোড ফাংশন
    installBtn.onclick = () => {
        installBtn.disabled = true;
        installBtn.innerText = "অপেক্ষা করুন...";
        
        // ক্লিক করার সাথে সাথে গোল হবে
        modalIcon.style.borderRadius = "50%"; 
        
        catEl.classList.add('hidden');
        progText.classList.remove('hidden');

        let prog = 0, off = 0;
        const toBengali = n => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

        function animate() {
            if (prog < 100) {
                // স্পিড কমানো হয়েছে (০.৬ থেকে ০.৩ করা হয়েছে)
                prog += 0.3; 
                off++;
                
                if(snakePath) {
                    let d = "", angle = (prog / 100) * 360;
                    for (let a = 0; a <= angle; a += 2) {
                        let s = Math.sin((a * 0.4) - (off * 0.2)) * 2.2;
                        let rad = (a * Math.PI) / 180;
                        let x = 50 + (47 + s) * Math.cos(rad);
                        let y = 50 + (47 + s) * Math.sin(rad);
                        d += (a === 0 ? "M" : "L") + x + "," + y;
                    }
                    snakePath.setAttribute("d", d);
                }

                progText.innerText = toBengali(Math.floor(prog)) + "% ডাউনলোড হচ্ছে";
                requestAnimationFrame(animate);
            } else {
                progText.innerText = "১০০% সম্পন্ন";
                saveToHistory(app);
                setTimeout(() => {
                    window.open(app.link, '_blank');
                    document.getElementById('app-modal').classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                }, 500);
            }
        }
        animate();
    };

    const ss = document.getElementById('modal-screenshots');
    ss.innerHTML = app.screenshots.map(s => `<img src="${s}" class="w-32 h-56 rounded-xl flex-shrink-0 shadow-sm border dark:border-slate-700">`).join('');

    document.getElementById('app-modal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

document.getElementById('close-modal').onclick = () => {
    document.getElementById('app-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
};

// --- ৭. হিস্ট্রি ম্যানেজমেন্ট ---
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
    
    if (show) {
        renderHistoryList();
        historyPanel.classList.remove('-translate-x-full');
        if (!navDrawer.classList.contains('-translate-x-full')) toggleDrawer();
    } else {
        historyPanel.classList.add('-translate-x-full');
    }
}

function renderHistoryList() {
    const history = JSON.parse(localStorage.getItem('appHistory') || '[]');
    const panel = document.getElementById('history-panel');
    panel.innerHTML = `
        <div class="p-5 border-b dark:border-slate-700 flex justify-between items-center bg-emerald-600 text-white">
            <span class="font-bold">আমার হিস্ট্রি</span>
            <button onclick="toggleHistory(false)" class="text-3xl">&times;</button>
        </div>
        <div class="p-2 space-y-3 overflow-y-auto h-[calc(100%-70px)] scrollbar-hide">
            ${history.length === 0 ? '<p class="text-center text-gray-400 mt-10 text-xs">কোনো হিস্ট্রি নেই</p>' : 
              history.map((app, i) => {
                const actualIndex = apps.findIndex(a => a.id === app.id);
                return `
                <div class="relative bg-white dark:bg-slate-900 p-2 flex items-center justify-between border dark:border-slate-800 rounded-2xl shadow-sm cursor-pointer" onclick="openAppDetails(${actualIndex}); toggleHistory(false);">
                    <div class="flex items-center space-x-3">
                        <img src="${app.icon}" class="w-10 h-10 rounded-lg">
                        <p class="text-[11px] font-bold dark:text-white truncate w-24">${app.name}</p>
                    </div>
                    <button onclick="event.stopPropagation(); deleteHistory(${i})" class="text-red-500 p-1">✕</button>
                </div>`;
              }).join('')}
        </div>`;
}

function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem('appHistory') || '[]');
    history.splice(index, 1);
    localStorage.setItem('appHistory', JSON.stringify(history));
    renderHistoryList();
}

// --- ৮. স্লাইড শো লজিক ---
let currentSlide = 0;
let autoPlay;

function initSlider() {
    const wrapper = document.getElementById('slider-wrapper');
    const dotsContainer = document.getElementById('slider-dots');
    if (!wrapper || !dotsContainer) return;
    
    wrapper.innerHTML = sliderData.map((slide, i) => `
        <a href="${slide.link}" class="slide ${i === 0 ? 'active' : ''}">
            <img src="${slide.img}" class="w-full h-full object-cover">
        </a>
    `).join('');

    dotsContainer.innerHTML = sliderData.map((_, i) => `
        <div class="w-2 h-2 rounded-full bg-white/50 transition-all ${i === 0 ? 'w-6 bg-white' : ''}"></div>
    `).join('');

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = dotsContainer.children;
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.replace('w-6', 'w-2');
        dots[currentSlide].classList.replace('bg-white', 'bg-white/50');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.replace('w-2', 'w-6');
        dots[currentSlide].classList.replace('bg-white/50', 'bg-white');
    }

    autoPlay = setInterval(() => showSlide(currentSlide + 1), 3000);
}

// --- ৯. স্ক্রল লজিক ---
const backToTop = document.getElementById('back-to-top');
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
        const progress = scrollTop / docHeight;
        const offset = 283 - (progress * 283);
        if (progressBar) progressBar.style.strokeDashoffset = offset;
    }
    if (scrollTop > 300) backToTop?.classList.add('show');
    else backToTop?.classList.remove('show');
});

backToTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// --- ১০. ইনিশিয়াল লোড ---
document.addEventListener('DOMContentLoaded', () => {
    displayApps(apps); 
    initSlider();     
});
