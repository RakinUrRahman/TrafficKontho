// Toggle sidebar popup on dot-button click
document.getElementById("moreOptions").addEventListener("click", function () {
    document.getElementById("sideNav").classList.toggle("active");
  });
  
  // Close sidebar on Back button click
  document.querySelector(".back-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("sideNav").classList.remove("active");
  });
  