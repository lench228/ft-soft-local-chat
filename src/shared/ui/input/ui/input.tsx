import React, { InputHTMLAttributes } from "react";
import classes from "./input.module.css";
import clsx from "clsx";
import { TSize } from "shared/ui/types";

interface iInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sizeType: TSize;
}

const Input = (props: iInput) => {
  const { label, id, name, placeholder, type, sizeType, onChange } = props;
  return (
    <div className={clsx(classes.container, classes[sizeType])}>
      <label className={classes.label} htmlFor={props.name}>
        {label}
      </label>
      <input
        onChange={onChange}
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
