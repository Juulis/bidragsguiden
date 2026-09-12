import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /BidragsGuiden/i })
    ).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Sök bidrag/i)).toBeInTheDocument();
  });

  it("renders bidrag cards", () => {
    render(<Home />);
    expect(screen.getByText(/Barnbidrag/i)).toBeInTheDocument();
    expect(screen.getByText(/Bostadsbidrag/i)).toBeInTheDocument();
  });

  it("expands barnbidrag details", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const buttons = screen.getAllByRole("button", { name: /Visa detaljer/i });
    await user.click(buttons[0]);

    expect(screen.getByText(/Flerbarnstillägg/i)).toBeInTheDocument();
    expect(screen.getByText(/Växelvis boende/i)).toBeInTheDocument();
  });
});