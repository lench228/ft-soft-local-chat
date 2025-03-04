import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iPendingProps } from "shared/types";

import { saveBlobToLocalStorage } from "shared/lib/utils";

export type createProps = {
  userName: string;
  destinationName: string | null;
  chatId: string;
};

export interface iChat {
  users: string[];
  messages: iMessage[];
}

interface iMessage {
  author: string;
  date: string;
  replyed?: iMessage;
  message: string;
  blob?: Blob;
}

export interface iMessageAction {
  message: iMessage;
  blob?: Blob;
  id: string;
  isBlob?: boolean;
}

interface iChatSlice extends iPendingProps {
  chats: {
    [chatId: string]: {
      users: string[];
      messages: iMessage[];
    };
  };
}

const initialState: iChatSlice = {
  chats: {},
  isLoading: false,
  error: "",
};

export const ChatSlice = createSlice({
  name: "Chat",
  initialState: initialState,
  reducers: {
    createChat: (store, action: PayloadAction<createProps>) => {
      if (action.payload.destinationName) {
        store.chats[action.payload.chatId] = {
          messages: [],
          users: [action.payload.userName, action.payload.destinationName],
        };
        store.error = "";
      }
    },
    addMessage: (state, action: PayloadAction<iMessageAction>) => {
      const { id, message, blob } = action.payload;

      if (state.chats && state.chats[id]) {
        if (blob) {
          const blobKey = `blob-${Date.now()}-${Math.random()}`;
          saveBlobToLocalStorage(blob, blobKey).then((savedKey) => {
            const updatedMessage: iMessage = {
              ...message,
              message: String(savedKey),
            };
            state.chats[id].messages.push(updatedMessage);
          });
        } else {
          state.chats[id].messages.push(message);
        }
      }
    },
    setError: (store, action: PayloadAction<string>) => {
      store.error = action.payload;
    },
  },
  selectors: {
    selectError: (state) => state.error,
    selectChats: (state) => state.chats,
  },
});

export const { selectError, selectChats } = ChatSlice.selectors;
export const { createChat, setError, addMessage } = ChatSlice.actions;

export default ChatSlice;
