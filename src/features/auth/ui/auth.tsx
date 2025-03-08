import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import classes from "./auth.module.css";
import { v4 as uuidv4 } from "uuid";

import { addUser } from "entities/user/model";
import { loginUser } from "entities/auth/model";

import { UsePageReload } from "app/layout/lib";

import { Button } from "shared/ui/button/ui/button";
import { Input } from "shared/ui/input";

export const Auth = () => {
  const dispatch = useDispatch();
  const { reloadDistPage } = UsePageReload();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = String(new FormData(e.currentTarget).get("username"));
    if (name) {
      const user = { name: name, id: uuidv4() };

      dispatch(addUser(user));
      dispatch(loginUser(user));

      if (reloadDistPage) {
        reloadDistPage("newUser");
      }
    }
  };
  return (
    <form className={classes.container} onSubmit={(e) => handleFormSubmit(e)}>
      <h1 className={classes.title}>
        добро <br />
        пожаловать
      </h1>
      <fieldset>
        <Input
          sizeType={"default"}
          label={"ваше имя"}
          placeholder={"Иван"}
          id={"username"}
          name={"username"}
        />
      </fieldset>
      <Button sizeType={"default"} type="submit">
        Регистрация
      </Button>
    </form>
  );
};
