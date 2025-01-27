"use client"

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`bg-blue-600 text-white`}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between py-4 px-6 max-w-7xl">
        <h1 className="text-xl font-bold">
          <Link href="/">Doce Essência Admin</Link>
        </h1>
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:items-center`}
        >
          <ul className="flex flex-col sm:flex-row sm:space-x-6 mt-4 sm:mt-0 sm:justify-center space-y-4 sm:space-y-0">
            <li>
              <Link
                href="/produtos/promo"
                className="block sm:text-center hover:underline hover:text-yellow-300 transition-colors"
              >
                Promoções
              </Link>
            </li>
            <li>
              <Link
                href="/produtos"
                className="block sm:text-center hover:underline hover:text-yellow-300 transition-colors"
              >
                Todos os Produtos
              </Link>
            </li>
            <li>
              <Link
                href="/produtos/adicionar"
                className="block sm:text-center hover:underline hover:text-yellow-300 transition-colors"
              >
                Adicionar Produtos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
