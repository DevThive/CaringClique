import React, { useState, useEffect } from "react";
import axios from "axios";

const defaultProducts = [
  {
    id: 1,
    name: "대체 상품 1",
    price: "10,000원",
    img: "/placeholder1.jpg",
  },
  {
    id: 2,
    name: "대체 상품 2",
    price: "20,000원",
    img: "/placeholder2.jpg",
  },
  {
    id: 3,
    name: "대체 상품 3",
    price: "30,000원",
    img: "/placeholder3.jpg",
  },
];

const NewPopular = () => {
  const [activeTab, setActiveTab] = useState("latest");
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products?tab=${activeTab}`);
        setProducts(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 연결이 실패했을 때 기본 데이터를 설정
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-3xl font-bold mb-4">최신글 / 인기글</h2>
        <ul>
          <li className="mb-2">
            <button
              className={`btn w-full py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                activeTab === "latest"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-transparent text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-lg"
              }`}
              onClick={() => setActiveTab("latest")}
            >
              최신글
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`btn w-full py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                activeTab === "popular"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-transparent text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-lg"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              인기글
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 text-center"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <h3 className="font-bold">{product.name}</h3>
                {/* <p className="text-orange-500">{product.price}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPopular;
