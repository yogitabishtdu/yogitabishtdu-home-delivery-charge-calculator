import { calculateDeliveryPrice } from "./utils";

describe("Calculate Delivery Charges under different cases", () => {
  test("Calulation with edge cases of cart value (cart value < 10)", () => {
    const deliveryDistance = 1000;
    const cartValue = 7;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(5);
  });

  test("Calulation with edge cases of cart value (cart value > 10  and cart value < 200)", () => {
    const deliveryDistance = 1000;
    const cartValue = 11;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(2);
  });

  test("Calulation w.r.t. edge cases of cart value (cart value = 200)", () => {
    const deliveryDistance = 1000;
    const cartValue = 200;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(0);
  });

  test("Calulation w.r.t. edge cases of cart value (cart value > 200)", () => {
    const deliveryDistance = 1000;
    const cartValue = 201;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(0);
  });

  test("Calulation w.r.t. edge cases of delivery distance (delivery distance < 1000)", () => {
    const deliveryDistance = 200;
    const cartValue = 11;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(2);
  });

  test("Calulation w.r.t. edge cases of delivery distance (delivery distance < 1500)", () => {
    const deliveryDistance = 1499;
    const cartValue = 10;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(3);
  });

  test("Calulation w.r.t. edge cases of delivery distance (delivery distance = 1500)", () => {
    const deliveryDistance = 1500;
    const cartValue = 10;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(3);
  });

  test("Calulation w.r.t. edge cases of delivery distance (delivery distance > 1500)", () => {
    const deliveryDistance = 1501;
    const cartValue = 10;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(4);
  });

  test("Calulation w.r.t. edge cases of item number (item number < 5)", () => {
    const deliveryDistance = 1500;
    const cartValue = 10;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(3);
  });

  test("Calulation w.r.t. edge cases of item number (item number = 5)", () => {
    const deliveryDistance = 1500;
    const cartValue = 10;
    const itemNumber = 5;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(3.5);
  });

  test("Calulation w.r.t. edge cases of item number (item number > 5 && item number < 12 )", () => {
    const deliveryDistance = 1500;
    const cartValue = 10;
    const itemNumber = 6;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(4);
  });

  test("Calulation w.r.t. edge cases of item number (item number = 12 )", () => {
    const deliveryDistance = 1500;
    const cartValue = 10;
    const itemNumber = 12;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(7);
  });

  test("Calulation w.r.t. edge cases of item number (item number > 12 )", () => {
    const deliveryDistance = 1500;
    const cartValue = 10;
    const itemNumber = 13;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(8.7);
  });

  test("Calulation w.r.t. edge cases of time of order (time != friday rush hour)", () => {
    const deliveryDistance = 1000;
    const cartValue = 11;
    const itemNumber = 4;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(2);
  });

  test("Calulation w.r.t. edge cases of time of order (time = friday rush hour)", () => {
    const deliveryDistance = 1000;
    const cartValue = 11;
    const itemNumber = 4;
    const time = "2024-01-19T16:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(2.4);
  });

  test("Calulation w.r.t. total charge (total charges> 15)", () => {
    const deliveryDistance = 1500;
    const cartValue = 3;
    const itemNumber = 13;
    const time = "2024-01-23T14:15";

    const deliveryCharges = calculateDeliveryPrice({
      deliveryDistance,
      cartValue,
      itemNumber,
      time,
    });
    expect(deliveryCharges).toBe(15);
  });
});
