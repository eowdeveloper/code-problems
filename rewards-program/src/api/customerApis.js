const apiUrl = 'http://localhost:3000';

export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${apiUrl}/transactions`);
    const data = await response.json();
    return data.transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};
