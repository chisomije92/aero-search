"use client";

import { useIsMounted } from "../hooks/useIsMounted";

export function NoSSR({ children }: { children: React.ReactNode }) {
  const mounted = useIsMounted();

  if (!mounted) return null;
  return <>{children}</>;
}
