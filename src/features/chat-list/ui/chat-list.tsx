import React from "react";
import { useSelector } from "react-redux";
import { selectChats } from "entities/chat";
import { Item } from "features/chat-list/ui/item";
import { selectUser } from "entities/auth";

const ChatList = () => {
  const chats = useSelector(selectChats);
  const currentUser = useSelector(selectUser);

  const userChats = Object.entries(chats).filter(([, chat]) =>
    chat.users.some((user) => user === currentUser.name),
  );

  if (userChats.length === 0) {
    return <div className={"text-3xl font-bold text-main"}>Чатов нет(</div>;
  }

  return (
    <ul className="m-[-20px] max-w-[300px]">
      {userChats.map(([chatId, chat]) => {
        if (chat.messages.length > 0) {
          const lastMessage = chat.messages[chat.messages.length - 1];
          return (
            <li key={chatId}>
              <Item
                lastMessage={lastMessage.message}
                user={lastMessage.author}
                date={lastMessage.date}
                chatId={chatId}
                isMe={lastMessage.author === currentUser.name}
                isBlob={lastMessage.isBlob}
              />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export { ChatList };
