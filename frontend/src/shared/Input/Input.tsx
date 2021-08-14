import React from "react";
import classes from "./Input.module.css";

interface Props {
  type?: "text" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  valid: boolean;
  touched: boolean;
  value: string;
}

const Input = (props: Props) => {
  const { type, placeholder, onChange, touched, valid, value } = props;

  const isInvalid = touched && !valid;

  return (
    <input
      value={value}
      placeholder={placeholder}
      className={`${classes.input} ${isInvalid ? classes.invalid : ""}`}
      type={type || "text"}
      onChange={onChange}
    />
  );
};

export default Input;
