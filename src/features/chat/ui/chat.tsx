import React, { useEffect, useState } from "react";
import { loadBlobFromLocalStorage } from "shared/lib/utils";
import { iChat } from "entities/chat/model/chat.slice";

interface ChatMessage {
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

export const Chat = (chat: iChat) => {
  const [blobLoadingStates, setBlobLoadingStates] = useState<
    Record<string, BlobLoadingState>
  >({});

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
    if (chat) {
      chat.messages.forEach((message: ChatMessage) => {
        if (message.isBlob && !blobLoadingStates[message.message]) {
          setBlobLoadingStates((prevState) => ({
            ...prevState,
            [message.message]: { isLoading: true, url: null, error: null },
          }));
          loadBlob(message.message);
        }
      });
    }
  }, [chat, blobLoadingStates]);

  return (
    <main
      className={
        "w-full h-full flex items-center justify-center m-auto bg-none"
      }
    >
      {chat.messages.length ? (
        <ul>
          {chat.messages.map((message: ChatMessage, index) => {
            if (message.isBlob) {
              const blobId = message.message;
              const loadingState = blobLoadingStates[blobId];

              if (loadingState?.isLoading) {
                return <li key={index}>Загрузка изображения...</li>;
              } else if (loadingState?.error) {
                return (
                  <li key={index}>
                    Ошибка загрузки изображения: {loadingState.error}
                  </li>
                );
              } else if (loadingState?.url) {
                return (
                  <li key={index}>
                    <img
                      width="200"
                      height="150"
                      src={loadingState.url}
                      alt="Изображение из Blob"
                      onLoad={() => URL.revokeObjectURL(loadingState.url!)}
                      onError={() =>
                        console.error("Ошибка при загрузке изображения")
                      }
                    />
                  </li>
                );
              } else {
                return <li key={index}>Неизвестная ошибка</li>;
              }
            } else {
              return <li key={index}>{message.message}</li>;
            }
          })}
        </ul>
      ) : (
        <h2>Начните историю диалога!</h2>
      )}
    </main>
  );
};
