import { useEffect, useRef, useMemo } from 'react';

interface iBroadcastMessage<T> {
    data: T;
    name: string;
}

/// Должно хорошо работать с любым message в канале, буду использовать везде

export default function UseBroadcast<T>(message: iBroadcastMessage<T>): void {
    const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

    const memoizedData = useMemo(() => message.data, [message.data]);

    useEffect(() => {
        if (!broadcastChannelRef.current) {

            broadcastChannelRef.current = new BroadcastChannel(message.name);

        }
        broadcastChannelRef.current.onmessage = (e) => {
            console.log(e)
        }
        broadcastChannelRef.current.postMessage(memoizedData);

        return () => {
            broadcastChannelRef.current?.close();
            broadcastChannelRef.current = null;
        };
    }, [memoizedData, message.name]);

}
