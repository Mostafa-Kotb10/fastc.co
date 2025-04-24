import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="max-w-6xl m-auto py-5 px-3 sticky top-0 right-0 left-0 z-10">
      <div className="grid grid-cols-3">
        <div>
          <h2 className="font-bold text-2xl ">
            FastAF
          </h2>
        </div>
        <nav className="hidden md:block justify-items-center place-content-center">
          <ul className="flex items-center gap-5  text-[15px]">
            <li className="hover:text-blue-900 hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              Home
            </li>
            <li className="hover:text-blue-900 hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              About
            </li>
            <li className="hover:text-blue-900 hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              Solutions
            </li>
            <li className="hover:text-blue-900 hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              Features
            </li>
            <li className="hover:text-blue-900 hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              Pricing
            </li>
          </ul>
        </nav>
        <div className="hidden md:block justify-items-end">
          <div className="space-x-2">
            <Button className="rounded-sm bg-white text-black border-2 border-blue-950 hover:bg-blue-950 hover:text-white transition-all duration-300">
              Sign Up
            </Button>
            <Button className="bg-blue-800 rounded-sm hover:bg-blue-900">
              Login
            </Button>
          </div>
        </div>

        <div className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-menu cursor-pointer"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
