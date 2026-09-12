import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { BarnbidragKalkyl } from "./Calculators";

describe("BarnbidragKalkyl", () => {
  it("shows total for 1 child", () => {
    render(<BarnbidragKalkyl />);
    expect(screen.getByText("1250 kr")).toBeInTheDocument();
  });

  it("updates when selecting more children", async () => {
    const user = userEvent.setup();
    render(<BarnbidragKalkyl />);
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "2");
    expect(screen.getByText("150 kr")).toBeInTheDocument();
  });
});