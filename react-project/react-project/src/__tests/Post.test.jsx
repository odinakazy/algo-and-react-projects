// src/__tests/Post.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Post from "../Component/Post"; // Adjust the path if necessary

describe("Post Component", () => {
  it("renders the post title and body correctly", () => {
    const post = {
      title: "Test Post Title",
      body: "This is the body of the test post",
    };

    render(<Post post={post} />);

    // Assert that the title and body are rendered
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is the body of the test post")
    ).toBeInTheDocument();
  });
});
