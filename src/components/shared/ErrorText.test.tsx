import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorText from "./ErrorText";

const defaultProps = {
  error: "This is default error message",
};

describe("shared/ErrorText.ts", () => {
  it("Should show error text in document", () => {
    render(<ErrorText {...defaultProps} />);
    const errorMessage = `Something happened: ${defaultProps.error}`;
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
