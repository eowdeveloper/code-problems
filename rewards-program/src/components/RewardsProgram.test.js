import { render, screen, within } from "@testing-library/react";
import { jest, test } from '@jest/globals';
import RewardsProgram from "./RewardsProgram";
import * as api from '../api/customerApis';

describe("RewardsProgram", () => {
  const transactions = [
    { id: 1, name: "Adam", amount: 120 , date: 1673249112 },
    { id: 2, name: "Adam", amount: 50 , date: 1675668312 },
    { id: 3, name: "Joe", amount: 80, date: 1674199512},
    { id: 4, name: "Adam", amount: 60 , date: 1678688712 },
    { id: 5, name: "Joe", amount: 130, date: 1676273112 },
    { id: 6, name: "Joe", amount: 70 , date: 1679984712 },
  ];

  // uses spyOn to mock the 'fetchTransactions' method of the api object and resolve it with an array of transaction data.
  beforeEach(() => {
    jest.spyOn(api, 'fetchTransactions').mockResolvedValue(transactions);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders loading message while transactions are being fetched", async () => {
    render(<RewardsProgram />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await screen.findByText("Reward Points");
  });

  test("renders table with reward points after transactions are fetched", async () => {  
    render(<RewardsProgram />);
    await screen.findByText("Reward Points");
  
    const table = screen.getByRole("table");
    const rows = within(table).queryAllByRole("row");
  
    expect(rows[0]).toHaveTextContent("Name");
    expect(rows[0]).toHaveTextContent("January");
    expect(rows[0]).toHaveTextContent("February");
    expect(rows[0]).toHaveTextContent("March");
    expect(rows[0]).toHaveTextContent("Total Points");
    expect(rows[1]).toHaveTextContent("Adam");
    expect(rows[1]).toHaveTextContent("120");
    expect(rows[1]).toHaveTextContent("50");
    expect(rows[1]).toHaveTextContent("60");
    expect(rows[1]).toHaveTextContent("100");
    expect(rows[2]).toHaveTextContent("Joe");
    expect(rows[2]).toHaveTextContent("80");
    expect(rows[2]).toHaveTextContent("130");
    expect(rows[2]).toHaveTextContent("70");
    expect(rows[2]).toHaveTextContent("190");
  });
});
