import { logout } from "./controller/logout.js";

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
   
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault(); 
      logout();
    });
  });