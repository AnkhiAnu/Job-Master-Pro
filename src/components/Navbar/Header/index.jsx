import React from "react";

function Header() {
  return (
    <header className="mt-10 flex flex-col gap-5 items-center justify-center text-white"role="banner">
     <h1 className="text-5xl font-bold text-center sm:text-4xl">Your Ideal Job Awaits, Start The Search</h1>
      <p className="text-xl text-center">Get the latest job openings that best suit you!</p>
    </header>
  );
}

export default Header;
