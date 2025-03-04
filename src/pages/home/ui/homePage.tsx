import { useDispatch, useSelector } from "react-redux";

import { FormEvent, useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "shared/ui/button/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  createChat,
  createProps,
  selectChats,
  selectError,
  setError,
} from "features/chat/model/chat.slice";
import UseBroadcast from "shared/hooks/use-broadcast";

import { selectUser } from "features/auth/model";
import { selectUsers } from "entities/user/model";
import { User } from "entities/user/model/user.slice";
import { UsePageReload } from "app/layout/lib";

export const HomePage = () => {
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);

  const [destinationName, setDestinationName] = useState("");

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const chats = useSelector(selectChats);
  const nav = useNavigate();
  const error = useSelector(selectError);

  const { reloadDistPage } = UsePageReload();

  useEffect(() => {
    if (!searchParams.get("userName") && user) {
      setSearchParams({ userId: user.id });
    }
  }, [user, setSearchParams, searchParams]);

  useEffect(() => {}, [chats]);

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
      nav(`/chat/${existingChat[0]}`);
      window.location.reload();
    } else if (user) {
      const chatId = uuidv4();
      dispatch(
        createChat({
          userName: user.name,
          chatId,
          destinationName: destinationName,
        }),
      );
      nav(`/chat/${chatId}`);
      if (reloadDistPage) {
        reloadDistPage("chatCreated");
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <p className={"tex-2xl"}>Привет, {user ? user.name : "ОШИБКА"} !</p>
      <input
        value={destinationName}
        onChange={(e) => setDestinationName(e.target.value)}
      />
      <Button disabled={!destinationName} type={"submit"}>
        Создать чат
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};
