export let urlPOSTIncome = "https://nww-sc-8ae1c886f79f.herokuapp.com/savecash/incomes"

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
