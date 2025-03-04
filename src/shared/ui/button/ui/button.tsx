import React, { ButtonHTMLAttributes } from "react";

import classes from "./button.module.css";
import clsx from "clsx";

interface iButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: iButton) => {
  const { children, onClick, ...rest } = props;

  return (
    <button
      className={clsx(classes.button, "text-3xl font-regular")}
      onClick={onClick}
      type={rest.type}
    >
      {children}
    </button>
  );
};
