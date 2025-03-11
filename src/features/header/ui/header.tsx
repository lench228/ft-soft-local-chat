import React from "react";
import classes from "./header.module.css";

interface iHeader {
  name: string;
}

export const Header = (props: iHeader) => {
  const { name } = { ...props };
  if (name?.length)
    return (
      <header className={classes.container}>
        <h1 className={classes.title}>
          Чатимся с <span className={classes.destination}>{name}</span>
        </h1>
      </header>
    );
  return <div>ОШИБКА</div>;
};
