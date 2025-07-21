document.getElementById("moreOptions").addEventListener("click", () => {
    document.getElementById("sideNav").classList.toggle("active");
  });
  document.querySelector(".back-btn").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("sideNav").classList.remove("active");
  });


document.addEventListener("DOMContentLoaded", () => {
    const reportList = document.getElementById("reportList");
  
    // Modal elements
    const modal = document.getElementById("reportModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDateTime = document.getElementById("modalDateTime");
    const modalDescription = document.getElementById("modalDescription");
    const modalStatus = document.getElementById("modalStatus");
    const modalLocation = document.getElementById("modalLocation");
    const modalPhotos = document.getElementById("modalPhotos");
    const modalVideos = document.getElementById("modalVideos");
    const closeBtn = modal.querySelector(".close-btn");
  
    // Close modal function
    function closeModal() {
      modal.style.display = "none";
    }
    closeBtn.onclick = closeModal;
    window.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  
    // Load reports from localStorage
    let reportData = JSON.parse(localStorage.getItem('myReports')) || [];
  
    function renderReports() {
      reportList.innerHTML = "";
      if (reportData.length === 0) {
        reportList.innerHTML = "<p>You have no reports submitted yet.</p>";
        return;
      }
  
      reportData.forEach((report, index) => {
        const card = document.createElement("div");
        card.classList.add("report-card");
  
        const title = document.createElement("div");
        title.classList.add("report-title");
        title.textContent = report.title;
  
        const details = document.createElement("div");
        details.classList.add("report-details");
        details.textContent = report.description;
  
        const status = document.createElement("span");
        status.classList.add("status-badge");
        if (report.status === "Pending") {
          status.classList.add("status-pending");
        } else if (report.status === "In Review") {
          status.classList.add("status-inreview");
        } else if (report.status === "Resolved") {
          status.classList.add("status-resolved");
        }
        status.textContent = report.status;
  
        // Buttons container
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("button-container");
  
        // Show Report button
        const btnShow = document.createElement("button");
        btnShow.textContent = "Show Report";
        btnShow.classList.add("btn-show-report");
        btnShow.onclick = () => {
          modalTitle.textContent = report.title;
          modalDateTime.textContent = report.dateTime || "Not provided";
          modalDescription.textContent = report.description;
          modalStatus.textContent = report.status;
          if (report.location) {
            modalLocation.textContent = `Lat: ${report.location.latitude.toFixed(4)}, Lon: ${report.location.longitude.toFixed(4)}`;
          } else {
            modalLocation.textContent = "Not provided";
          }
  
          // Clear previous media
          modalPhotos.innerHTML = "";
          modalVideos.innerHTML = "";
  
          // Add photos
          if (report.photos && report.photos.length > 0) {
            report.photos.forEach(src => {
              const img = document.createElement("img");
              img.src = src;
              img.alt = "Report Photo";
              modalPhotos.appendChild(img);
            });
          }
  
          // Add videos
          if (report.videos && report.videos.length > 0) {
            report.videos.forEach(src => {
              const video = document.createElement("video");
              video.src = src;
              video.controls = true;
              modalVideos.appendChild(video);
            });
          }
  
          modal.style.display = "block";
        };
  
        // Delete button
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.classList.add("btn-delete-report");
        btnDelete.onclick = () => {
          if (confirm(`Are you sure you want to delete the report:\n"${report.title}"?`)) {
            reportData.splice(index, 1);
            localStorage.setItem('myReports', JSON.stringify(reportData));
            renderReports();
          }
        };
  
        btnContainer.appendChild(btnShow);
        btnContainer.appendChild(btnDelete);
  
        card.appendChild(title);
        card.appendChild(details);
        card.appendChild(status);
        card.appendChild(btnContainer);
  
        reportList.appendChild(card);
      });
    }
  
    renderReports();
  });
  