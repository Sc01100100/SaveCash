export function openIncomePopup(incomeId) {
    const popup = document.getElementById("popup-income");
    if (!popup) {
        console.error("Popup element not found in DOM.");
        return;
    }
    popup.classList.remove("hidden");

    const token = localStorage.getItem("Authorization");

    fetch(`https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/incomes/${incomeId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch income data.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const income = data.income;
            if (income) {
                document.getElementById("amount").value = income.amount || '';
                document.getElementById("source").value = income.source || '';
                popup.setAttribute("data-income-id", income.id);
            } else {
                console.error("Income not found in response data.");
            }
        })
        .catch(err => console.error("Error fetching income data:", err));
}

export function closeIncomePopup() {
    const popup = document.getElementById("popup-income");
    popup.classList.add("hidden");
    document.getElementById("amount").value = '';
    document.getElementById("source").value = '';
}

export function submitIncome() {
    const popup = document.getElementById("popup-income");
    const incomeId = popup.getAttribute("data-income-id");
    const amount = document.getElementById("amount").value;
    const source = document.getElementById("source").value;

    if (!incomeId || !amount || !source) {
        alert("Please fill in all fields.");
        return;
    }

    const updatedData = {
        amount: parseFloat(amount),
        source,
    };

    const token = localStorage.getItem("Authorization");

    fetch(`https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/incomes/${incomeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    if (errData.message) {
                        alert(errData.message);
                    } else {
                        alert("Failed to update income.");
                    }
                    throw new Error("Failed to update income.");
                });
            }
            return response.json();
        })
        .then(() => {
            alert("Income updated successfully.");
            closeIncomePopup();
            window.location.reload();
        })
        .catch(err => console.error("Error updating income:", err));
}