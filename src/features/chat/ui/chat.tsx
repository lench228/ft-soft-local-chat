import React, { useEffect, useRef, useState } from "react";
import { loadBlobFromLocalStorage } from "shared/lib/utils";
import { iChat } from "entities/chat/model/chat.slice";
import { ChatMessage } from "features/chat/ui/chat-message";
import { User } from "entities/user/model/user.slice";

export interface iChatMessage {
  message: string;
  author: string;
  date: string;
  isBlob?: boolean;
}

interface BlobLoadingState {
  isLoading: boolean;
  url: string | null;
  error: string | null;
}

interface iChatList extends iChat {
  user: User;
}

export const Chat = ({ messages, user }: iChatList) => {
  const [blobLoadingStates, setBlobLoadingStates] = useState<
    Record<string, BlobLoadingState>
  >({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  const loadBlob = async (blobId: string) => {
    try {
      const blob = await loadBlobFromLocalStorage(blobId);
      if (blob) {
        const url = URL.createObjectURL(blob);
        setBlobLoadingStates((prevState) => ({
          ...prevState,
          [blobId]: { isLoading: false, url, error: null },
        }));
      } else {
        setBlobLoadingStates((prevState) => ({
          ...prevState,
          [blobId]: { isLoading: false, url: null, error: "Blob not found" },
        }));
      }
    } catch (error) {
      console.error("Error loading Blob:", error);
      setBlobLoadingStates((prevState) => ({
        ...prevState,
        [blobId]: { isLoading: false, url: null, error: "Error loading Blob" },
      }));
    }
  };

  useEffect(() => {
    if (messages) {
      messages.forEach((message: iChatMessage) => {
        if (message.isBlob && !blobLoadingStates[message.message]) {
          setBlobLoadingStates((prevState) => ({
            ...prevState,
            [message.message]: { isLoading: true, url: null, error: null },
          }));
          loadBlob(message.message);
        }
      });
    }
  }, [messages, blobLoadingStates]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatEndRef.current) {
        const container = chatEndRef.current;
        if (container) {
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 200); // Задержка 50 мс
        }
      }
    };

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      Object.values(blobLoadingStates).forEach((state) => {
        if (state.url) {
          URL.revokeObjectURL(state.url);
        }
      });
    };
  }, [blobLoadingStates]);

  const renderMessage = (message: iChatMessage) => {
    if (message.isBlob) {
      const blobId = message.message;
      const loadingState = blobLoadingStates[blobId];

      if (loadingState?.isLoading) {
        return (
          <ChatMessage key={blobId} message={message} user={user}>
            Загрузка изображения...
          </ChatMessage>
        );
      } else if (loadingState?.error) {
        return (
          <ChatMessage key={blobId} message={message} user={user}>
            Ошибка загрузки изображения: {loadingState.error}
          </ChatMessage>
        );
      } else if (loadingState?.url) {
        return (
          <ChatMessage key={blobId} message={message} user={user}>
            <img
              width="200"
              height="150"
              src={loadingState.url}
              alt="Изображение из Blob"
              onError={() => console.error("Ошибка при загрузке изображения")}
            />
          </ChatMessage>
        );
      } else {
        return (
          <ChatMessage key={blobId} message={message} user={user}>
            Неизвестная ошибка
          </ChatMessage>
        );
      }
    } else {
      return (
        <ChatMessage key={message.date} message={message} user={user}>
          {message.message}
        </ChatMessage>
      );
    }
  };

  return (
    <main
      ref={chatEndRef}
      className="overflow-y-scroll w-full h-full flex justify-start bg-none p-14"
    >
      {messages && messages.length ? (
        <ul className="flex flex-col gap-4">
          {messages.map((message) => renderMessage(message))}
        </ul>
      ) : (
        <h2>Начните историю диалога!</h2>
      )}
    </main>
  );
};
