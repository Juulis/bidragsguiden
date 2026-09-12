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
  });

  it("shows full barnbidrag content on the page", () => {
    render(<Home />);
    expect(screen.getByText(/Flerbarnstillägg/i)).toBeInTheDocument();
    expect(screen.getByText(/Växelvis boende/i)).toBeInTheDocument();
  });

  it("shows official link as reference", () => {
    render(<Home />);
    expect(screen.getAllByText(/officiell information/i).length).toBeGreaterThan(0);
  });

  it("filters by situation", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const jaButtons = screen.getAllByRole("button", { name: /^Ja$/i });
    await user.click(jaButtons[0]);
    expect(screen.getByText(/anpassade efter din situation/i)).toBeInTheDocument();
  });
});