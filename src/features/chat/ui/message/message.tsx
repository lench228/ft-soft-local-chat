import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "shared/ui/button/ui/button";
import { v4 as uuidv4 } from "uuid";
import { saveBlobToLocalStorage } from "shared/lib/utils";
import { addMessage, iMessageAction } from "features/chat/model/chat.slice";
import UseBroadcast from "shared/hooks/use-broadcast";
import { useDispatch } from "react-redux";

interface iMessage {
  userMe: string;
  toName: string;
  chatId: string;
}

const Message = (props: iMessage) => {
  const { userMe, chatId } = { ...props };

  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const dispatch = useDispatch();

  const sendBroadcast = UseBroadcast<iMessageAction>({
    name: "messages",
    action: (payload) => {
      if (payload) {
        dispatch(addMessage(payload));
      }
    },
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      setIsFileUploading(true);

      try {
        const blobId = uuidv4();
        await saveBlobToLocalStorage(selectedFile, blobId);

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
        setIsFileUploading(false);
        setSelectedFile(null);
      }
    } else {
      const formData = String(new FormData(e.currentTarget).get("message"));

      const chatMessage = {
        message: formData,
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

      setMessage("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        id={"message"}
        name={"message"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={"bg-blue-500"}
        disabled={selectedFile != null || isFileUploading}
      />
      <input
        type={"file"}
        id={"fileInput"}
        onChange={handleFileChange}
        disabled={selectedFile != null || isFileUploading}
        className={"bg-blue-500"}
      />

      <Button
        type={"submit"}
        disabled={(!message && !selectedFile) || isFileUploading}
      >
        Отправить
      </Button>
    </form>
  );
};

export { Message };
