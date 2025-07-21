// Sidebar toggle (same as your dashboard.js)
document.getElementById("moreOptions").addEventListener("click", () => {
    document.getElementById("sideNav").classList.toggle("active");
  });
  document.querySelector(".back-btn").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("sideNav").classList.remove("active");
  });
  
  // Dummy contacts and messages data
  const contacts = [
    { id: 1, name: "Alice", avatar: "A", messages: [
      { from: "Alice", text: "Hey! Have you reported the incident?", time: "10:15 AM" },
      { from: "You", text: "Not yet, planning to do it today.", time: "10:17 AM" }
    ]},
    { id: 2, name: "Bob", avatar: "B", messages: [
      { from: "Bob", text: "The traffic is crazy today.", time: "09:30 AM" },
      { from: "You", text: "Yeah, I got stuck for 30 minutes!", time: "09:32 AM" }
    ]},
    { id: 3, name: "Charlie", avatar: "C", messages: [
      { from: "Charlie", text: "Remember to check out the new reports page.", time: "Yesterday" }
    ]},
  ];
  
  const contactsListEl = document.getElementById("contactsList");
  const chatHeaderEl = document.getElementById("chatHeader");
  const chatMessagesEl = document.getElementById("chatMessages");
  const chatInputEl = document.getElementById("chatInput");
  const sendBtnEl = document.getElementById("sendBtn");
  
  let selectedContactId = null;
  
  // Render contacts list
  function renderContacts() {
    contactsListEl.innerHTML = "";
    contacts.forEach(contact => {
      const div = document.createElement("div");
      div.className = "contact-item" + (contact.id === selectedContactId ? " active" : "");
      div.dataset.id = contact.id;
  
      const avatar = document.createElement("div");
      avatar.className = "contact-avatar";
      avatar.textContent = contact.avatar;
  
      const name = document.createElement("div");
      name.className = "contact-name";
      name.textContent = contact.name;
  
      div.appendChild(avatar);
      div.appendChild(name);
  
      div.addEventListener("click", () => {
        selectedContactId = contact.id;
        renderContacts();
        openChat(contact.id);
      });
  
      contactsListEl.appendChild(div);
    });
  }
  
  // Open chat with selected contact
  function openChat(contactId) {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;
  
    chatHeaderEl.textContent = contact.name;
    chatMessagesEl.innerHTML = "";
  
    contact.messages.forEach(msg => {
      appendMessage(msg.from === "You" ? "sent" : "received", msg.text, msg.time);
    });
  
    chatInputEl.disabled = false;
    sendBtnEl.disabled = false;
    chatInputEl.focus();
  
    scrollToBottom();
  }
  
  // Append message to chat window
  function appendMessage(type, text, time = "") {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message " + type;
    msgDiv.textContent = text;
  
    if (time) {
      const timeSpan = document.createElement("div");
      timeSpan.style.fontSize = "0.7rem";
      timeSpan.style.opacity = "0.6";
      timeSpan.style.marginTop = "3px";
      timeSpan.textContent = time;
      msgDiv.appendChild(timeSpan);
    }
  
    chatMessagesEl.appendChild(msgDiv);
    scrollToBottom();
  }
  
  // Scroll chat to bottom
  function scrollToBottom() {
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }
  
  // Handle send message
  sendBtnEl.addEventListener("click", () => {
    sendMessage();
  });
  
  chatInputEl.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
  
  function sendMessage() {
    const text = chatInputEl.value.trim();
    if (!text || !selectedContactId) return;
  
    // Add message to data
    const contact = contacts.find(c => c.id === selectedContactId);
    if (!contact) return;
  
    contact.messages.push({ from: "You", text, time: "Now" });
  
    // Append to UI
    appendMessage("sent", text, "Now");
    chatInputEl.value = "";
    chatInputEl.focus();
  }
  
  // Initialize contact list
  renderContacts();
  