interface IFieldProps {
  cartValue: number | null;
  deliveryDistance: number | null;
  itemNumber: number | null;
  time: string | null;
}

interface IErrorProps {
  cartValueError: string;
  deliveryDistanceError: string;
  itemNumberError: string;
  timeError: string;
}

interface IActionProps {
  type: string;
  value: number | string | null;
}

type IStateProps = IFieldProps &
  IErrorProps & { deliveryCharge: number | null };

export type { IStateProps, IFieldProps, IActionProps, IErrorProps };
