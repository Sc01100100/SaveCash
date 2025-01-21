import { urlGETTransaction, urlGETIncome } from "./config/url.js";
import { TableTransaction } from "../js/temp/table-transaction.js";
import { TableIncome } from "../js/temp/table-income.js";
import { deleteTransaction, deleteIncome } from '../js/controller/delete-transactions.js';
import { openIncomePopup, closeIncomePopup, submitIncome } from '../js/controller/edit-income.js';
import { openTransactionsPopup, closeTransactionsPopup, submitTransactions } from '../js/controller/edit-transactions.js';

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

        let rowContent = '';

        if (item.type === "transaction") {
            rowContent = TableTransaction
                .replace("#CATEGORY#", item.category || "No Category")
                .replace("#DESC#", item.description || "No Description")
                .replace("#AMOUNT#", `- ${formattedAmount}`)
                .replace("#DATE#", formatDate)
                .replace("#TRANSACTION_EDIT_ID#", item.id)
                .replace("#TRANSACTION_ID#", item.id);
        } else {
            rowContent = TableIncome
                .replace("#SOURCE#", item.source || "No Source")
                .replace("#AMOUNT#", `+ ${formattedAmount}`)
                .replace("#DATE#", formatDate)
                .replace("#INCOME_EDIT_ID#", item.id)
                .replace("#INCOME_ID#", item.id);
        }

        return rowContent;
    }).join("");


    document.getElementById("filltransaction").innerHTML = content;

    document.querySelectorAll('.delete-transaction-button').forEach(button => {
        button.addEventListener('click', function () {
            const transactionId = this.getAttribute('data-transaction-id');
            deleteTransaction(transactionId);
        });
    });

    document.querySelectorAll('.edit-transaction-button').forEach(button => {
        button.addEventListener('click', function () {
            const transactionId = this.getAttribute('data-edit-transaction-id');
            openTransactionsPopup(transactionId);
        });
    });

     document.querySelectorAll('.edit-income-button').forEach(button => {
        button.addEventListener('click', function () {
            const incomeId = this.getAttribute('data-edit-income-id');
            openIncomePopup(incomeId);
        });
    });

    document.querySelectorAll('.delete-income-button').forEach(button => {
        button.addEventListener('click', function () {
            const incomeId = this.getAttribute('data-income-id');
            deleteIncome(incomeId);
        });
    });
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
window.closeIncomePopup = closeIncomePopup;
window.submitIncome = submitIncome;
window.closeTransactionsPopup = closeTransactionsPopup;
window.submitTransactions = submitTransactions;