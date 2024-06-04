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
  title: "Price",
  description:
    "An application for contributing to the price of items around the school area",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main className="flex flex-row">
            <LeftSidebar />
            <section className="flex min-h-screen flex-1 flex-col items-center sm:text-xsm text-light-1 bg-dark-1 px-6 pb-10 md:pt-28 pt-14 max-md:pb-32 sm:px-10 w-full ">
              <div className="w-full">{children}</div>
            </section>
        
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
