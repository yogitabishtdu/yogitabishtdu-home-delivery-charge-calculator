import React from "react";
import { useReducer } from "react";
import {
  CART_VALUE,
  DELIVERY_DISTANCE,
  ITEM_NUMBER,
  TIME,
  CART_VALUE_ERROR,
  DELIVERY_DISTANCE_ERROR,
  ITEM_NUMBER_ERROR,
  TIME_ERROR,
  DELIVERY_CHARGE,
} from "../../constants";
import { calculateDeliveryPrice } from "../../utils/utils";
import InputField from "../../components/Input";
import type { IStateProps, IActionProps } from "./type";
import "./DeliveryForm.css";

const reducerFunction = (state: IStateProps, action: IActionProps) => {
  switch (action.type) {
    case CART_VALUE:
    case DELIVERY_DISTANCE:
    case ITEM_NUMBER:
    case TIME:
    case CART_VALUE_ERROR:
    case DELIVERY_DISTANCE_ERROR:
    case ITEM_NUMBER_ERROR:
    case TIME_ERROR:
    case DELIVERY_CHARGE:
      return {
        ...state,
        [action.type]: action.value,
      };

    default: {
      return state;
    }
  }
};

const initialState = {
  cartValue: null,
  deliveryDistance: null,
  itemNumber: null,
  time: "",
  cartValueError: "",
  deliveryDistanceError: "",
  itemNumberError: "",
  timeError: "",
  deliveryCharge: null,
};

function DeliveryForm() {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const {
    deliveryDistance,
    cartValue,
    itemNumber,
    time,
    deliveryDistanceError,
    cartValueError,
    itemNumberError,
    timeError,
    deliveryCharge,
  } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ type: name, value });
  };

  const validateForm = () => {
    let isValid = true;

    if (!cartValue) {
      dispatch({ type: CART_VALUE_ERROR, value: "Cart value is required" });
      isValid = false;
    }

    if (!deliveryDistance) {
      dispatch({
        type: DELIVERY_DISTANCE_ERROR,
        value: "Delivery distance value is required",
      });
      isValid = false;
    }

    if (!itemNumber) {
      dispatch({ type: ITEM_NUMBER_ERROR, value: "Item number is required" });
      isValid = false;
    }

    if (!time) {
      dispatch({ type: TIME_ERROR, value: "Date and time are required" });
      isValid = false;
    }

    return isValid;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value) {
      dispatch({ type: `${name}Error`, value: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const deliveryCost = calculateDeliveryPrice(state);
      console.log(`deliveryCost ${deliveryCost}`);

      dispatch({
        type: DELIVERY_CHARGE,
        value: deliveryCost,
      });
    } else {
      dispatch({ type: DELIVERY_CHARGE, value: null });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <InputField
        label="Cart value"
        required
        iconChar="€"
        id="cartValue_id"
        datatestid="cartValue"
        type="number"
        step={0.1}
        name="cartValue"
        handleBlur={handleBlur}
        value={cartValue}
        handleChange={handleChange}
        placeholder="Enter cart amount..."
        inputError={cartValueError}
      />
      <InputField
        label="Delivery distance"
        required
        iconChar="m"
        id="deliveryDistance_id"
        datatestid="deliveryDistance"
        type="number"
        name="deliveryDistance"
        handleBlur={handleBlur}
        value={deliveryDistance}
        handleChange={handleChange}
        placeholder="Enter distance in meter..."
        inputError={deliveryDistanceError}
      />
      <InputField
        label="Number of items"
        required
        id="numberOfItems_id"
        datatestid="numberOfItems"
        type="number"
        name="itemNumber"
        handleBlur={handleBlur}
        value={itemNumber}
        handleChange={handleChange}
        placeholder="Enter number of items..."
        inputError={itemNumberError}
      />
      <InputField
        label="Time"
        required
        id="time_id"
        datatestid="time"
        type="datetime-local"
        name="time"
        handleBlur={handleBlur}
        value={time}
        handleChange={handleChange}
        placeholder="Enter date and time..."
        inputError={timeError}
      />
      <>
        <button data-testid="submitButton" type="submit">
          Calculate delivery price
        </button>
        <p
          className={
            deliveryCharge === undefined || deliveryCharge === null
              ? "display-none"
              : "display-delivery-charge"
          }
          data-testid="fee"
        >
          Delivery Charges: €{deliveryCharge}
        </p>
      </>
    </form>
  );
}

export default DeliveryForm;
