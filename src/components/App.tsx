import { useEffect, useState } from "react";
import Streamer from "./streamer";
import RoomSelector from "./roomselector";
import Watcher from "./watcher";

function App() {
  const [url, setUrl] = useState("");
  const [input, setInput] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [state, setState] = useState<"init" | "hosting" | "watching">("init");

  const loadVideo = () => {
    setUrl(input);
  };

  const handleRoomChange = (roomCode: string, state: "init" | "hosting" | "watching") => {
    setRoomCode(roomCode);
    setState(state);
    console.log(roomCode, state);
  };

  const GetPlayer = () => {
    if (!roomCode) return null;
    if (state == "hosting") return <Streamer url={url} roomCode={roomCode} />;
    return <Watcher roomCode={roomCode} />;
  };

  return (
    <div className="container sm:mx-auto bg-background grid gap-2 px-4 sm:px-0 pt-4">
      <div className="text-4xl font-bold font-body grid grid-cols-3">
        <div className="text-primary sm:col-span-1 col-span-3 sm:text-left text-center pt-2">
          <a href="/">React Andy</a>
        </div>
        <RoomSelector onConfigUpdate={handleRoomChange} />
      </div>

      {state == "hosting" && (
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2 col-start-3 flex gap-2 justify-end">
            <div className="font-bold text-accent text-lg">Invite Link:</div>
            <div
              className="bg-white px-2 rounded-md hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.href}?room=${roomCode}`);
              }}
            >
              {window.location.href}?room={roomCode}
            </div>
          </div>
          <input className="px-2 rounded-md flex-1 col-span-3" placeholder="Youtube Link..." type="text" onChange={(e) => setInput(e.target.value)} />
          <button className="bg-primary text-white px-2 py-1 font-body font-bold text-2xl rounded-md" onClick={loadVideo}>
            Load
          </button>
        </div>
      )}

      <div className="">
        <GetPlayer />
      </div>
    </div>
  );
}

export default App;
