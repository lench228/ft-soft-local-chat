import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectChats } from "features/chat/model/chat.slice";
import { selectUser } from "features/auth/model";

import { Header } from "features/chat/ui/header/header";
import { Chat } from "features/chat/ui";
import { Message } from "features/chat/ui/message/message";

export const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userMe = useSelector(selectUser);

  const chatId = location.pathname.split("/")[2];
  const chats = useSelector(selectChats);
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
      <section className={"flex justify-between flex-col h-full"}>
        <Header name={toName} />
        <Chat {...chat} />
        <Message userMe={userMe.name} toName={toName} chatId={chatId} />
      </section>
    );
};
