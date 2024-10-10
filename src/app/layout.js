// src/app/layout.js
import "./globals.css"; // Tailwind CSS 스타일을 가져옵니다.
import Header from "../components/Header";

export const metadata = {
  title: "간호사 커뮤니티",
  description: "간호사들을 위한 커뮤니티 웹사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
