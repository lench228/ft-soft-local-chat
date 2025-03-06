import React, { ButtonHTMLAttributes } from "react";

import classes from "./button.module.css";

interface iButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: iButton) => {
  const { children, onClick, ...rest } = props;

  return (
    <button
      className={classes.button}
      onClick={onClick}
      type={rest.type}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};
