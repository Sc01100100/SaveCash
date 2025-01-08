import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOSTTransaction, AmbilResponse2 } from "../config/url-post.js";

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

    let amount = parseFloat(getValue("transactionAmount")); 
    let category = getValue("transactionCategory"); 
    let description = getValue("transactionDescription"); 

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    if (!category) {
        alert("Please provide a valid category.");
        return;
    }

    if (!description) {
        alert("Please provide a valid description.");
        return;
    }

    let data = {
        amount: amount,
        category: category,
        description: description,
    };

    console.log("Data to send:", data);

    postDataWithAuth(urlPOSTTransaction, data, AmbilResponse2); 
}

onClick("button-transaction", pushData);