import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const PATH = "debug/smoke";

export async function writeSmokeDoc(uid: string | null) {
  const ref = doc(db, PATH);
  await setDoc(
    ref,
    {
      updatedAt: serverTimestamp(),
      updatedBy: uid ?? "anonymous",
      note: "smoke-test",
    },
    { merge: true }
  );
}

export async function readSmokeDoc() {
  const ref = doc(db, PATH);
  const snap = await getDoc(ref);
  return { exists: snap.exists(), data: snap.data() };
}