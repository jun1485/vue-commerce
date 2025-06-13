// 공통 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// 카테고리 타입
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

// 브랜드 타입
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

// 상품 옵션 타입
export interface ProductOption {
  name: string; // 예: "색상", "사이즈"
  values: string[]; // 예: ["빨강", "파랑"], ["S", "M", "L"]
}

// 확장된 상품 타입
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: Category;
  brand: Brand;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription?: string;
  inStock: boolean;
  stock: number;
  options?: ProductOption[];
  tags?: string[];
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

// 검색 및 필터 타입
export interface ProductFilter {
  categoryIds?: string[];
  brandIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  tags?: string[];
}

export interface ProductSort {
  field: "price" | "rating" | "name" | "createdAt";
  direction: "asc" | "desc";
}

export interface ProductSearchParams {
  query?: string;
  filter?: ProductFilter;
  sort?: ProductSort;
  page: number;
  limit: number;
}

export interface NavigationItem {
  label: string;
  path: string;
  children?: NavigationItem[];
}

// 컴포넌트 Props 타입들
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
}

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export interface ModalProps {
  show: boolean;
  title?: string;
  size?: "small" | "medium" | "large";
  closable?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
