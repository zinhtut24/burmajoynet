/**
 * BurmaJoyNet Language Engine
 * Handles English and Myanmar Translation
 */

const translations = {
    'en': {
        'nav_home': 'Home',
        'nav_clubs': 'Clubs',
        'nav_videos': 'Videos',
        'nav_challenges': 'Challenges',
        'hero_title': 'How\'s your <span class="text-gradient">Soul</span> today?',
        'hero_subtitle': 'Select your current mood for personalized joy.',
        'btn_upload': 'Upload',
        'footer_text': 'BurmaJoyNet is your daily mental health companion.',
        'status_online': 'Always Online',
        'msg_placeholder': 'Type your message here...',
        'btn_save': 'Save Changes'
    },
    'mm': {
        'nav_home': 'ပင်မစာမျက်နှာ',
        'nav_clubs': 'ကလပ်များ',
        'nav_videos': 'ဗီဒီယိုများ',
        'nav_challenges': 'စိန်ခေါ်မှုများ',
        'hero_title': 'ဒီနေ့ စိတ်အခြေအနေ <span class="text-gradient">ဘယ်လိုရှိလဲ?</span>',
        'hero_subtitle': 'သင့်စိတ်ကြိုက် ပျော်ရွှင်မှုများ ရရှိဖို့ Mood ကို ရွေးချယ်ပါ။',
        'btn_upload': 'တင်မည်',
        'footer_text': 'BurmaJoyNet သည် သင်၏ နေ့စဉ် စိတ်ကျန်းမာရေး ဖော်ဆောင်ဖက် ဖြစ်သည်။',
        'status_online': 'အမြဲတမ်း အွန်လိုင်း',
        'msg_placeholder': 'စာရိုက်ရန်...',
        'btn_save': 'သိမ်းဆည်းမည်'
    }
};

/**
 * ဘာသာစကား ပြောင်းလဲရန် Function
 */
function changeLanguage(lang) {
    // 1. LocalStorage မှာ သိမ်းထားမယ် (Page refresh လုပ်ရင် ပြန်မပြောင်းသွားအောင်)
    localStorage.setItem('selectedLanguage', lang);

    // 2. HTML မှာရှိတဲ့ [data-lang] attribute အားလုံးကို ရှာပြီး စာသားပြောင်းမယ်
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // 3. Dropdown မှာ ရွေးထားတဲ့ ဘာသာစကားကို ပြပေးထားမယ်
    const selector = document.getElementById('langSelector');
    if (selector) selector.value = lang;
}

/**
 * Page စဖွင့်လိုက်တာနဲ့ အရင်ရွေးထားတဲ့ Language အတိုင်း ပြပေးမယ့် Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLang);

    // Selector ရှိရင် Event ချိတ်မယ်
    const selector = document.getElementById('langSelector');
    if (selector) {
        selector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});