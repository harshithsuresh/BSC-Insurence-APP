import React from 'react';

export default function Navbar({ fixed }) {
  return (
    <nav className="flex flex-wrap items-center  py-3 bg-secondary mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center  ">
        <div className="w-full  flex  justify-between  gap-6">
          <a
            className="text-l  leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-white text-2xl"
            href="/"
          >
            Home
          </a>
          <a
            className="text-l  leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-white text-2xl"
            href="/viewGraph"
          >
            View Graph
          </a>
        </div>
      </div>
    </nav>
  );
}
