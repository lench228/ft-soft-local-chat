import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "shared/ui/input";
import { Button } from "shared/ui/button/ui/button";
import { createChat, selectChats, selectError, setError } from "entities/chat";
import { selectUsers, User } from "entities/user/model/user.slice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setCurrentChat } from "entities/auth";
import { UsePageReload } from "app/layout/lib";

const CreateNewChat = () => {
  const dispatch = useDispatch();

  const { reloadDistPage } = UsePageReload();

  const user = useSelector(selectUser);
  const chats = useSelector(selectChats);
  const users = useSelector(selectUsers);
  const error = useSelector(selectError);

  const [destinationName, setDestinationName] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!destinationName) {
      dispatch(setError("Пользователь не найден"));
      return;
    }
    if (user && destinationName === user.name) {
      dispatch(setError("Попытка чата самому с собой"));
      return;
    }

    const existingChat = Object.entries(chats).find(([key, value]) => {
      if (user) {
        const users = [...value.users].sort();
        const newUsers = [user.name, destinationName].sort();
        return (
          users.length === 2 &&
          users.every((u) => u === newUsers[0] || u === newUsers[1])
        );
      }
    });

    if (users) {
      const isUser = users.find((user: User) => destinationName === user.name);
      if (!isUser) {
        dispatch(setError("Пользователь не найден"));
        return;
      }
    }

    if (existingChat) {
      dispatch(setError("Такой диалог уже есть"));
    } else if (user) {
      const chatId = uuidv4();
      dispatch(
        createChat({
          userName: user.name,
          chatId,
          destinationName: destinationName,
        }),
      );
      dispatch(setCurrentChat(chatId));

      if (reloadDistPage) {
        reloadDistPage("chatCreated");
      }
    }
  };

  return (
    <form
      className={"flex items-end gap-2"}
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <Input
        label={"Начать чат с..."}
        sizeType={"small"}
        placeholder={"Кому хотим написать?"}
        value={destinationName}
        onChange={(e) => setDestinationName(e.target.value)}
      />
      <Button sizeType={"small"} disabled={!destinationName} type={"submit"}>
        +
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export { CreateNewChat };
