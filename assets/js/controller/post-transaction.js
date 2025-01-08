import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOSTTransaction } from "../config/url-post.js";

function postDataWithAuth(url, data, callback) {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    showAlert("You are not logged in. Please log in again.", "error");
    setTimeout(() => {
      window.location.href = "../pages/signin.html"; 
    }, 2000);
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (typeof callback === "function") {
        callback(data); 
      }
      if (data.status === "success") {
        showAlert("Transaction submitted successfully!", "success");
        setTimeout(() => {
          window.location.reload(); 
        }, 2000);
      } else {
        const formattedMessage = formatTransactionMessage(data.message);
        showAlert(formattedMessage || "Failed to submit transaction. Please try again.", "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showAlert("An error occurred while submitting the transaction. Please try again.", "error");
    });
}

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function formatTransactionMessage(message) {
  const regex = /available (\d+\.\d+), required (\d+\.\d+)/;
  const match = message.match(regex);

  if (match) {
    const available = formatUSD(parseFloat(match[1]));
    const required = formatUSD(parseFloat(match[2]));
    return `Insufficient funds: available ${available}, required ${required}`;
  }

  return message; 
}

function pushData(event) {
  event.preventDefault();

  let amount = parseFloat(getValue("transactionAmount"));
  let category = getValue("transactionCategory");
  let description = getValue("transactionDescription");

  if (isNaN(amount)) {
    showAlert("Please enter a valid amount.", "error");
    return;
  }

  if (!category) {
    showAlert("Please provide a valid category.", "error");
    return;
  }

  if (!description) {
    showAlert("Please provide a valid description.", "error");
    return;
  }

  let data = {
    amount: amount,
    category: category,
    description: description,
  };

  console.log("Data to send:", data);

  postDataWithAuth(urlPOSTTransaction, data);
}

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-transaction");
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

onClick("button-transaction", pushData);