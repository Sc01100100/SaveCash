import { TableIncome } from "../temp/table-income.js";

export function tbIncome(response) {
    console.log("Filling table with values:", response); 

    const values = response.incomes || []; 
    console.log("Incomes data:", values);

    if (Array.isArray(values)) {
        let content = values.map(value => {
            const formatDate = value.created_at ? value.created_at.substring(0, 10) : "No Date";

            const formattedAmount = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value.amount);

            return TableIncome
                .replace("#SOURCE#", value.source || "No Source")
                .replace("#AMOUNT#", `+ ${formattedAmount}`) 
                .replace("#DATE#", formatDate);
        }).reverse().join("");

        console.log("Generated content:", content);

        document.getElementById("fillincome").innerHTML = content;
        console.log("Content added to fillincome."); 
    } else {
        console.error("Invalid data format: expected an array");
    }
}   