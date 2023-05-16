import { useState, useEffect } from "react";
import { fetchTransactions } from "../api/customerApis";
import "./RewardsProgram.css";

// pure function for customer's rewards information
const calculateRewards = (transactions) => {
  const rewards = [];

  transactions.forEach((transaction) => {
    const { name, amount, date } = transaction;
    let month = new Date(date).toLocaleString("en", {month: "long"});
    let rewardPoints = 0;

    // calculate the reward points for EACH transaction
    if (amount > 100) {
      rewardPoints += (amount - 100) * 2 + 50;
    } else if (amount > 50 && amount <= 100) {
      rewardPoints += amount - 50;
    }

    // if the customer exist in the system
    const existingCustomer = name in rewards;

    if (existingCustomer) {
      // add rewards the existing month or create a new month to add rewards
      rewards[name].months[month] = (rewards[name].months[month] || 0) + rewardPoints;
      rewards[name].totalRewards += rewardPoints;
    } else {
      rewards[name] = {months:{[month]: rewardPoints}, totalRewards: rewardPoints };
    }
  });
  return rewards;
};

// pure function for sorting month's array
const sortingMonth = (transactions) => {
  const objMonth = {};
    transactions.forEach((transaction) => {
      const epoch = new Date(transaction.date).getTime();
      const month = new Date(transaction.date).toLocaleString("en", {month: "long"});

      if (!(month in objMonth)) {
        objMonth[month] = epoch;
      }
    });
    
    const sortedObjMonth = Object.entries(objMonth)
      .sort((a, b) => a[1] - b[1])
      .map((item) => item[0]);

    return sortedObjMonth;
};


export default function RewardsProgram() {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [monthsArr, setMonthsArr] = useState([]);

  // run on the first render, setting data
  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      });
  }, []); 

  // setting the three-month period in an Array called MonthsArr 
  // setting EACH customer and their rewards points in an object form in an Array called rewards
  useEffect(() => {
    setMonthsArr(sortingMonth(transactions));
    setRewards(calculateRewards(transactions));
  }, [transactions]);

  const renderResults = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {monthsArr.map((month, id) => <th key={id}>{month}</th>)}
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rewards).map(([customerName, { months, totalRewards }], id) => (
            <tr key={id}>
              <td>{customerName}</td>
              {monthsArr.map((month, id) => (
                <td key={id}>{months[month] ? months[month] : 0}</td>
              ))}
              <td>{totalRewards}</td>
            </tr>
          ))}
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
