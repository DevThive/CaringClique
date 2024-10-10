"use client";
// components/Header.js
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white shadow-md fixed w-full transition-all duration-300 ${
        isScrolled ? "h-16" : "h-24"
      } z-50`}
    >
      <div className="container mx-auto flex justify-between items-center h-full p-4">
        <h1
          className={`text-2xl font-bold text-blue-600 transition-all duration-300 ${
            isScrolled ? "text-xl" : "text-3xl"
          }`}
        >
          CaringClique
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <a className="text-gray-600 hover:text-blue-600">홈</a>
              </Link>
            </li>
            <li>
              <Link href="/board">
                <a className="text-gray-600 hover:text-blue-600">게시판</a>
              </Link>
            </li>
            <li>
              <Link href="/resources">
                <a className="text-gray-600 hover:text-blue-600">자료실</a>
              </Link>
            </li>
            <li>
              <Link href="/community">
                <a className="text-gray-600 hover:text-blue-600">커뮤니티</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className="text-gray-600 hover:text-blue-600">문의하기</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
