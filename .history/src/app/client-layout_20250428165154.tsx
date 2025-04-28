"use client";

import { MeshProvider } from "@meshsdk/react";
import { HomeHeader } from "@/components/home/home-header";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeHeader></HomeHeader>
    <MeshProvider>
      {children}
    </MeshProvider>
  );
}