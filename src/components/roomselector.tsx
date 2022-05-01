import React, { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";

const uuid = new ShortUniqueId({ dictionary: "alphanum_upper" });

interface RoomSelectorProps {
  onConfigUpdate(roomCode: string, hosting: "init" | "hosting" | "watching"): void;
}

export default function RoomSelector({ onConfigUpdate }: RoomSelectorProps) {
  const [roomCode, setRoomCode] = useState("");
  const [state, setState] = useState<"init" | "hosting" | "watching">("init");
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setInput(value.toUpperCase());
  };

  const handleHosting = () => {
    const newCode = uuid();
    setRoomCode(newCode);
    setState("hosting");
  };

  const handleWatching = () => {
    setRoomCode(input);
    setState("watching");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const room = queryParams.get("room");

    if (room) {
      setRoomCode(room);
      setState("watching");
    }
  }, []);

  useEffect(() => {
    onConfigUpdate(roomCode, state);
  }, [roomCode, state]);

  if (state === "init")
    return (
      <div className="grid grid-cols-2 col-span-3 sm:col-span-2 gap-2">
        <button type="button" className="bg-primary text-white px-2 py-1 font-body font-bold text-2xl rounded-lg col-span-2" onClick={handleHosting}>
          Host
        </button>
        <button type="button" className="bg-primary text-white px-2 py-1 font-body font-bold text-2xl rounded-lg" onClick={handleWatching}>
          Join
        </button>
        <input type="text" placeholder="Room Code" value={input} className="rounded-md px-2 text-black text-lg" onChange={handleInputChange} />
      </div>
    );

  return <div className="text-white text-4xl sm:text-right text-left col-span-3 sm:col-span-2">Room Code: {roomCode}</div>;
}
