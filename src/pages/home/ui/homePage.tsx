import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

import { selectChats } from "entities/chat/model/chat.slice";

import { selectCurrentChatId, selectUser } from "entities/auth/model";

import { UserGreet } from "features/user-greet/ui/user-greet";
import classes from "./homePage.module.css";
import { ChatList } from "features/chat-list/ui/chat-list";
import ChatPage from "pages/chat";
import { useEffect } from "react";
import { CreateNewChat } from "features/create-new-chat";

export const HomePage = () => {
  const user = useSelector(selectUser);
  const currentChat = useSelector(selectCurrentChatId);

  const [searchParams, setSearchParams] = useSearchParams();
  const chats = useSelector(selectChats);

  useEffect(() => {
    if (!searchParams.get("userName") && user) {
      setSearchParams({ userId: user.id });
    }
  }, [user, setSearchParams, searchParams]);

  useEffect(() => {}, [chats]);

  return (
    <div className={classes.container}>
      <section className={"bg-bg"}>
        <UserGreet userName={user.name} />
        <CreateNewChat />
        <ChatList></ChatList>
      </section>
      <ChatPage chatId={currentChat} />
    </div>
  );
};
