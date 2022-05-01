import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const clearOldRooms = functions.pubsub.schedule("0 0 * * *").onRun(async () => {
  const cutoff = Date.now() - 2 * 24 * 60 * 60 * 1000;
  const docs = await admin.firestore().collection("rooms").orderBy("updated").endAt(cutoff).get();

  docs.forEach((doc) => {
    doc.ref.delete();
  });
});
