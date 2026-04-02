import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prototype Template",
  description: "Spec-driven high-fidelity prototype template"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
