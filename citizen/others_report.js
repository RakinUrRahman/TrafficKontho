document.getElementById("map").addEventListener('wheel', e => console.log('wheel event', e));

// Sidebar toggle (same as before)
document.getElementById("moreOptions").addEventListener("click", () => {
  document.getElementById("sideNav").classList.toggle("active");
});
document.querySelector(".back-btn").addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("sideNav").classList.remove("active");
});

// Sample data
const reports = [
  {
    id: 1,
    title: "Speeding Vehicle",
    description: "A car speeding near the market area at 3 PM.",
    media: [
      { type: "image", url: "/citizen/illeagalParking.jpeg" }
    ],
    location: [23.8103, 90.4125],
    upvotes: 12,
    comments: [
      { user: "Nahid", text: "Thanks for reporting!" },
      { user: "Rony", text: "I saw it too yesterday." }
    ]
  },
  {
    id: 2,
    title: "Illegal Parking",
    description: "Motorbike illegally parked blocking the sidewalk.",
    media: [{ type: "image", url: "citizen/illeagalParking.jpeg" }],
    location: [23.8110, 90.4200],
    upvotes: 8,
    comments: []
  },
  {
    id: 3,
    title: "Traffic Signal Violation",
    description: "Red light runner at main junction.",
    media: [],
    location: [23.8090, 90.4150],
    upvotes: 20,
    comments: [
      { user: "Charlie", text: "This happens all the time here." }
    ]
  }
];

const reportsList = document.getElementById("reportsList");
const mediaModal = document.getElementById("mediaModal");
const mediaContainer = document.getElementById("mediaContainer");
const closeBtn = document.querySelector(".close-btn");

// Render reports
function renderReports(list) {
  reportsList.innerHTML = "";
  list.forEach(report => {
    const card = document.createElement("div");
    card.classList.add("report-card");

    // Title & desc
    const title = document.createElement("div");
    title.className = "report-header";
    title.textContent = report.title;
    card.appendChild(title);

    const desc = document.createElement("div");
    desc.className = "report-desc";
    desc.textContent = report.description;
    card.appendChild(desc);

    // Media thumbnails
    if (report.media.length) {
      const mediaDiv = document.createElement("div");
      mediaDiv.className = "media-thumbnails";
      report.media.forEach(m => {
        const thumb = document.createElement(m.type === "image" ? "img" : "video");
        thumb.className = "media-thumb";
        if (m.type === "image") {
          thumb.src = m.url;
          thumb.alt = report.title;
        } else {
          thumb.src = m.url;
          thumb.muted = true;
          thumb.playsInline = true;
          thumb.loop = true;
          thumb.autoplay = true;
        }
        thumb.addEventListener("click", () => openMediaModal(m));
        mediaDiv.appendChild(thumb);
      });
      card.appendChild(mediaDiv);
    }

    // Actions: upvote and comment button
    const actions = document.createElement("div");
    actions.className = "report-actions";

    const upvoteBtn = document.createElement("button");
    upvoteBtn.className = "report-btn";
    upvoteBtn.innerHTML = `<i class="bx bx-upvote"></i> Upvote (${report.upvotes})`;
    upvoteBtn.addEventListener("click", () => {
      report.upvotes++;
      upvoteBtn.innerHTML = `<i class="bx bx-upvote"></i> Upvote (${report.upvotes})`;
    });

    const commentBtn = document.createElement("button");
    commentBtn.className = "report-btn";
    commentBtn.innerHTML = `<i class="bx bx-comment-detail"></i> Comment`;
    commentBtn.addEventListener("click", () => {
      commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    });

    actions.appendChild(upvoteBtn);
    actions.appendChild(commentBtn);
    card.appendChild(actions);

    // Comments section container
    const commentSection = document.createElement("div");
    commentSection.className = "comments-section";
    commentSection.style.display = "none"; // initially hidden

    // Existing comments
    const commentsList = document.createElement("div");
    commentsList.className = "comments-list";
    report.comments.forEach(c => {
      const cDiv = document.createElement("div");
      cDiv.className = "comment-item";
      cDiv.innerHTML = `<strong>${c.user}:</strong> ${c.text}`;
      commentsList.appendChild(cDiv);
    });
    commentSection.appendChild(commentsList);

    // Input area to add comment
    const commentInputWrapper = document.createElement("div");
    commentInputWrapper.className = "comment-input-wrapper";

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Write a comment...";
    commentInput.className = "comment-input";

    const commentSubmit = document.createElement("button");
    commentSubmit.className = "report-btn comment-submit-btn";
    commentSubmit.textContent = "Add";

    commentSubmit.addEventListener("click", () => {
      const text = commentInput.value.trim();
      if (!text) return alert("Please enter a comment.");

      // Add comment to data and UI
      const newComment = { user: "You", text };
      report.comments.push(newComment);

      const newCommentDiv = document.createElement("div");
      newCommentDiv.className = "comment-item";
      newCommentDiv.innerHTML = `<strong>${newComment.user}:</strong> ${newComment.text}`;
      commentsList.appendChild(newCommentDiv);

      commentInput.value = "";
    });

    commentInputWrapper.appendChild(commentInput);
    commentInputWrapper.appendChild(commentSubmit);
    commentSection.appendChild(commentInputWrapper);

    card.appendChild(commentSection);

    // *** Show Report Button ***
    const showBtn = document.createElement("button");
    showBtn.className = "report-btn show-btn";
    showBtn.textContent = "Show Report";
    showBtn.addEventListener("click", () => {
      const details = `
        <h2>${report.title}</h2>
        <p>${report.description}</p>
        <h4>Location: [${report.location.join(", ")}]</h4>
        <div>${report.media.map(m => {
          if (m.type === "image") {
            return `<img src="${m.url}" alt="report image" style="width:100%; margin-top:10px;" />`;
          } else {
            return `<video controls src="${m.url}" style="width:100%; margin-top:10px;"></video>`;
          }
        }).join("")}</div>
      `;
      mediaContainer.innerHTML = details;
      mediaModal.style.display = "flex";
    });
    card.appendChild(showBtn);

    // *** Delete Button ***
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "report-btn delete-btn";
    deleteBtn.style.backgroundColor = "#e74c3c";
    deleteBtn.textContent = "Delete Report";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this report?")) {
        const index = reports.findIndex(r => r.id === report.id);
        if (index !== -1) {
          reports.splice(index, 1);
          renderReports(reports); // Re-render after deletion
        }
      }
    });
    card.appendChild(deleteBtn);

    reportsList.appendChild(card);
  });
}

// Open media modal
function openMediaModal(media) {
  mediaContainer.innerHTML = "";
  if (media.type === "image") {
    const img = document.createElement("img");
    img.src = media.url;
    mediaContainer.appendChild(img);
  } else if (media.type === "video") {
    const video = document.createElement("video");
    video.src = media.url;
    video.controls = true;
    mediaContainer.appendChild(video);
  }
  mediaModal.style.display = "flex";
}

// Close modal
closeBtn.onclick = () => {
  mediaModal.style.display = "none";
};
window.onclick = e => {
  if (e.target === mediaModal) {
    mediaModal.style.display = "none";
  }
};

// Initialize Leaflet map with heatmap
function initMap() {
  const map = L.map("map", {
    scrollWheelZoom: true,   // enable zoom with mouse wheel
    touchZoom: true,         // enable pinch zoom on touch devices
    zoomControl: true        // show zoom control buttons
  }).setView([23.8103, 90.4125], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  // heatmap or markers as before



  // Prepare heat points: each is [lat, lng, intensity]
  // Adjust intensity if you want to highlight some points more
  const heatPoints = reports.map(r => [...r.location, 0.7]); // 0.7 intensity for all

  if (window.L && L.heatLayer) {
    // Add heat layer with nicer radius and blur for better visibility
    L.heatLayer(heatPoints, {
      radius: 30,   // bigger radius
      blur: 25,     // more blur
      maxZoom: 17,
      max: 1.0      // max intensity
    }).addTo(map);
  } else {
    // Fallback: add normal markers
    reports.forEach(r => {
      L.marker(r.location)
        .addTo(map)
        .bindPopup(`<strong>${r.title}</strong><br>${r.description}`);
    });
  }

  // Optional: Add zoom control (should be there by default)
  map.zoomControl.setPosition('topright');
}


renderReports(reports);
initMap();
