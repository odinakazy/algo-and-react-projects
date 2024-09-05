// src/__tests/ErrorComponent.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorComponent from "../Component/ErrorComponent"; // Adjust the path to where your ErrorComponent is located

describe("ErrorComponent", () => {
  it("should display the error message", () => {
    // Define the error message
    const errorMessage = "This is an error message";

    // Render the ErrorComponent with the error message
    render(<ErrorComponent message={errorMessage} />);

    // Assert that the error message is in the document
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
