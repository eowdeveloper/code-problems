# Rewards Program

## Description

This is a rewards program that calculates reward points for customer transactions during a three-month period. The program fetches transaction data from a mock API and displays the total reward points earned by each customer per month.

## Installation

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install` in the project directory.

## Usage
1. Start the development server by running `npm start`.
2. Open `http://localhost:3000` to view the application in your browser.
3. The app has one endpoints:
    `GET /transactions` returns a list of all transactions during the three-month period.

```
const transactions = [
  {
    id: 1,
    name: "Adam",
    amount: 60,
    date: 1676095200000
  },

  {
    id: 2,
    name: "John",
    amount: 30,
    date: 1677477600000
  },
  {
    id: 3,
    name: "Adam",
    amount: 90,
    date: 1674799200000
  },
  {
    id: 4,
    name: "Joe",
    amount: 100,
    date: 1673762400000
  },
  {
    id: 5,
    name: "John",
    amount: 70,
    date: 1671062400000
  },
  {
    id: 6,
    name: "John",
    amount: 40,
    date: 1670457600000
  },
  {
    id: 7,
    name: "Adam",
    amount: 90,
    date: 1672272000000
  },
  {
    id: 8,
    name: "Joe",
    amount: 80,
    date: 1645509600000
  }
];
```
