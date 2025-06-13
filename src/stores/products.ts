import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  Product,
  Category,
  Brand,
  ProductFilter,
  ProductSort,
} from "@/types";
import { mockProducts, mockCategories, mockBrands } from "@/data/mockData";

export const useProductStore = defineStore("products", () => {
  // 상태 관리 (모크 데이터 사용)
  const products = ref<Product[]>(mockProducts);
  const categories = ref<Category[]>(mockCategories);
  const brands = ref<Brand[]>(mockBrands);

  // 로딩 상태 (세분화)
  const loading = ref({
    products: false,
    categories: false,
    brands: false,
    singleProduct: false,
  });

  const error = ref<string | null>(null);

  // 필터 및 페이지네이션 상태
  const currentFilter = ref<ProductFilter>({});
  const currentSort = ref<ProductSort>({
    field: "createdAt",
    direction: "desc",
  });
  const currentPage = ref(1);
  const itemsPerPage = ref(12);
  const totalItems = ref(0);
  const totalPages = ref(0);

  // 계산된 속성들
  const filteredProducts = computed(() => {
    return products.value;
  });

  const paginatedProducts = computed(() => {
    return products.value;
  });

  // 액션들 (모크 데이터 사용)
  const fetchProducts = async () => {
    // 이미 모크 데이터가 로드되어 있음
    return Promise.resolve();
  };

  const fetchCategories = async () => {
    // 이미 모크 데이터가 로드되어 있음
    return Promise.resolve();
  };

  const fetchBrands = async () => {
    // 이미 모크 데이터가 로드되어 있음
    return Promise.resolve();
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    return products.value.find((product) => product.id === id) || null;
  };

  const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
    return products.value.find((product) => product.slug === slug) || null;
  };

  const searchProductsAction = async (query: string) => {
    // 검색 기능은 필요시 구현
    return Promise.resolve();
  };

  const setFilter = async (filter: ProductFilter) => {
    currentFilter.value = filter;
    currentPage.value = 1;
  };

  const setSort = async (sort: ProductSort) => {
    currentSort.value = sort;
    currentPage.value = 1;
  };

  const setPage = async (page: number) => {
    currentPage.value = page;
  };

  // 동기 메서드들
  const getProductById = (id: string): Product | undefined => {
    return products.value.find((product) => product.id === id);
  };

  const getProductBySlug = (slug: string): Product | undefined => {
    return products.value.find((product) => product.slug === slug);
  };

  const getProductByIdFromCache = (id: string): Product | undefined => {
    return products.value.find((product) => product.id === id);
  };

  const getProductBySlugFromCache = (slug: string): Product | undefined => {
    return products.value.find((product) => product.slug === slug);
  };

  const getCategoryById = (id: string): Category | undefined => {
    return categories.value.find((category) => category.id === id);
  };

  const getBrandById = (id: string): Brand | undefined => {
    return brands.value.find((brand) => brand.id === id);
  };

  // 초기 데이터 로드
  const initializeStore = async () => {
    await Promise.all([fetchProducts(), fetchCategories(), fetchBrands()]);
  };

  return {
    // 상태
    products,
    categories,
    brands,
    loading,
    error,
    currentFilter,
    currentSort,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,

    // 계산된 속성
    filteredProducts,
    paginatedProducts,

    // 액션
    fetchProducts,
    fetchCategories,
    fetchBrands,
    fetchProductById,
    fetchProductBySlug,
    searchProductsAction,
    setFilter,
    setSort,
    setPage,
    getProductById,
    getProductBySlug,
    getProductByIdFromCache,
    getProductBySlugFromCache,
    getCategoryById,
    getBrandById,
    initializeStore,
  };
});
