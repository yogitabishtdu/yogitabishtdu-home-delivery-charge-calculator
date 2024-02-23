import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import DeliveryForm from "./DeliveryForm";

expect.extend(toHaveNoViolations);

describe("check DeliveryForm renders", () => {
  test("Submit button label display", async () => {
    const { container } = render(<DeliveryForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    const buttonElement = screen.getByTestId("submitButton");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Error message display with all empty entries", async () => {
    const user = userEvent.setup();
    render(<DeliveryForm />);
    const buttonElement = screen.getByRole("button", {
      name: /Calculate delivery price/,
    });
    await user.click(buttonElement);

    const cartErrorMessage = screen.getByTestId("cartValueError");
    expect(cartErrorMessage).toBeInTheDocument();
    expect(cartErrorMessage).toHaveTextContent(/Cart value is required/);

    expect(screen.getByTestId("deliveryDistanceError")).toHaveTextContent(
      "Delivery distance value is required"
    );

    expect(screen.getByTestId("itemNumberError")).toHaveTextContent(
      "Item number is required"
    );

    expect(screen.getByTestId("timeError")).toHaveTextContent(
      "Date and time are required"
    );
  });

  test("Only one error message appear with empty Input cart value", async () => {
    const user = userEvent.setup();
    render(<DeliveryForm />);

    const inputdeliveryDistance = screen.getByLabelText(/Delivery distance/i);
    await user.type(inputdeliveryDistance, "1000");
    expect(inputdeliveryDistance).toHaveValue(1000);

    const inputItemNumber = screen.getByLabelText(/Number of items/i);
    await user.type(inputItemNumber, "4");
    expect(inputItemNumber).toHaveValue(4);

    const inputTime = screen.getByLabelText(/Time/i);
    await user.type(inputTime, "2024-01-23T14:15");
    expect(inputTime).toHaveValue("2024-01-23T14:15");

    const buttonElement = screen.getByRole("button", {
      name: /Calculate delivery price/,
    });
    await user.click(buttonElement);
    expect(screen.getByText(/Cart value is required/)).toBeInTheDocument();
    expect(
      screen.queryByText(/Delivery distance value is required/)
    ).not.toBeInTheDocument();
  });

  test("Delivery charge appears after filling all the entries", async () => {
    const user = userEvent.setup();
    render(<DeliveryForm />);
    const inputCartValue = screen.getByLabelText(/Cart value/i);
    await user.type(inputCartValue, "7");
    expect(inputCartValue).toHaveValue(7);

    const inputdeliveryDistance = screen.getByLabelText(/Delivery distance/i);
    await user.type(inputdeliveryDistance, "1000");
    expect(inputdeliveryDistance).toHaveValue(1000);

    const inputItemNumber = screen.getByLabelText(/Number of items/i);
    await user.type(inputItemNumber, "4");
    expect(inputItemNumber).toHaveValue(4);

    const inputTime = screen.getByLabelText(/Time/i);
    await user.type(inputTime, "2024-01-23T14:15");
    expect(inputTime).toHaveValue("2024-01-23T14:15");

    const buttonElement = screen.getByRole("button", {
      name: /Calculate delivery price/,
    });
    await user.click(buttonElement);
    const resultElement = screen.getByTestId("fee");
    expect(resultElement).toBeInTheDocument();
    expect(resultElement).toHaveTextContent("Delivery Charges: €5");
  });
});
