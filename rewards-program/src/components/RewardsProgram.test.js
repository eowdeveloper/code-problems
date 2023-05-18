import { render, screen } from "@testing-library/react";
import RewardsProgram, {calculateRewards, sortingMonth} from "./RewardsProgram";
import * as api from "../api/customerApis";

describe("RewardsProgram", () => {
  const transactions = [
    { id: 1, name: "Adam", amount: 120, date: 1673249112 },
    { id: 2, name: "Adam", amount: 50, date: 1675668312 },
    { id: 3, name: "Joe", amount: 80, date: 1674199512 },
    { id: 4, name: "Adam", amount: 60, date: 1678688712 },
    { id: 5, name: "Joe", amount: 130, date: 1676273112 },
    { id: 6, name: "Joe", amount: 70, date: 1679984712 },
  ];

  beforeEach(() => {
    jest.spyOn(api, "fetchTransactions").mockResolvedValue(transactions);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders table with reward points after transactions are fetched", async () => {
    render(<RewardsProgram />);
    await screen.findByText("Reward Points");

    const table = screen.getByRole("table");

    expect(table).toMatchSnapshot();
  });

  test("calculateRewards returns correct rewards for transactions", () => {
    const rewards = calculateRewards(transactions);
    expect(rewards).toMatchSnapshot();
  });

  test("sortingMonth returns correct months array for transactions", () => {
    const monthArr = sortingMonth(transactions);
    expect(monthArr).toMatchSnapshot();
  });
});

