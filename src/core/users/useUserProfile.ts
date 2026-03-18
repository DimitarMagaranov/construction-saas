import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { UserProfile } from "../models/types";
import { db } from "../firebase/firebase";

type State = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
};

export function useUserProfile(uid: string | null | undefined): State {
  const [state, setState] = useState<State>({ profile: null, loading: !!uid, error: null });

  useEffect(() => {
    if (!uid) {
      setState({ profile: null, loading: false, error: null });
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    const ref = doc(db, "users", uid);

    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setState({ profile: null, loading: false, error: null });
          return;
        }
        setState({ profile: snap.data() as UserProfile, loading: false, error: null });
      },
      (err) => {
        setState({ profile: null, loading: false, error: err?.message ?? "Failed to load profile" });
      }
    );

    return () => unsub();
  }, [uid]);

  return state;
}