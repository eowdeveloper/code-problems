import { useState, useEffect } from "react";
import { fetchTransactions } from "../api/customerApis";
import "./RewardsProgram.css";

function RewardsProgram() {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
    }).catch((error) => {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    });
  }, []);

  useEffect(() => {
    const calculateRewards = (transactions) => {
      const rewards = [];

      transactions.forEach((transaction) => {
        const { customer, date, amount } = transaction;
        const month = date.slice(0, 7);
        let rewardPoints = 0;

        if (amount > 100) {
          rewardPoints += (amount - 100) * 2 + 100;
        } else if (amount > 50) {
          rewardPoints += amount - 50;
        }

        const existingReward = rewards.find(
          (reward) => reward.customer === customer && reward.month === month
        );

        if (existingReward) {
          existingReward.points += rewardPoints;
        } else {
          rewards.push({ customer, month, points: rewardPoints });
        }
      });

      setRewards(rewards);
    };

    calculateRewards(transactions);
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
          {rewards.map((reward, index) => {
            return (
              <tr key={index}>
                <td>{reward.customer}</td>
                <td>{reward.month}</td>
                <td>{reward.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Reward Points Calculator</h1>
      {transactions.length === 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        renderResults()
      )}
    </div>
  );
}

export default RewardsProgram;