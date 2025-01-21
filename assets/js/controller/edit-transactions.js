export function openTransactionsPopup(transactionId) {
    const popup = document.getElementById("popup-transactions");
    if (!popup) {
        console.error("Popup element not found in DOM.");
        return;
    }
    popup.classList.remove("hidden");

    const token = localStorage.getItem("Authorization");

    fetch(`https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/transactions/${transactionId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch transaction data.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            const transaction = data.transaction; 
            console.log(transaction); 
            if (transaction) {
                document.getElementById("amount-transaction").value = transaction.amount || ''; 
                document.getElementById("category").value = transaction.category || '';
                document.getElementById("description").value = transaction.description || ''; 
                popup.setAttribute("data-transaction-id", transaction.id); 
            } else {
                console.error("Transaction not found in response data.");
            }
        })
        .catch(err => console.error("Error fetching transaction data:", err));
}

export function submitTransactions() {
    const popup = document.getElementById("popup-transactions");
    const transactionId = popup.getAttribute("data-transaction-id");
    const amount = document.getElementById("amount-transaction").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    if (!transactionId || !amount || !category || !description) {
        alert("Please fill in all fields.");
        return;
    }

    const updatedData = {
        amount: parseFloat(amount),
        category,
        description,
    };

    const token = localStorage.getItem("Authorization"); 

    fetch(`https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/transactions/${transactionId}`, {
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
                if (errData.message && errData.message.includes("insufficient funds")) {
                    const match = errData.message.match(/available ([0-9.]+), required ([0-9.]+)/);
                    if (match) {
                        const available = parseFloat(match[1]);
                        const required = parseFloat(match[2]);

                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        });

                        alert(`Insufficient funds: Available ${formatter.format(available)}, required ${formatter.format(required)}`);
                    } else {
                        alert("Insufficient funds, but unable to parse amounts.");
                    }
                } else if (errData.message) {
                    alert(errData.message); 
                } else {
                    alert("Failed to update transaction."); 
                }
                throw new Error("Failed to update transaction.");
            });
        }
        return response.json();
    })
    .then(() => {
        alert("Transaction updated successfully.");
        closeTransactionsPopup();
        window.location.reload();
    })
    .catch(err => console.error("Error updating transaction:", err));
}

export function closeTransactionsPopup() {
    const popup = document.getElementById("popup-transactions");
    popup.classList.add("hidden");
    document.getElementById("amount-transaction").value = ''; 
    document.getElementById("category").value = '';
    document.getElementById("description").value = '';
}