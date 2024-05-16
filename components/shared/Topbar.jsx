// import {
//   OrganizationSwitcher,
//   SignedIn,
//   SignOutButton,
//   UserButton,
// } from "@clerk/nextjs";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/assets/pricelogo.png" alt="logo" width={50} height={50} />
        <p className="text-heading3-bold text-light-1">Price</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* <UserButton afterSignOutUrl="/" />

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }} */}
        {/* /> */}
      </div>
    </nav>
  );
}

export default Topbar;
