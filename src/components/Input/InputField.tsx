import React from "react";
import type { IInputFieldProps } from "./type";
import "./input.css";

function InputField({
  label,
  iconChar,
  id,
  datatestid,
  type,
  name,
  value,
  handleChange,
  handleBlur,
  placeholder,
  inputError,
  required = false,
  step,
}: IInputFieldProps) {
  return (
    <div className="input-label-container">
      <div className="input-label-icon">
        <label className="style-35" htmlFor={id}>
          {required ? `${label}*` : label}
        </label>
        <div className="style-65">
          <input
            data-testid={datatestid}
            id={id}
            type={type}
            name={name}
            value={value || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            step={step}
            aria-label={label}
            aria-required="true"
          />{" "}
          <label>{iconChar}</label>
        </div>
      </div>

      <div className="error-div">
        <div className="style-35">&nbsp;</div>
        <div data-testid={`${name}Error`} className="error style-65">
          {inputError}
        </div>
      </div>
    </div>
  );
}

export default InputField;
