export let urlPOSTIncome = "https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/incomes"
export let urlPOSTTransaction = "https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/transactions"

export function AmbilResponse(result) {
    console.log(result); 

    if (result && result.status === 'success') {
        alert("Income data saved successfully!");
    } 
    else if (result && result.status === 'error') {
        alert(`Error: ${result.message || 'Something went wrong. Please try again.'}`);
    }
    else {
        alert("An unexpected error occurred. Please try again.");
    }

    window.location.reload(); 
}

export function AmbilResponse2(result) {
    console.log(result); 

    if (result && result.status === 'success') {
        alert("Transactions data saved successfully!");
    } 
    else if (result && result.status === 'error') {
        if (result.message && result.message.includes("insufficient funds")) {
            const regex = /available (\d+\.\d{2}), required (\d+\.\d{2})/;
            const match = result.message.match(regex);
            if (match) {
                const available = parseFloat(match[1]);
                const required = parseFloat(match[2]);
                
                const formattedAvailable = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(available);

                const formattedRequired = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(required);

                alert(`Error: Insufficient funds: available ${formattedAvailable}, required ${formattedRequired}`);
            } else {
                alert(`Error: ${result.message || 'Something went wrong. Please try again.'}`);
            }
        } else {
            alert(`Error: ${result.message || 'Something went wrong. Please try again.'}`);
        }
    }
    else {
        alert("An unexpected error occurred. Please try again.");
    }

    window.location.reload(); 
}

