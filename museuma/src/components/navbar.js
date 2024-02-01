import React from "react";

export default function NavBar() {
  return (
    <header class="text-[#313639] body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          href="local"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span class="ml-3 text-xl">Museuma</span>
        </a>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a href="local" className="mr-5 hover:text-gray-900">
            First Link
          </a>
          <a href="local" className="mr-5 hover:text-gray-900">
            Second Link
          </a>
          <a href="local" className="mr-5 hover:text-gray-900">
            Third Link
          </a>
          <a href="local" className="mr-5 hover:text-gray-900">
            Fourth Link
          </a>
        </nav>
      </div>
    </header>
  );
}
