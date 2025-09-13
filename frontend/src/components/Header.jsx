import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-2xl md:text-3xl font-bold text-red-500">
        Find <span className="text-gray-800">influencer</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-gray-700">
        <Link className="font-bold text-lg text-black" to="/">Home</Link>
        <Link className="font-bold text-lg text-black" to="/">Complaints</Link>
        <Link className="font-bold text-lg text-black" to="/">Contact</Link>
      </nav>

      {/* Auth + Buttons (desktop) */}
      <div className="hidden md:flex gap-4 items-center">
        <button className="text-gray-600 font-semibold border-2 border-black px-6 py-1 rounded-md">
          Login
        </button>
        <button className="text-gray-600 font-semibold border-2 border-black px-6 py-1 rounded-md">
          Register
        </button>
        <Link to={"/"}>
          <button className="bg-red-500 px-4 py-2 rounded-lg text-white">
            Payment
          </button>
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <i
          className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-2xl cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        ></i>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-6 md:hidden z-50">
          <Link
            className="font-bold text-lg text-black"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            className="font-bold text-lg text-black"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Complaints
          </Link>
          <Link
            className="font-bold text-lg text-black"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {/* Auth + Buttons */}
          <div className="flex flex-col gap-4 w-full px-6">
            <button className="text-gray-600 font-semibold border-2 border-black px-6 py-2 rounded-md">
              Login
            </button>
            <button className="text-gray-600 font-semibold border-2 border-black px-6 py-2 rounded-md">
              Register
            </button>
            <Link to={"/"}>
              <button className="bg-red-500 px-4 py-2 rounded-lg text-white w-full">
                Payment
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
