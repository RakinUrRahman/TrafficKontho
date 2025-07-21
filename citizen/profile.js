document.getElementById("moreOptions").addEventListener("click", function () {
    document.getElementById("sideNav").classList.toggle("active");
  });

document.getElementById("moreOptions").addEventListener("click", function () {
    document.getElementById("sideNav").classList.toggle("active");
  });
  
  document.querySelector(".back-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("sideNav").classList.remove("active");
  });
  
  document.querySelector(".edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Profile updated successfully!");
  });
  document.querySelector(".edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get input values
    const newName = document.getElementById("inputName").value.trim();
    const newEmail = document.getElementById("inputEmail").value.trim();
    const newPhone = document.getElementById("inputPhone").value.trim();
  
    // Update profile display only if not empty
    if(newName) document.getElementById("profileName").textContent = newName;
    if(newEmail) document.getElementById("profileEmail").textContent = newEmail;
    if(newPhone) document.getElementById("profilePhone").textContent = newPhone;
  
    alert("Profile updated successfully!");
  
    // Optionally clear input fields after update
    // e.target.reset();
  });
  