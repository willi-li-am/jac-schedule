import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("@vercel/analytics/react", () => ({ Analytics: () => null }), {
  virtual: true,
});

test("offers the planner from the home page", () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getByRole("link", { name: "Create" })).toHaveAttribute("href", "/create");
});
