import { useState, useEffect } from "react";
import { fetchTransactions } from "../api/customerApis";
import "./RewardsProgram.css";

export default function RewardsProgram() {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      });
  }, []); // run on the first render

  useEffect(() => {
    const calculateRewards = (transactions) => {
      const rewards = [];

      transactions.forEach((transaction) => {
        const { customer, date, amount } = transaction;
        const month = date.slice(0, 7);
        let rewardPoints = 0;

        if (amount > 100) {
          rewardPoints += (amount - 100) * 2 + 50;
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
      <table role="table">
        <thead>
          <tr role="row">
            <th role="columnheader" scope="col">Customer</th>
            <th role="columnheader" scope="col">Month</th>
            <th role="columnheader" scope="col">Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward, index) => {
            return (
              <tr key={index} role="row">
                <td role="cell">{reward.customer}</td>
                <td role="cell">{reward.month}</td>
                <td role="cell">{reward.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Reward Points</h1>
      {transactions.length === 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        renderResults()
      )}
    </div>
  );
}
