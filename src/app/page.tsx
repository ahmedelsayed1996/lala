"use client";
import React from "react";
import { Menu, X, Sun, Moon, User } from "lucide-react";
import Button from "../app/Button";
import { cn } from "../app/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  // const [featuresMenuOpen, setFeaturesMenuOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "shadow-md p-4 fixed w-full top-0 z-50",
        darkMode ? "bg-black text-red-500" : "bg-white text-black"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#" className="hover:text-red-500">
            Lala
          </a>
        </div>

        {/* Desktop Links */}
        {/* <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:text-red-500">Home</a></li>
          <li className="relative">
            <button onClick={() => setFeaturesMenuOpen(!featuresMenuOpen)} className="flex items-center hover:text-gray-500">
              Features <ChevronDown size={16} className="ml-1" />
            </button>
            {featuresMenuOpen && (
              <ul className="absolute mt-2 w-48 bg-white shadow-md rounded-md p-2 space-y-2">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Feature 1</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Feature 2</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Feature 3</a></li>
              </ul>
            )}
          </li>
          <li><a href="#" className="hover:text-gray-500">Pricing</a></li>
          <li><a href="#" className="hover:text-gray-500">Contact</a></li>
        </ul> */}

        {/* Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md hover:text-red-500 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-2 rounded-md hover:text-red-500 dark:hover:bg-gray-700"
            >
              <User size={24} />
            </button>
            {userMenuOpen && (
              <ul className="absolute mt-2 w-40 bg-white shadow-md rounded-md p-2 space-y-2">
                <li>
                  <a href="#" className="block px-4 py-2 hover:text-red-500">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:text-red-500">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:text-red-500">
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
          <Button
            variant="outline"
            onMouseEnter={(e: any) => (e.target.style.color = "blue")}
            onMouseLeave={(e: any) => (e.target.style.color = "black")}
          >
            Log in
          </Button>
          <Button
            onMouseEnter={(e: any) => (e.target.style.color = "white")}
            onMouseLeave={(e: any) => (e.target.style.color = "black")}>Sign up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
