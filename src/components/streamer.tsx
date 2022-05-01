import { useEffect, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import ReactPlayer from "react-player";

interface StreamerProps {
  url: string;
  roomCode: string;
}

export default function Streamer({ roomCode, url }: StreamerProps) {
  const roomDoc = doc(db, "rooms", roomCode);

  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    console.log("Playing");
    setPlaying(true);
    updateDoc(roomDoc, { playing: true });
  };

  const handlePause = () => {
    console.log("Pausing");
    setPlaying(false);
    updateDoc(roomDoc, { playing: false });
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    updateDoc(roomDoc, { played: state.playedSeconds });
  };

  useEffect(() => {
    setDoc(roomDoc, { url: url, playing: false, updated: new Date() }, { merge: true });
  }, [roomCode]);

  return (
    <div className="aspect-video pb-2">
      <ReactPlayer width="100%" height="100%" controls={true} url={url} playing={playing} onProgress={handleProgress} onPlay={handlePlay} onPause={handlePause} />
    </div>
  );
}
