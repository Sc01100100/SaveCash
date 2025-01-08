document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        localStorage.setItem("Authorization", data.data.token);
        showAlert("Login successful!", "success");
        setTimeout(() => {
          window.location.href = "../pages/home.html";
        }, 2000);
      } else {
        showAlert(data.message, "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showAlert("An error occurred while logging in.", "error");
    });
});

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-container");
  const alert = document.createElement("div");

  alert.className = `
    px-4 py-3 rounded-md shadow-lg
    ${
      type === "success"
        ? "bg-green-100 text-green-700 border border-green-400"
        : "bg-red-100 text-red-700 border border-red-400"
    }
  `;
  alert.textContent = message;

  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}