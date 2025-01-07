export function logout() {
  const token = localStorage.getItem("Authorization");

  if (!token) {
    alert("No user is logged in!");
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
        alert("Logout successful!");
        window.location.href = "../index.html"; 
      } else {
        alert(data.message || "Logout failed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("An error occurred during logout. Please try again.");
    });
}
