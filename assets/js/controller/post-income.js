import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOSTIncome, AmbilResponse } from "../config/url-post.js";

function postDataWithAuth(url, data, callback) {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html"; 
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(callback) 
    .catch(error => console.error("Error:", error)); 
}

function pushData(event) {
    event.preventDefault(); 

    let amount = parseFloat(getValue("amount"));
    let source = getValue("source");

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    if (!source) {
        alert("Please provide a valid source.");
        return;
    }

    let data = {
        amount: amount,
        source: source,
    };

    console.log("Data to send:", data);

    postDataWithAuth(urlPOSTIncome, data, AmbilResponse); 
}

onClick("button-income", pushData);
