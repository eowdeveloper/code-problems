import { render, screen, within } from "@testing-library/react";
import { jest, test } from '@jest/globals';
import RewardsProgram from "./RewardsProgram";
import * as api from '../api/customerApis';

describe("RewardsProgram", () => {
  const transactions = [
    { customer: "Elaina Jillian", date: "2022-01-01", amount: 120 },
    { customer: "Elaina Jillian", date: "2022-01-15", amount: 50 },
    { customer: "Nathan Neil", date: "2022-01-05", amount: 80 },
    { customer: "Nathan Neil", date: "2022-01-20", amount: 120 },
  ];

  // uses spyOn to mock the 'fetchTransactions' method of the api object and resolve it with an array of transaction data.
  beforeEach(() => {
    jest.spyOn(api, 'fetchTransactions').mockResolvedValue(transactions);
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
  
    expect(rows[0]).toHaveTextContent("Customer");
    expect(rows[0]).toHaveTextContent("Month");
    expect(rows[0]).toHaveTextContent("Reward Points");
    expect(rows[1]).toHaveTextContent("Elaina Jillian");
    expect(rows[1]).toHaveTextContent("2022-01");
    expect(rows[1]).toHaveTextContent("90");
    expect(rows[2]).toHaveTextContent("Nathan Neil");
    expect(rows[2]).toHaveTextContent("2022-01");
    expect(rows[2]).toHaveTextContent("120");
  });
});
