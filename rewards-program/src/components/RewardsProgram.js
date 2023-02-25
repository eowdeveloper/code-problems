import { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/customerApis';
import './RewardsProgram.css';

function RewardsProgram() {
  const [transactions, setTransactions] = useState([]);
  const [groups, setGroups] = useState({});

  useEffect(() => {
    fetchTransactions().then(data => {
      setTransactions(data);
    });
  }, []);

  useEffect(() => {
    const groupTransactions = () => {
      const groups = {};

      for (const transaction of transactions) {
        const { customer, date, amount } = transaction;
        const month = date.slice(0, 7);

        if (!groups[customer]) {
          groups[customer] = {};
        }

        if (!groups[customer][month]) {
          groups[customer][month] = 0;
        }

        if (amount > 100) {
          groups[customer][month] += (amount - 100) * 2 + 100;
        } else if (amount > 50) {
          groups[customer][month] += amount - 50;
        }
      }

      setGroups(groups);
    };

    groupTransactions();
  }, [transactions]);

  const renderResults = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Month</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groups).map(customer => {
            return Object.keys(groups[customer]).map(month => {
              return (
                <tr key={`${customer}-${month}`}>
                  <td>{customer}</td>
                  <td>{month}</td>
                  <td>{groups[customer][month]}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="rewards-program">
      <h1>Reward Points Calculator</h1>
      {transactions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        renderResults()
      )}
    </div>
  );
}

export default RewardsProgram;
