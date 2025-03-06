import React, { InputHTMLAttributes } from "react";
import classes from "./input.module.css";

interface iInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: iInput) => {
  const { label, id, name, placeholder, type } = props;
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={props.name}>
        {label}
      </label>
      <input
        className={classes.input}
        placeholder={placeholder}
        id={id}
        name={name}
        type={type}
      ></input>
    </div>
  );
};

export { Input };
