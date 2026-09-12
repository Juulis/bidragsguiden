import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /BidragsGuiden/i })).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Home />);
    expect(
      screen.getByText(/Hitta alla offentliga bidrag/i)
    ).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Sök bidrag/i)).toBeInTheDocument();
  });

  it("renders bidrag cards", () => {
    render(<Home />);
    expect(screen.getByText(/Bostadsbidrag/i)).toBeInTheDocument();
    expect(screen.getByText(/Barnbidrag/i)).toBeInTheDocument();
  });
});