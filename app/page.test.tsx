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

  it("renders situation questions", () => {
    render(<Home />);
    expect(screen.getByText(/Har du barn under 16/i)).toBeInTheDocument();
    expect(screen.getByText(/Studerar du/i)).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Sök bidrag/i)).toBeInTheDocument();
  });

  it("renders bidrag cards", () => {
    render(<Home />);
    expect(screen.getByText(/Barnbidrag/i)).toBeInTheDocument();
  });

  it("filters by situation when answering Ja to children", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const jaButtons = screen.getAllByRole("button", { name: /^Ja$/i });
    await user.click(jaButtons[0]); // hasChildren

    expect(screen.getByText(/anpassade efter din situation/i)).toBeInTheDocument();
    expect(screen.getByText(/Barnbidrag/i)).toBeInTheDocument();
  });
});