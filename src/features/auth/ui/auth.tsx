import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "entities/user/model";
import { v4 as uuidv4 } from "uuid";
import { loginUser } from "features/auth/model";
import { UsePageReload } from "app/layout/lib";
import { Button } from "shared/ui/button/ui/button";

export const Auth = () => {
  const dispatch = useDispatch();
  const { reloadDistPage } = UsePageReload();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = String(new FormData(e.currentTarget).get("name"));
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
    <form
      className="w-full h-full bg-blue-500"
      onSubmit={(e) => handleFormSubmit(e)}
    >
      Зарегайся братуха
      <fieldset className="w-full">
        <input id="name" name={"name"} />
      </fieldset>
      <Button type="submit">Регистрация</Button>
    </form>
  );
};
