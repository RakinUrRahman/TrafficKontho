// Sidebar toggle (same as your dashboard.js)
document.getElementById("moreOptions").addEventListener("click", () => {
    document.getElementById("sideNav").classList.toggle("active");
  });
  document.querySelector(".back-btn").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("sideNav").classList.remove("active");
  });
  
  // Dummy notification data
  const notifications = [
    { id: 1, text: "Your report #1234 has been reviewed.", time: "2 hours ago", read: false },
    { id: 2, text: "New violation reported in your area.", time: "Yesterday", read: true },
    { id: 3, text: "Your comment on report #1220 was replied to.", time: "3 days ago", read: false },
    { id: 4, text: "System maintenance scheduled for tomorrow.", time: "5 days ago", read: true },
  ];
  
  // Reference to the notifications container
  const notificationsListEl = document.getElementById("notificationsList");
  
  function renderNotifications() {
    notificationsListEl.innerHTML = "";
  
    if (notifications.length === 0) {
      notificationsListEl.innerHTML = '<div class="no-notifications">No notifications available.</div>';
      return;
    }
  
    notifications.forEach(notif => {
      const div = document.createElement("div");
      div.className = "notification-item " + (notif.read ? "" : "unread");
      div.dataset.id = notif.id;
  
      const text = document.createElement("div");
      text.className = "notification-text";
      text.textContent = notif.text;
  
      const time = document.createElement("div");
      time.className = "notification-time";
      time.textContent = notif.time;
  
      div.appendChild(text);
      div.appendChild(time);
  
      div.addEventListener("click", () => {
        markAsRead(notif.id);
      });
  
      notificationsListEl.appendChild(div);
    });
  }
  
  function markAsRead(id) {
    const notif = notifications.find(n => n.id === id);
    if (notif && !notif.read) {
      notif.read = true;
      renderNotifications();
    }
  }
  
  // Initial render
  renderNotifications();
  