// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
    }, 1200);
});

// Mood Configuration Data
const moodEngine = {
    'happy': {
        bgClass: 'mood-happy',
        msg: "That's wonderful! Your happiness is contagious. Spread it in our Creator Clubs!",
        quote: "Laughter is the shortest distance between two people.",
        clubs: [
            { name: "Creators & Artists Hub", img: "https://picsum.photos/seed/art/400/250" },
            { name: "Global Laughter Circle", img: "https://picsum.photos/seed/laugh/400/250" }
        ]
    },
    'sad': {
        bgClass: 'mood-sad',
        msg: "It's okay to feel blue. We're here for you. How about some soothing Lo-fi beats?",
        quote: "Tears are words the heart can't express.",
        clubs: [
            { name: "Lending an Ear (Support)", img: "https://picsum.photos/seed/care/400/250" },
            { name: "Healing Music Sanctuary", img: "https://picsum.photos/seed/piano/400/250" }
        ]
    },
    'stress': {
        bgClass: 'mood-stress',
        msg: "Take a deep breath. Exhale the pressure. Let's find some calm together.",
        quote: "In the middle of every difficulty lies opportunity.",
        clubs: [
            { name: "Meditation & Calm Zone", img: "https://picsum.photos/seed/yoga/400/250" },
            { name: "ASMR & Soft Vibes", img: "https://picsum.photos/seed/rain/400/250" }
        ]
    },
    'tired': {
        bgClass: 'mood-tired',
        msg: "You've worked hard. Time to recharge your battery with low-effort joy.",
        quote: "Rest is not idleness, it is part of the work.",
        clubs: [
            { name: "Cozy Readers Nook", img: "https://picsum.photos/seed/book/400/250" },
            { name: "Short Films & Relax", img: "https://picsum.photos/seed/watch/400/250" }
        ]
    }
};

// Update Function
function updateMoodTheme(mood) {
    const config = moodEngine[mood];
    
    // 1. Change Body Class (Transitions BG color)
    document.body.className = config.bgClass;
    
    // 2. Update AI Response Section
    document.getElementById('ai-response-area').classList.remove('d-none');
    document.getElementById('ai-dynamic-msg').innerText = config.msg;
    document.getElementById('quote-text').innerText = config.quote;
    document.getElementById('ai-status-title').innerText = `AI Buddy: Mood Detected (${mood.charAt(0).toUpperCase() + mood.slice(1)})`;

    // 3. Update Recommendations
    const container = document.getElementById('recommendation-engine');
    container.innerHTML = ''; // Clear current

    config.clubs.forEach(club => {
        container.innerHTML += `
            <div class="col-md-6" data-aos="fade-up">
                <div class="card border-0 glass-card h-100 shadow-sm overflow-hidden club-card">
                    <img src="${club.img}" class="card-img-top" alt="club">
                    <div class="card-body p-4 text-center">
                        <h5 class="fw-bold">${club.name}</h5>
                        <p class="small text-muted mb-3">Personalized suggestion based on your mood.</p>
                        <button class="btn btn-outline-primary btn-sm rounded-pill px-4">Enter Club</button>
                    </div>
                </div>
            </div>
        `;
    });

    // 4. Scroll smooth
    window.scrollTo({ top: document.getElementById('ai-response-area').offsetTop - 120, behavior: 'smooth' });
}