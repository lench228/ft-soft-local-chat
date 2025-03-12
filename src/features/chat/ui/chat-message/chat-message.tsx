import React from "react";
import { iChatMessage } from "features/chat/ui/chat";
import { User } from "entities/user/model/user.slice";
import clsx from "clsx";
import classes from "./chat-message.module.css";
import UserSvg from "shared/assets/icons/user-svg";
import dayjs from "dayjs";

interface iChatItem {
  children: React.ReactNode;
  message: iChatMessage;
  user: User;
}

const ChatMessage = (props: iChatItem) => {
  const { children, message, user } = props;
  const isMe = user.name === message.author;
  return (
    <li className={clsx(classes.container, isMe && classes.me)}>
      <UserSvg isMe={isMe} />
      <p className={classes.content}>
        <span className={classes.message}>{children}</span>
        <span className={classes.footer}>
          {dayjs(message.date).format("DD.MM.YY")} {isMe && "я"}
        </span>
      </p>
    </li>
  );
};

export { ChatMessage };
