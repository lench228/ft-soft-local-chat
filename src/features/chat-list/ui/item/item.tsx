import React, { useEffect } from "react";
import dayjs from "dayjs";

import classes from "./item.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChatId, setCurrentChat } from "entities/auth";
import clsx from "clsx";
import UserSvg from "shared/assets/icons/userSvg";

interface iItem {
  user: string;
  lastMessage?: string;
  isBlob?: boolean;
  date: string;
  chatId: string;
  isMe: boolean;
}

const Item = (props: iItem) => {
  const { user, lastMessage, date, chatId, isMe, isBlob } = { ...props };
  const currentChat = useSelector(selectCurrentChatId);

  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(setCurrentChat(chatId));
  };
  return (
    <div
      className={clsx(
        classes.container,
        isMe && classes.me,
        currentChat === chatId && "!bg-accent/30",
      )}
      key={user}
      onClick={handleItemClick}
    >
      <UserSvg isMe={isMe} />

      <p className={classes.content}>
        {!isMe && <span className={classes.username}> {user}</span>}

        <span className={classes.message}>
          {lastMessage && !isBlob ? lastMessage : isBlob ? "Картинка" : "Пусто"}
        </span>
      </p>

      <span className={classes.time}>{dayjs(date).format("DD.MM.YY")}</span>
    </div>
  );
};

export { Item };
