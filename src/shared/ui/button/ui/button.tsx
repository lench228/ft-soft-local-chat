import React, { ButtonHTMLAttributes } from "react";
import classes from "./button.module.css";
import { TSize } from "shared/ui/types";
import clsx from "clsx";

interface iButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  sizeType: TSize;
}

export const Button = (props: iButton) => {
  const { children, onClick, sizeType, ...rest } = props;

  return (
    <button
      className={clsx(classes.button, classes[sizeType])}
      onClick={onClick}
      type={rest.type}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};
