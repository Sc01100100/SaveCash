const urlGETTransaction = "https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/transactions";
const urlGETIncome = "https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/incomes";

function fetchAndCalculateSummary() {
    const token = localStorage.getItem("Authorization");

    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html";
        return;
    }

    // Fetch transactions and incomes in parallel
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
        // Extract transactions and incomes
        const transactions = transactionData.transactions || [];
        const incomes = incomeData.incomes || [];

        // Calculate totals
        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Update the UI
        updateSummaryUI(totalIncome, totalExpense);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please try again.");
    });
}

function updateSummaryUI(totalIncome, totalExpense) {
    document.getElementById("incomeTotal").textContent = 
        `$${totalIncome.toFixed(2)}`;
    document.getElementById("expenseTotal").textContent = 
        `$${totalExpense.toFixed(2)}`;
}

// Call the function to fetch and calculate
fetchAndCalculateSummary();
