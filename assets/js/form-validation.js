const incomeAmountInput = document.getElementById("amount");

incomeAmountInput.addEventListener("keydown", (event) => {
  if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "."
  ) {
    event.preventDefault();
  }
});

const amountInput = document.getElementById("transactionAmount");

amountInput.addEventListener("keydown", (event) => {
  if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "."
  ) {
    event.preventDefault();
  }
});
