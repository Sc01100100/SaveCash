document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !password) {
      showAlert("All fields are required.", "error");
      return;
    }

    try {
      const response = await fetch("https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert("Registration successful! You can now log in.", "success");
        setTimeout(() => {
          window.location.href = "../pages/signin.html";
        }, 2000);
      } else {
        showAlert(data.message || "Registration failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("An error occurred. Please try again later.", "error");
    }
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