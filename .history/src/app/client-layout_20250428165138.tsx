"use client";

import { MeshProvider } from "@meshsdk/react";
import Home from "./page";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MeshProvider>
      {children}
    </MeshProvider>
  );
}