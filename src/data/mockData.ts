import type { Product, Category, Brand } from "@/types";

// Mock 카테고리 데이터
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "의류",
    slug: "clothing",
    description: "패션 의류",
    children: [
      { id: "1-1", name: "상의", slug: "tops", parentId: "1" },
      { id: "1-2", name: "하의", slug: "bottoms", parentId: "1" },
      { id: "1-3", name: "아우터", slug: "outerwear", parentId: "1" },
    ],
  },
  {
    id: "2",
    name: "신발",
    slug: "shoes",
    description: "각종 신발류",
  },
  {
    id: "3",
    name: "액세서리",
    slug: "accessories",
    description: "패션 액세서리",
  },
];

// Mock 브랜드 데이터
export const mockBrands: Brand[] = [
  { id: "1", name: "Nike", slug: "nike" },
  { id: "2", name: "Adidas", slug: "adidas" },
  { id: "3", name: "Zara", slug: "zara" },
  { id: "4", name: "H&M", slug: "hm" },
  { id: "5", name: "Uniqlo", slug: "uniqlo" },
];

// Mock 상품 데이터
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    price: 129000,
    originalPrice: 159000,
    discount: 19,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
    ],
    category: mockCategories[1], // 신발
    brand: mockBrands[0], // Nike
    rating: 4.5,
    reviewCount: 128,
    description: "클래식한 디자인의 Nike Air Max 90 운동화입니다.",
    shortDescription: "편안하고 스타일리시한 운동화",
    inStock: true,
    stock: 50,
    options: [
      { name: "사이즈", values: ["240", "250", "260", "270", "280"] },
      { name: "색상", values: ["화이트", "블랙", "그레이"] },
    ],
    tags: ["운동화", "캐주얼", "스포츠"],
    features: ["에어 쿠셔닝", "내구성 좋은 소재", "미끄럼 방지"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "Zara 오버사이즈 셔츠",
    slug: "zara-oversized-shirt",
    price: 45000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    ],
    category: mockCategories[0].children![0], // 의류 > 상의
    brand: mockBrands[2], // Zara
    rating: 4.2,
    reviewCount: 89,
    description: "트렌디한 오버사이즈 핏의 셔츠입니다.",
    shortDescription: "모던한 스타일의 셔츠",
    inStock: true,
    stock: 25,
    options: [
      { name: "사이즈", values: ["S", "M", "L", "XL"] },
      { name: "색상", values: ["화이트", "블루", "그린"] },
    ],
    tags: ["셔츠", "캐주얼", "오버사이즈"],
    features: ["부드러운 원단", "오버사이즈 핏", "세련된 디자인"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    name: "Adidas 트랙팬츠",
    slug: "adidas-track-pants",
    price: 69000,
    originalPrice: 89000,
    discount: 22,
    image: "https://images.unsplash.com/photo-1506629905537-0ce839d2819d?w=400",
    images: [
      "https://images.unsplash.com/photo-1506629905537-0ce839d2819d?w=400",
    ],
    category: mockCategories[0].children![1], // 의류 > 하의
    brand: mockBrands[1], // Adidas
    rating: 4.7,
    reviewCount: 156,
    description: "편안한 착용감의 Adidas 트랙팬츠입니다.",
    shortDescription: "스포츠 및 캐주얼웨어",
    inStock: true,
    stock: 30,
    options: [
      { name: "사이즈", values: ["S", "M", "L", "XL", "XXL"] },
      { name: "색상", values: ["블랙", "네이비", "그레이"] },
    ],
    tags: ["트랙팬츠", "스포츠웨어", "편안함"],
    features: ["신축성 좋은 원단", "드라이핏 기능", "사이드 포켓"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15"),
  },
];
