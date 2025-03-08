import React from "react";
import dayjs from "dayjs";

import classes from "./item.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChatId, setCurrentChat } from "entities/auth";
import clsx from "clsx";

interface iItem {
  user: string;
  lastMessage?: string;
  date: string;
  chatId: string;
  isMe: boolean;
}

const Item = (props: iItem) => {
  const { user, lastMessage, date, chatId, isMe } = { ...props };
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
      {/*Default user image*/}
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="22" cy="22" r="22" fill="#FCFCFC" />
        <g clip-path="url(#clip0_584_218)">
          <path
            d="M31.875 34.0007H29.7917V28.7475C29.7908 27.9309 29.4661 27.1479 28.8886 26.5704C28.3111 25.9929 27.5281 25.6681 26.7115 25.6673H18.2885C17.4719 25.6681 16.6889 25.9929 16.1114 26.5704C15.5339 27.1479 15.2092 27.9309 15.2083 28.7475V34.0007H13.125V28.7475C13.1267 27.3786 13.6712 26.0662 14.6392 25.0982C15.6072 24.1302 16.9196 23.5856 18.2885 23.584H26.7115C28.0804 23.5856 29.3928 24.1302 30.3608 25.0982C31.3288 26.0662 31.8733 27.3786 31.875 28.7475V34.0007Z"
            className={isMe ? "fill-accent-3" : "fill-accent"}
          />
          <path
            d="M22.5 21.5C21.2639 21.5 20.0555 21.1334 19.0277 20.4467C17.9999 19.7599 17.1988 18.7838 16.7258 17.6418C16.2527 16.4997 16.1289 15.2431 16.3701 14.0307C16.6113 12.8183 17.2065 11.7047 18.0806 10.8306C18.9547 9.95651 20.0683 9.36125 21.2807 9.12009C22.4931 8.87894 23.7497 9.00271 24.8918 9.47576C26.0338 9.9488 27.0099 10.7499 27.6967 11.7777C28.3834 12.8055 28.75 14.0139 28.75 15.25C28.7484 16.9071 28.0893 18.4958 26.9176 19.6676C25.7459 20.8393 24.1571 21.4983 22.5 21.5ZM22.5 11.0833C21.6759 11.0833 20.8703 11.3277 20.1851 11.7855C19.4999 12.2434 18.9659 12.8941 18.6505 13.6555C18.3351 14.4168 18.2526 15.2546 18.4134 16.0629C18.5742 16.8711 18.971 17.6136 19.5537 18.1963C20.1364 18.779 20.8789 19.1758 21.6871 19.3366C22.4954 19.4974 23.3332 19.4149 24.0945 19.0995C24.8559 18.7841 25.5066 18.2501 25.9645 17.5649C26.4223 16.8797 26.6667 16.0741 26.6667 15.25C26.6667 14.1449 26.2277 13.0851 25.4463 12.3037C24.6649 11.5223 23.6051 11.0833 22.5 11.0833Z"
            fill="#DB394B"
            className={isMe ? "fill-accent-3" : "fill-accent"}
          />
        </g>
        <defs>
          <clipPath id="clip0_584_218">
            <rect
              width="25"
              height="25"
              fill="white"
              transform="translate(10 9)"
            />
          </clipPath>
        </defs>
      </svg>
      <p className={classes.content}>
        {!isMe && <span className={classes.username}> {user}</span>}

        <span className={classes.message}>
          {lastMessage ? lastMessage : "Пусто"}
        </span>
      </p>

      <span className={classes.time}>{dayjs(date).format("DD.MM.YY")}</span>
    </div>
  );
};

export { Item };
