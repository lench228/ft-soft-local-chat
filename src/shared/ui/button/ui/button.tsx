import React, { ButtonHTMLAttributes } from "react";

interface iButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: iButton) => {
  const { children, onClick, ...rest } = props;

  return (
    <button onClick={onClick} type={rest.type}>
      {children}
    </button>
  );
};
