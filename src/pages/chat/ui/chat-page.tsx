import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectChats } from "entities/chat/model/chat.slice";
import { selectUser } from "entities/auth/model";

import { Header } from "features/header";
import { Chat } from "features/chat/ui";
import { SendMessage } from "features/send-message/ui/send-message";

interface iChatPage {
  chatId: string;
}

export const ChatPage = (props: iChatPage) => {
  const navigate = useNavigate();
  const userMe = useSelector(selectUser);
  const chats = useSelector(selectChats);

  const { chatId } = { ...props };
  const chat = chats[chatId];

  // Обновление страницы не дает persist обновлять адекватно данные
  // Сомневаюсь что так должно быть, но пока осталю так

  useEffect(() => {
    if (!chatId || !chat) {
      navigate("/");
    }
  }, [chatId, chat, navigate]);

  const toName = chat?.users.find((user) => user !== userMe.name);

  if (chat && toName)
    return (
      <section
        className={"flex justify-between flex-col h-full w-full bg-transparent"}
      >
        <Header name={toName} />
        <Chat {...chat} user={userMe} />
        <SendMessage userMe={userMe.name} toName={toName} chatId={chatId} />
      </section>
    );
};
