"use client"; // 클라이언트 컴포넌트로 설정

import { useState, useEffect } from "react";

const ads = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/300x150?text=광고+1",
    alt: "광고 1",
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/300x150?text=광고+2",
    alt: "광고 2",
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/300x150?text=광고+3",
    alt: "광고 3",
  },
];

const AdScroll = () => {
  const [currentAd, setCurrentAd] = useState(0);

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);
  };

  useEffect(() => {
    const interval = setInterval(nextAd, 3000); // 3초마다 자동으로 넘어감
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <div
      className="relative"
      style={{ marginTop: "6rem", marginBottom: "5rem" }}
    >
      {/* 광고 이미지 */}
      <div className="bg-gray-200 rounded-b-lg overflow-hidden mb-4">
        {" "}
        {/* 아래쪽 둥근 모서리 추가 */}
        <img
          src={ads[currentAd].imageUrl}
          alt={ads[currentAd].alt}
          className="w-full h-[300px] object-cover" // 크기 조정
        />
      </div>

      {/* 이전 및 다음 버튼 */}
      <div
        className="absolute left-4 flex items-center justify-between bg-white rounded-lg p-4 shadow-lg hidden md:flex"
        style={{ top: "17rem" }}
      >
        <button onClick={prevAd} className="text-gray-700 mr-4">
          ◀
        </button>

        <button onClick={nextAd} className="text-gray-700 mr-4">
          ▶
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-yellow-500 font-bold">{currentAd + 1}</span>
          <span className="text-gray-400">/ {ads.length}</span>
          <div className="flex items-center">
            <div className="w-32 h-1 bg-gray-300 relative">
              <div
                className="absolute h-1 bg-yellow-500"
                style={{ width: `${((currentAd + 1) / ads.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 광고 인디케이터 (모바일에서는 별도 창으로 표시) */}
      {/* 인디케이터 - 모바일에서만 보임 */}
      <div className="flex flex-col items-center mt-2 md:hidden">
        <div className="w-full px-4">
          <div className="h-1 bg-gray-300 relative mb-2">
            <div
              className="absolute h-1 bg-yellow-500"
              style={{ width: `${((currentAd + 1) / ads.length) * 100}%` }}
            />
          </div>
        </div>
        {/* <span className="text-yellow-500 font-bold">{Math.round(((currentAd + 1) / ads.length) * 100)}%</span> */}
      </div>
    </div>
  );
};

export default AdScroll;
