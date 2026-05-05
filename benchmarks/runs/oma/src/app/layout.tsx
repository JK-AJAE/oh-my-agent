import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worldcraft - Build Your Imagination",
  description: "Create amazing 3D worlds with your imagination! A creative learning platform for young builders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-gradient-to-b from-spark-50 to-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
