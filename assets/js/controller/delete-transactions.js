const transactionAPI = "https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/transactions";
const incomeAPI = "https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/incomes";

export function deleteTransaction(transactionId) {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html";
        return;
    }

    if (confirm("Are you sure you want to delete this transaction?")) {
        fetch(`${transactionAPI}/${transactionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete transaction.");
            }
            alert("Transaction deleted successfully.");
            location.reload();
        })
        .catch(error => {
            console.error("Error deleting transaction:", error);
            alert("Failed to delete transaction. Please try again.");
        });
    }
}

export function deleteIncome(incomeId) {
    const token = localStorage.getItem("Authorization");
    if (!token) {
        alert("You are not logged in. Please log in again.");
        window.location.href = "../pages/signin.html";
        return;
    }

    if (confirm("Are you sure you want to delete this income?")) {
        fetch(`${incomeAPI}/${incomeId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete income.");
            }
            alert("Income deleted successfully.");
            location.reload();
        })
        .catch(error => {
            console.error("Error deleting income:", error);
            alert("Failed to delete income. Please try again.");
        });
    }
}