export default function NavBar() {
    return (
        <header className="text-[#313639] body-font z-1">
        <div className="w-full flex justify-between items-center pl-5 pt-5 pb-5 pr-2">
          <div className="flex items-center">
            <img src="./logo.svg" alt="logo" className="w-12 mx-10"></img>
            <a
              href="/local"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <span className="ml-3 text-xl">Museum</span>
            </a>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <a href="/local" className="mr-5 hover:text-gray-900">
                First Link
              </a>
              <a href="/local" className="mr-5 hover:text-gray-900">
                Second Link
              </a>
              <a href="/local" className="mr-5 hover:text-gray-900">
                Third Link
              </a>
              <a href="/local" className="mr-5 hover:text-gray-900">
                Fourth Link
              </a>
            </nav>
          </div>
          <button className="inline-flex justify-center items-center mr-12 bg-[#EFEDE5] border-0 py-1 px-3 focus:outline-none hover:bg-[#DCD7C5] rounded text-base mt-8 md:mt-0 ml-auto">
            Log In
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    );
  }