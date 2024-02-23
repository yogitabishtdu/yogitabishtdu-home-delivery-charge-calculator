import { render, screen } from "@testing-library/react";
import App from "./App";

describe("check App renders", () => {
  test("Main heading renders", () => {
    render(<App />);
    const headingElement = screen.getByRole("heading", {
      name: /Delivery Fee Calculator/,
    });
    expect(headingElement).toBeInTheDocument();
  });
});
