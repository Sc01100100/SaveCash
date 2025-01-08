import { urlGETTransaction, urlGETIncome } from "./config/url.js";
import { TableTransaction } from "../js/temp/table-transaction.js";
import { TableIncome } from "../js/temp/table-income.js";

let combinedData = [];

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

        renderCombinedData(combinedData);
    })
    .catch(error => console.error("Error:", error));
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

function updateSummaryUI(totalIncome, totalExpense) {
    document.getElementById("incomeTotal").textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById("expenseTotal").textContent = `$${totalExpense.toFixed(2)}`;
}

document.getElementById("filterButton").addEventListener("click", () => {
    const selectedMonth = document.getElementById("month").value; 
    if (!selectedMonth) {
        alert("Please select a month to filter.");
        return;
    }

    const filteredData = combinedData.filter(item => {
        const itemMonth = new Date(item.created_at).toISOString().slice(0, 7); 
        return itemMonth === selectedMonth;
    });

    const filteredIncome = filteredData.filter(item => item.type === "income");
    const filteredExpense = filteredData.filter(item => item.type === "transaction");

    const totalIncome = filteredIncome.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = filteredExpense.reduce((sum, expense) => sum + expense.amount, 0);

    updateSummaryUI(totalIncome, totalExpense);
    renderCombinedData(filteredData);
});

fetchCombinedData();