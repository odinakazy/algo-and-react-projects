import "@testing-library/jest-dom";

// Mock IntersectionObserver
// Mock IntersectionObserver
window.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
};
