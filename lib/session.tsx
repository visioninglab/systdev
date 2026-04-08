"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Session, emptySession } from "./schema";

const STORAGE_KEY = "systdev:session:v1";

type Ctx = {
  session: Session;
  setSession: (s: Session) => void;
  update: (patch: Partial<Session>) => void;
  reset: () => void;
};

const SessionContext = createContext<Ctx | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session>(emptySession);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSessionState(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {}
  }, [session, hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      session,
      setSession: (s) => setSessionState({ ...s, updatedAt: new Date().toISOString() }),
      update: (patch) =>
        setSessionState((prev) => ({
          ...prev,
          ...patch,
          updatedAt: new Date().toISOString(),
        })),
      reset: () => setSessionState(emptySession()),
    }),
    [session]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
