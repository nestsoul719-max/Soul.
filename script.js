// 🌷 Soul.nest – Chat Logic (ChatGPT-style) 🌷

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

// 🔐 YAHAN APNI OPENAI API KEY PASTE KARNA
const OPENAI_API_KEY = "PASTE_YOUR_API_KEY_HERE";

// Message add karne ka function
function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message function
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // User message show
  addMessage(message, "user-msg");
  userInput.value = "";

  // Typing indicator
  const typing = document.createElement("div");
  typing.className = "bot-msg";
  typing.innerText = "typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are Soul.nest, a soft, caring, emotionally intelligent AI friend. Speak gently in Hinglish with a Gen-Z pookie vibe. Be comforting, supportive, sweet, and human-like."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Remove typing
    typing.remove();

    // AI reply
    const reply = data.choices[0].message.content;
    addMessage(reply, "bot-msg");

  } catch (error) {
    typing.remove();
    addMessage(
      "Baby thoda sa issue aa gaya 🥺 phir try karo na 💗",
      "bot-msg"
    );
  }
}
