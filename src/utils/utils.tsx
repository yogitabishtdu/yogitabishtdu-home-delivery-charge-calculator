import type { IFieldProps } from "../pages/DeliveryCharges/type";

const calculateDeliveryPrice = (state: IFieldProps) => {
  let cartValue = 0;
  let cartDistance = 0;
  let cartItem = 0;
  let totalCharge = 0;

  let {
    cartValue: cartValueInput,
    deliveryDistance: deliveryDistanceInput,
    itemNumber: itemNumberInput,
    time: timeInput,
  } = state;

  if (cartValueInput && +cartValueInput >= 200) {
    return totalCharge;
  }

  cartValue = cartValueInput && +cartValueInput < 10 ? 10 - +cartValueInput : 0;

  cartDistance =
    deliveryDistanceInput && +deliveryDistanceInput > 1000
      ? 2 + Math.ceil((+deliveryDistanceInput - 1000) / 500)
      : 2;

  if (itemNumberInput) {
    if (+itemNumberInput < 5) {
      cartItem = 0; // upto 4 items is free
    }
    if (+itemNumberInput >= 5 && +itemNumberInput <= 12) {
      cartItem = (+itemNumberInput - 4) * 0.5;
    }
    if (+itemNumberInput > 12) {
      cartItem = (+itemNumberInput - 4) * 0.5 + 1.2;
    }
  }

  totalCharge = +cartValue + +cartDistance + +cartItem;

  let day = -1;
  let hours = -1;
  if (timeInput) {
    day = new Date(timeInput).getDay();
    hours = new Date(timeInput).getHours();
  }

  if (day === 5 && hours >= 13 && hours <= 19) {
    totalCharge = totalCharge * 1.2;
    return Math.round(totalCharge * 100) / 100;
  }

  return totalCharge <= 15 ? totalCharge : 15;
};

export { calculateDeliveryPrice };
