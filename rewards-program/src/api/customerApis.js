const apiUrl = "http://localhost:3000";

export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${apiUrl}/transactions`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}