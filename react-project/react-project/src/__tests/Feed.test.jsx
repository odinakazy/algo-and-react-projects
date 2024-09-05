import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Feed from "../Component/Feed";
import axios from "axios";

// Mock modules
vi.mock("axios");
vi.mock("../Component/LoadingSpinner", () => ({
  default: () => <div>Loading...</div>,
}));
vi.mock("../Component/ErrorComponent", () => ({
  default: ({ message }) => <div>{message}</div>,
}));

const mockPosts = [
  { id: 1, title: "Test Post 1", body: "This is a test post" },
  { id: 2, title: "Test Post 2", body: "This is another test post" },
];

describe("Feed Component", () => {
  it("should fetch and display posts", async () => {
    // Mocking axios.get to return mock posts
    axios.get.mockResolvedValueOnce({ data: mockPosts });

    render(<Feed />);

    // Check if loading spinner is displayed initially
    const loadingSpinners = screen.getAllByText("Loading...");
    expect(loadingSpinners.length).toBeGreaterThan(0); // Ensure at least one spinner is present

    // Wait for posts to be fetched and displayed
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.getByText("Test Post 1")).toBeInTheDocument();
      expect(screen.getByText("Test Post 2")).toBeInTheDocument();
    });
  });
});
