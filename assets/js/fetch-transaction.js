import { urlGETTransaction, urlGETIncome } from "./config/url.js";
import { TableTransaction } from "../js/temp/table-transaction.js";
import { TableIncome } from "../js/temp/table-income.js";

let combinedData = [];
let currentPage = 1;
const itemsPerPage = 7;
let totalPages = 0; 

function fetchCombinedData() {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html"; 
        return;
    }

    Promise.all([
        fetch(urlGETTransaction, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }).then(res => res.json()),
        fetch(urlGETIncome, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }).then(res => res.json())
    ])
    .then(([transactionData, incomeData]) => {
        const transactions = transactionData.transactions || [];
        const incomes = incomeData.incomes || [];
        
        combinedData = [
            ...transactions.map(t => ({ ...t, type: "transaction" })),
            ...incomes.map(i => ({ ...i, type: "income" })),
        ];

        combinedData.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
        );

        totalPages = Math.ceil(combinedData.length / itemsPerPage); 
        renderPage();
    })
    .catch(error => console.error("Error:", error));
}

function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = combinedData.slice(start, end);

    renderCombinedData(pageData);
    updatePaginationInfo();
}

function renderCombinedData(data) {
    const content = data.map(item => {
        const formatDate = item.created_at ? 
            new Date(item.created_at).toLocaleDateString('en-GB') : "No Date";

        const formattedAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(item.amount);

        if (item.type === "transaction") {
            return TableTransaction
                .replace("#CATEGORY#", item.category || "No Category")
                .replace("#DESC#", item.description || "No Description")
                .replace("#AMOUNT#", `- ${formattedAmount}`)
                .replace("#DATE#", formatDate);
        } else {
            return TableIncome
                .replace("#SOURCE#", item.source || "No Source")
                .replace("#AMOUNT#", `+ ${formattedAmount}`)
                .replace("#DATE#", formatDate);
        }
    }).join("");

    document.getElementById("filltransaction").innerHTML = content;
}

function updatePaginationInfo() {
    const totalItems = combinedData.length;
    totalPages = Math.ceil(totalItems / itemsPerPage); 

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const paginationInfo = document.getElementById("pagination-info");
    paginationInfo.innerHTML = `Showing <span class="font-semibold text-gray-900 dark:text-white">${startItem}</span> to 
        <span class="font-semibold text-gray-900 dark:text-white">${endItem}</span> of 
        <span class="font-semibold text-gray-900 dark:text-white">${totalItems}</span> Entries`;

    document.getElementById("prev-button").disabled = currentPage <= 1;
    document.getElementById("next-button").disabled = currentPage >= totalPages;
}

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

document.getElementById("next-button").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
});

fetchCombinedData();
