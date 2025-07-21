document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value.toLowerCase();

        switch (role) {
            case 'citizen':
                window.location.href = "citizen/dashboard.html";
                break;
            case 'admin':
                window.location.href = "admin/dashboard.html";
                break;
            case 'police':
                window.location.href = "police/dashboard.html";
                break;
            case 'guest':
                window.location.href = "guest/dashboard.html";
                break;
            default:
                alert("Invalid role selected.");
                return;
        }

        document.getElementById("login-form").reset();
    });

    // Add/remove focus on inputs
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
});
