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
    `GET /transactions` returns a list of all transactions during the 3 month period.

```
{
  "transactions": [
    {
      "customer": "Elaina Jillian",
      "date": "2022-01-05",
      "amount": 120
    },
    {
      "customer": "Nathan Neil",
      "date": "2022-01-10",
      "amount": 60
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-01-12",
      "amount": 100
    },
    {
      "customer": "Nathan Neil",
      "date": "2022-01-13",
      "amount": 200
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-01-15",
      "amount": 80
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-02-01",
      "amount": 110
    },
    {
      "customer": "Nathan Neil",
      "date": "2022-02-03",
      "amount": 150
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-02-05",
      "amount": 120
    },
    {
      "customer": "Nathan Neil",
      "date": "2022-02-09",
      "amount": 50
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-02-10",
      "amount": 75
    },
    {
      "customer": "Nathan Neil",
      "date": "2022-02-15",
      "amount": 40
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-03-01",
      "amount": 90
    },
    {
      "customer": "Nathan Neil",
      "date": "2022-03-10",
      "amount": 60
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-03-15",
      "amount": 100
    },
    {
      "customer": "Elaina Jillian",
      "date": "2022-03-17",
      "amount": 120
    },
    {
      "customer": "Nathan Neil",
      "date": "2022-03-21",
      "amount": 50
    }
  ]
}
```