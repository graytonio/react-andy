import ReactPlayer from "react-player";
import { doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { createRef, useEffect, useRef } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./loadingspinner";

interface WatcherProps {
  roomCode: string;
}

export default function Watcher({ roomCode }: WatcherProps) {
  const roomDoc = doc(db, "rooms", roomCode);
  const [value, loading, error] = useDocumentData(roomDoc);
  const playerRef = createRef<ReactPlayer>();

  const onPause = () => {
    jumpToCurrent();
  };

  const onPlay = () => {
    jumpToCurrent();
  };

  const onProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!value) return;
    jumpToCurrent();
  };

  const jumpToCurrent = () => {
    if (!playerRef.current || !value) return;
    if (Math.abs(playerRef.current.getCurrentTime() - value.played) > 0.5) playerRef.current.seekTo(value.played);
  };

  if (loading) return <LoadingSpinner />;
  if (!value) return <div className="text-5xl">Room {roomCode} does not exist</div>;

  return (
    <div className="aspect-video pb-2">
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        controls={false}
        url={value.url}
        playing={value.playing}
        onReady={jumpToCurrent}
        onPause={onPause}
        onPlay={onPlay}
        onProgress={onProgress}
      />
    </div>
  );
}
