import React from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Topbar from "../../components/shared/Topbar";
import LeftSidebar from "../../components/shared/LeftSidebar";
import Bottombar from "../../components/shared/Bottombar";
import RightSidebar from "../../components/shared/RightSidebar";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threads-clone",
  description: "A Next.js 13 Meta Threads application clone by emma_js",
};

export default function RootLayout({
  children,
}) {
  return (
    // <ClerkProvider
    //   appearance={{
    //     baseTheme: dark,
    //   }}
    // >
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container sm:text-xsm'>
              <div className='w-full'>{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    // </ClerkProvider>
  );
}
