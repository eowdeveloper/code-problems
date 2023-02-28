import { render, screen, within } from "@testing-library/react";
import { jest, test} from '@jest/globals';
import RewardsProgram from "./RewardsProgram";
import * as api from '../api/customerApis';

describe("RewardsProgram", () => {
  beforeEach(() => {
    jest.spyOn(api, 'fetchTransactions').mockResolvedValue([
      { customer: "Elaina Jillian", date: "2022-01-01", amount: 120 },
      { customer: "Elaina Jillian", date: "2022-01-15", amount: 50 },
      { customer: "Nathan Neil", date: "2022-01-05", amount: 80 },
      { customer: "Nathan Neil", date: "2022-01-20", amount: 120 },
    ]);
  });

  test("renders loading message while transactions are being fetched", async () => {
    render(<RewardsProgram />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await screen.findByText("Reward Points");
  });

  test("renders table with reward points after transactions are fetched", async () => {
    const transactions = [
      {
        customer: "Nathan Neil",
        date: "2022-01-01",
        amount: 120,
      },
      {
        customer: "Elaina Jillian",
        date: "2022-01-20",
        amount: 140,
      },
    ];
  
    jest.spyOn(api, "fetchTransactions").mockResolvedValue(transactions);
  
    render(<RewardsProgram />);
    await screen.findByText("Reward Points");
  
    const table = screen.getByRole("table");
    const rows = within(table).queryAllByRole("row");
  
    expect(rows[0]).toHaveTextContent("Customer");
    expect(rows[0]).toHaveTextContent("Month");
    expect(rows[0]).toHaveTextContent("Reward Points");
    expect(rows[1]).toHaveTextContent("Nathan Neil");
    expect(rows[1]).toHaveTextContent("2022-01");
    expect(rows[1]).toHaveTextContent("90");
    expect(rows[2]).toHaveTextContent("Elaina Jillian");
    expect(rows[2]).toHaveTextContent("2022-01");
    expect(rows[2]).toHaveTextContent("130");
  });
});
