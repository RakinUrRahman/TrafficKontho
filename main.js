// Handling the form submission to check the role and redirect
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    // Get the input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value.toLowerCase(); // Role input

    // Role-based redirection
    switch (role) {
        case 'citizen':
            window.location.href = "/citizens-dashboard.html"; // Redirect to Citizen Dashboard
            break;
        case 'admin':
            window.location.href = "/admin-dashboard.html"; // Redirect to Admin Dashboard
            break;
        case 'police':
            window.location.href = "/police-dashboard.html"; // Redirect to Police Dashboard
            break;
        case 'guest':
            window.location.href = "/guest-dashboard.html"; // Redirect to Guest Dashboard
            break;
        default:
            alert("Invalid role. Please select a valid role (Citizen, Admin, Police, Guest).");
            return;  // Stop the function if the role is invalid
    }

    // Clear the input fields after redirection
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("role").value = "";

    // Optional: Reset the entire form if needed
    // document.getElementById("login-form").reset(); 
});

// Focus and Blur event listeners for the form inputs
const inputs = document.querySelectorAll(".form__input");

function addfocus() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remfocus() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addfocus);
    input.addEventListener("blur", remfocus);
});
