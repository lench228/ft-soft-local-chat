import React, { useRef, useState } from "react";
import { Button } from "shared/ui/button/ui/button";
import { v4 as uuidv4 } from "uuid";
import { saveBlobToLocalStorage } from "shared/lib/utils";
import {
  addMessage,
  iMessageAction,
  setError,
} from "entities/chat/model/chat.slice";
import UseBroadcast from "shared/hooks/use-broadcast";
import { useDispatch } from "react-redux";
import { UploadFileSvg } from "shared/assets/icons";

import classes from "./send-message.module.css";

interface iMessage {
  userMe: string;
  toName: string;
  chatId: string;
}

const SendMessage = (props: iMessage) => {
  const { userMe, chatId } = { ...props };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sendBroadcast = UseBroadcast<iMessageAction>({
    name: "messages",
    action: (payload) => {
      if (payload) {
        dispatch(addMessage(payload));
      }
    },
  });

  const handleTextSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    const chatMessage = {
      message: message.trim(),
      author: userMe,
      date: new Date(Date.now()).toISOString(),
      isBlob: false,
    };

    dispatch(
      addMessage({
        message: chatMessage,
        id: chatId,
      }),
    );
    sendBroadcast({ message: chatMessage, id: chatId });

    resetPage();
  };

  const resetPage = () => {
    setMessage("");
    dispatch(setError(""));
    setIsFileUploading(false);
    setSelectedFile(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "22px";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      resetPage();
      return;
    }

    setIsFileUploading(true);
    setSelectedFile(file);

    try {
      const blobId = uuidv4();
      await saveBlobToLocalStorage(file, blobId);

      const chatMessage = {
        message: blobId,
        author: userMe,
        date: new Date(Date.now()).toISOString(),
        isBlob: true,
      };

      dispatch(
        addMessage({
          message: chatMessage,
          id: chatId,
        }),
      );

      sendBroadcast({ message: chatMessage, id: chatId });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      resetPage();
    }
  };

  const handleInput = () => {
    const textArea = textareaRef.current;

    if (textArea) {
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form className={classes.container} onSubmit={handleTextSubmit}>
      <input
        hidden={true}
        type={"file"}
        id={"fileInput"}
        onChange={handleFileChange}
        disabled={selectedFile != null || isFileUploading}
        ref={fileInputRef}
      />

      <label htmlFor={"fileInput"} className={classes.upload}>
        <UploadFileSvg />
      </label>

      <textarea
        ref={textareaRef}
        id={"messageInput"}
        name={"message"}
        value={message}
        onInput={handleInput}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className={classes.textarea}
        disabled={selectedFile != null || isFileUploading}
      />

      <Button
        type={"submit"}
        disabled={(!message && !selectedFile) || isFileUploading}
        sizeType={"small"}
      >
        Отправить
      </Button>
    </form>
  );
};

export { SendMessage };
