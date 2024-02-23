interface IInputFieldProps {
  label: string;
  iconChar?: string;
  id: string;
  datatestid: string;
  type: string;
  name: string;
  value: string | number | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  inputError?: string;
  required?: boolean;
  step?: number;
}

export type { IInputFieldProps };
