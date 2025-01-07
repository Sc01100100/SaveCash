document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.getElementById("userName");

    const token = localStorage.getItem("Authorization");
  
    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      window.location.href = "../pages/signin.html";
      return;
    }
  
    fetch("https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/user/info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("Authorization");
            window.location.href = "../pages/signin.html";
            return;
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.status === "success") {
            userNameElement.textContent = data.data.name;
          } else {
            alert(data.message || "Failed to fetch user data. Please log in again.");
            localStorage.removeItem("Authorization");
            window.location.href = "../pages/signin.html";
          }
        })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("An error occurred. Please try again later.");
      });
  });