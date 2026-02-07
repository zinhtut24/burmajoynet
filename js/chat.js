document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBody = document.getElementById('chat-messages');

    // Function to add a new message to UI
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg-item msg-${sender} mb-4 d-flex ${sender === 'user' ? 'justify-content-end' : ''} gap-3 animate__animated animate__fadeIn`;
        
        const content = `
            ${sender === 'bot' ? '<div class="ai-icon-sm bg-primary text-white rounded-circle shadow-sm"><i class="bi bi-robot"></i></div>' : ''}
            <div class="msg-content p-3 rounded-4 ${sender === 'bot' ? 'bg-light shadow-sm' : 'bg-primary text-white shadow-sm'}">
                <p class="mb-0 small fw-bold">${text}</p>
            </div>
            ${sender === 'user' ? '<div class="user-icon-sm bg-secondary text-white rounded-circle shadow-sm fw-bold">Z</div>' : ''}
        `;
        
        msgDiv.innerHTML = content;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to bottom
    }

    // Event listeners
    sendBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
            addMessage(text, 'user');
            input.value = '';
            
            // Simulating AI Response (Later link to Groq API)
            setTimeout(() => {
                addMessage("I'm processing your thoughts. Remember, take a deep breath...", 'bot');
            }, 1000);
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
});

function clearChat() {
    if (confirm("Clear all messages?")) {
        document.getElementById('chat-messages').innerHTML = '';
    }
}

// js/chat.js

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = "gsk_your_actual_api_key_here"; // ပြိုင်ပွဲအတွက်ဆိုလျှင် တိုက်ရိုက်ထည့်ထားနိုင်သည်

async function getAIResponse(userMessage) {
    try {
        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768", // မြန်မာစာအတွက် အဆင်ပြေဆုံး model
                messages: [
                    {
                        role: "system",
                        content: "မင်းက BurmaJoyNet ရဲ့ AI Buddy ဖြစ်ပါတယ်။ လူတွေကို ပျော်ရွှင်အောင်၊ စိတ်ဓာတ်မကျအောင် အားပေးစကားပြောပေးရမယ်။ မြန်မာလိုပဲ ပြန်ဖြေပေးပါ။"
                    },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching Groq API:", error);
        return "စိတ်မကောင်းပါဘူး၊ အခုလောလောဆယ် ကျွန်တော် နည်းနည်း အလုပ်ရှုပ်နေလို့ပါ။ ခဏနေမှ ပြန်ပြောပေးမယ်နော်။";
    }
}

// UI နဲ့ ချိတ်ဆက်ပုံ
document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user'); // User စာကို UI မှာပြ
        input.value = '';

        // AI ဆီက အဖြေကို စောင့်မယ်
        const botResponse = await getAIResponse(message);
        addMessage(botResponse, 'bot'); // AI အဖြေကို UI မှာပြ
    }
});