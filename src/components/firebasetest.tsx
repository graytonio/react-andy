import { db } from "../lib/firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./loadingspinner";

interface FirebaseTestProps {
  roomCode: string;
}
export default function FirebaseTest({ roomCode }: FirebaseTestProps) {
  const [value, loading, error] = useDocument(doc(db, "rooms", roomCode));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white py-2 rounded-md flex flex-col">
      <span className="text-2xl">DEBUG</span>
      <span>{roomCode}</span>
      <span>{error && JSON.stringify(error)}</span>
      <span>{value && JSON.stringify(value.data())}</span>
    </div>
  );
}
