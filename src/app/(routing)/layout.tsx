import type { Metadata } from "next";

import { geistMono, geistSans } from "@/ui/fonts";
import "@/ui/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.APP_NAME}`,
    default: `${process.env.APP_NAME}`,
  },
  description: `${process.env.APP_DESCRIPTION}`,
  applicationName: `${process.env.APP_NAME}`,
  icons: "/favicon/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
