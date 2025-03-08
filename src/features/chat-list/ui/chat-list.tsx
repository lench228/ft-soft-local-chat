import React from "react";
import { useSelector } from "react-redux";
import { selectChats } from "entities/chat";

const ChatList = () => {
  const chats = useSelector(selectChats);
  if (chats === null) {
    return <div>Пусто</div>;
  }
  return (
    <ul>
      {Object.entries(chats).map(([key, values]) => {
        return (
          <li key={key}>
            {values.users.map((chatInf) => (
              <p>{chatInf}</p>
            ))}
          </li>
        );
      })}
    </ul>
  );
};

export { ChatList };
