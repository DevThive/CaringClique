import { useEffect, useState } from 'react';
import axios from 'axios';

const NewPopular = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('latest');
  const [currentIndex, setCurrentIndex] = useState(0);

  const posts = activeTab === 'latest' ? latestPosts : popularPosts;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestResponse = await axios.get('/api/latest-posts'); // 최신글 API
        const popularResponse = await axios.get('/api/popular-posts'); // 인기글 API

        setLatestPosts(latestResponse.data);
        setPopularPosts(popularResponse.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        // 오류 발생 시 임의의 데이터 설정
        setLatestPosts([
          { id: 1, title: "임의의 최신글 제목 1", excerpt: "임의의 최신글 내용 1" },
          { id: 2, title: "임의의 최신글 제목 2", excerpt: "임의의 최신글 내용 2" },
          { id: 3, title: "임의의 최신글 제목 3", excerpt: "임의의 최신글 내용 3" },
        ]);
        setPopularPosts([
          { id: 1, title: "임의의 인기글 제목 1", excerpt: "임의의 인기글 내용 1" },
          { id: 2, title: "임의의 인기글 제목 2", excerpt: "임의의 인기글 내용 2" },
          { id: 3, title: "임의의 인기글 제목 3", excerpt: "임의의 인기글 내용 3" },
        ]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(posts.length / 3)); // 3개씩 보여주기
    }, 5000); // 5초마다 슬라이드 변경

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 클리어
  }, [posts.length]);

  return (
    <div className="flex flex-col">
      <div className="tabs justify-center mb-4">
        <a
          className={`tab tab-lifted ${activeTab === 'latest' ? 'tab-active' : ''}`}
          onClick={() => {
            setActiveTab('latest');
            setCurrentIndex(0); // 인덱스 초기화
          }}
        >
          최신글
        </a>
        <a
          className={`tab tab-lifted ${activeTab === 'popular' ? 'tab-active' : ''}`}
          onClick={() => {
            setActiveTab('popular');
            setCurrentIndex(0); // 인덱스 초기화
          }}
        >
          인기글
        </a>
      </div>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {posts.map((post) => (
            <div key={post.id} className="card bg-transparent border border-gray-300 shadow-none m-1 flex-shrink-0 w-1/3">
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-outline btn-primary">자세히 보기</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 슬라이드 네비게이션 */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(posts.length / 3) }).map((_, index) => (
          <button
            key={index}
            className={`btn btn-xs ${currentIndex === index ? 'btn-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewPopular;
