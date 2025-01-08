export function logout() {
  const token = localStorage.getItem("Authorization");

  if (!token) {
    showAlert("No user is logged in!", "error");
    return;
  }

  fetch("https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        localStorage.removeItem("Authorization");
        showAlert("Logout successful!", "success");
        setTimeout(() => {
          window.location.href = "../index.html"; 
        }, 2000);
      } else {
        showAlert(data.message || "Logout failed. Please try again.", "error");
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
      showAlert("An error occurred during logout. Please try again.", "error");
    });
}

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-logout");
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