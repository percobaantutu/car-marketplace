import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center p-5 shadow-md">
      <img src="/logo.png" alt="logo" className="h-12 object-cover" />

      <ul className="hidden md:flex gap-16">
        <Link to="/">
          <li className="font-medium hover:scale-105 transition-all cursor-pointer">Home</li>
        </Link>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer">Search</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer">New</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer">Preowned</li>
      </ul>
      {isSignedIn ? (
        <div className="flex gap-4">
          <UserButton></UserButton>
          <Link to="/profile">
            <Button className="bg-green-500">Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal" forceRedirectUrl="/">
          <Button>Submit Listing</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Header;
