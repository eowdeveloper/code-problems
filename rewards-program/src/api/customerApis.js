
export const fetchTransactions = async () => {
  try {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
