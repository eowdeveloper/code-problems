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


export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve(transactions), Math.random() * 1000);
  });
};
