// Toggle sidebar
document.getElementById("moreOptions").addEventListener("click", function () {
  document.getElementById("sideNav").classList.toggle("active");
});

// Close sidebar on back
document.querySelector(".back-btn").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("sideNav").classList.remove("active");
});
// Sidebar toggle (same as your dashboard.js)
document.getElementById("moreOptions").addEventListener("click", () => {
  document.getElementById("sideNav").classList.toggle("active");
});
document.querySelector(".back-btn").addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("sideNav").classList.remove("active");
});
