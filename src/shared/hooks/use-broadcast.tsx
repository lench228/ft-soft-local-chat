import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface iBroadcastMessage<T> {
  name: string;
  action: (payload?: T, path?: string) => void;
}

export default function UseBroadcast<T>(message: iBroadcastMessage<T>) {
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const location = useLocation();

  useEffect(() => {
    broadcastChannelRef.current = new BroadcastChannel(message.name);

    broadcastChannelRef.current.onmessage = (e: MessageEvent<T>) => {
      message.action(e.data, location.pathname);
    };

    return () => {
      broadcastChannelRef.current?.close();
      broadcastChannelRef.current = null;
    };
  }, [location.pathname, message]);

  return (payload: T) => {
    broadcastChannelRef.current?.postMessage(payload);
  };
}
