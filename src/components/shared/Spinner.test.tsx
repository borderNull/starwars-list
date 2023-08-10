import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

const defaultProps = {
  size: 40,
};

const renderComponent = (incomingProps = {}) => {
  const props = { ...defaultProps, ...incomingProps };

  render(<Spinner {...props} />);

  return props;
};

describe("shared/Spinner.ts", () => {
  it("Should show spinner in document", () => {
    renderComponent();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("Should show spinner with size that depends on size property", () => {
    renderComponent({ size: 20 });
    expect(screen.getByRole("progressbar")).toHaveStyle({
      width: "20px",
      height: "20px",
    });
  });
});
