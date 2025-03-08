import React from "react";
import classes from "./user-greet.module.css";

interface iUserGreet {
  userName: string;
}

const UserGreet = (props: iUserGreet) => {
  const { userName } = { ...props };
  return (
    <p className={classes.text}>
      Привет, <br />
      <span className={classes.username}>
        {" "}
        {userName ? userName : "ОШИБКА"}
      </span>
      !
    </p>
  );
};

export { UserGreet };
