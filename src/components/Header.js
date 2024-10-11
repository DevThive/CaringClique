"use client";
// components/Header.js
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        {/* 메뉴 버튼 (모바일 전용) */}
        <button onClick={toggleMenu} className="md:hidden text-gray-600">
          메뉴
        </button>

        {/* PC 화면에서 항상 보이는 메뉴 */}
        <nav className="hidden md:flex">
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

        {/* 모바일 슬라이드 메뉴 */}
        <nav className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link href="/" onClick={toggleMenu}>
                <a className="text-gray-600 hover:text-blue-600">홈</a>
              </Link>
            </li>
            <li>
              <Link href="/board" onClick={toggleMenu}>
                <a className="text-gray-600 hover:text-blue-600">게시판</a>
              </Link>
            </li>
            <li>
              <Link href="/resources" onClick={toggleMenu}>
                <a className="text-gray-600 hover:text-blue-600">자료실</a>
              </Link>
            </li>
            <li>
              <Link href="/community" onClick={toggleMenu}>
                <a className="text-gray-600 hover:text-blue-600">커뮤니티</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu}>
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
