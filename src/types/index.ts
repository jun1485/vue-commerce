// 공통 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
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
