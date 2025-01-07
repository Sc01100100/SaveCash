import { urlGETIncome } from "./config/url.js";
import { tbIncome } from "./controller/get-income.js";

function fetchData(url, callback) {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html"; 
        return;
    }

    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })
    .then(response => {
        console.log("API response status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Data received from API:", data); 
        callback(data); 
    })
    .catch(error => console.error("Error:", error));
}

fetchData(urlGETIncome, tbIncome);