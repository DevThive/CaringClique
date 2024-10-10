"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AdScroll from "../components/AdScroll";
import NewPopular from "@/components/NewPopular";

const Home = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [popularPosts, setPopularPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularResponse = await axios.get("/api/popular-posts");
        const latestResponse = await axios.get("/api/latest-posts");
        const announcementsResponse = await axios.get("/api/announcements");

        setPopularPosts(popularResponse.data);
        setLatestPosts(latestResponse.data);
        setAnnouncements(announcementsResponse.data);
      } catch (err) {
        console.error("데이터를 불러오는 데 실패했습니다.", err);

        // 임의의 데이터 설정
        setPopularPosts([
          {
            id: 1,
            title: "임의 인기글 1",
            content: "임의 인기글 1의 내용입니다.",
          },
          {
            id: 2,
            title: "임의 인기글 2",
            content: "임의 인기글 2의 내용입니다.",
          },
        ]);
        setLatestPosts([
          {
            id: 1,
            title: "임의 최신글 1",
            content: "임의 최신글 1의 내용입니다.",
          },
          {
            id: 2,
            title: "임의 최신글 2",
            content: "임의 최신글 2의 내용입니다.",
          },
        ]);
        setAnnouncements([
          { id: 1, message: "임의 공지사항 1: 중요한 내용입니다." },
          { id: 2, message: "임의 공지사항 2: 다음 회의 일정입니다." },
        ]);
      }
    };

    fetchData();
  }, []);
  const posts = activeTab === "popular" ? popularPosts : latestPosts;

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="container mx-auto">
        <AdScroll />

        {/* <div className="mb-4 flex justify-center space-x-4">
          <button
            className={`btn ${
              activeTab === "popular" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            인기글
          </button>
          <button
            className={`btn ${
              activeTab === "latest" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveTab("latest")}
          >
            최신글
          </button>
        </div> */}
        <NewPopular />

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="card bg-white shadow-md rounded-lg">
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p>{post.content}</p>
              </div>
            </div>
          ))}
        </div> */}

        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold">공지사항</h2>
          <ul className="space-y-2">
            {announcements.map((ann) => (
              <li key={ann.id} className="text-gray-700">
                {ann.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
