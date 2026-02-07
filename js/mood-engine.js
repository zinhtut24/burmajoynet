/**
 * BurmaJoyNet Mood Engine
 * Handles dynamic themes, AI messages, and content suggestions based on user mood.
 */

const moodConfig = {
    'happy': {
        bodyClass: 'mood-happy',
        aiMessage: "That's wonderful! Your happiness is contagious. Spread the joy in our Creator Clubs!",
        quote: "Happiness is a choice, not a result.",
        suggestions: [
            { name: "Creators & Artists Hub", img: "https://picsum.photos/seed/art/400/250", link: "club-detail.html" },
            { name: "Laughter Therapy Circle", img: "https://picsum.photos/seed/laugh/400/250", link: "club-detail.html" }
        ]
    },
    'sad': {
        bodyClass: 'mood-sad',
        aiMessage: "It's okay to feel blue sometimes. Remember, even the sun hides behind clouds. How about some soothing music?",
        quote: "Tears are words the heart can't express.",
        suggestions: [
            { name: "Healing Music Sanctuary", img: "https://picsum.photos/seed/piano/400/250", link: "club-detail.html" },
            { name: "Supportive Hearts Club", img: "https://picsum.photos/seed/care/400/250", link: "club-detail.html" }
        ]
    },
    'stress': {
        bodyClass: 'mood-stress',
        aiMessage: "Take a deep breath. Exhale the pressure. Let's find some calm together in the meditation zone.",
        quote: "Breathe. It’s just a bad day, not a bad life.",
        suggestions: [
            { name: "Meditation & Zen Zone", img: "https://picsum.photos/seed/yoga/400/250", link: "club-detail.html" },
            { name: "Relaxing Nature Vlogs", img: "https://picsum.photos/seed/rain/400/250", link: "videos.html" }
        ]
    },
    'tired': {
        bodyClass: 'mood-tired',
        aiMessage: "You've worked hard today. Low battery detected! Rest is productive too. Enjoy some cozy content.",
        quote: "Rest is not idleness, it is part of the work.",
        suggestions: [
            { name: "Cozy Gamers Nook", img: "https://picsum.photos/seed/game/400/250", link: "club-detail.html" },
            { name: "Short Relaxing Stories", img: "https://picsum.photos/seed/book/400/250", link: "club-detail.html" }
        ]
    }
};

/**
 * Updates the entire page theme and content based on the selected mood
 * @param {string} mood - The selected mood ('happy', 'sad', 'stress', 'tired')
 */
function updateMoodTheme(mood) {
    const config = moodConfig[mood];
    if (!config) return;

    // 1. Update Body Class for CSS Background Transitions
    document.body.className = config.bodyClass;

    // 2. Show AI Response Area & Update Message
    const aiArea = document.getElementById('ai-response-area');
    const aiMsg = document.getElementById('ai-dynamic-msg');
    const quoteText = document.getElementById('quote-text');

    if (aiArea && aiMsg) {
        aiArea.classList.remove('d-none');
        aiMsg.innerText = config.aiMessage;
        
        // Add a small fade-in effect to the text
        aiMsg.style.opacity = 0;
        setTimeout(() => { aiMsg.style.opacity = 1; aiMsg.style.transition = "opacity 0.5s ease"; }, 100);
    }

    if (quoteText) {
        quoteText.innerText = `"${config.quote}"`;
    }

    // 3. Update Content Recommendations
    const container = document.getElementById('recommendation-engine');
    if (container) {
        container.innerHTML = ''; // Clear previous content

        config.suggestions.forEach((item, index) => {
            const cardHtml = `
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-3">
                        <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 180px; object-fit: cover;">
                        <div class="card-body p-4 text-center">
                            <h6 class="fw-bold mb-3">${item.name}</h6>
                            <a href="${item.link}" class="btn btn-joy-primary btn-sm rounded-pill px-4">Visit Now</a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardHtml;
        });
    }

    // 4. Smooth scroll to the AI insights
    window.scrollTo({
        top: aiArea.offsetTop - 120,
        behavior: 'smooth'
    });
}