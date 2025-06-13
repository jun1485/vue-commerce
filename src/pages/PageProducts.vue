<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">상품 목록</h1>
        <p class="mt-2 text-gray-600">다양한 브랜드의 최신 상품을 만나보세요</p>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 사이드바 필터 (나중에 구현) -->
        <aside class="lg:w-64">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">필터</h3>
            <p class="text-sm text-gray-500">
              필터 기능은 다음 단계에서 구현예정
            </p>
          </div>
        </aside>

        <!-- 상품 목록 영역 -->
        <main class="flex-1">
          <!-- 정렬 및 결과 정보 -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-gray-700">
              총
              <span class="font-semibold">{{
                productStore.filteredProducts.length
              }}</span
              >개 상품
            </p>

            <div class="flex items-center space-x-4">
              <label for="sort" class="text-sm font-medium text-gray-700"
                >정렬:</label
              >
              <select
                id="sort"
                v-model="selectedSort"
                @change="handleSortChange"
                class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt-desc">최신순</option>
                <option value="price-asc">가격 낮은순</option>
                <option value="price-desc">가격 높은순</option>
                <option value="rating-desc">평점 높은순</option>
                <option value="name-asc">이름순</option>
              </select>
            </div>
          </div>

          <!-- 로딩 상태 -->
          <div v-if="productStore.loading" class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            ></div>
            <p class="mt-2 text-gray-600">상품을 불러오는 중...</p>
          </div>

          <!-- 에러 상태 -->
          <div v-else-if="productStore.error" class="text-center py-12">
            <p class="text-red-600">{{ productStore.error }}</p>
          </div>

          <!-- 상품 그리드 -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <ProductCard
              v-for="product in productStore.paginatedProducts"
              :key="product.id"
              :product="product"
              @click="handleProductClick"
            />
          </div>

          <!-- 빈 상태 -->
          <div
            v-if="
              !productStore.loading &&
              !productStore.error &&
              productStore.paginatedProducts.length === 0
            "
            class="text-center py-12"
          >
            <div class="text-gray-400 mb-4">
              <svg
                class="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4v4H7V9h10z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              상품이 없습니다
            </h3>
            <p class="text-gray-500">검색 조건을 변경해보세요.</p>
          </div>
          <!-- 페이지네이션 -->
          <div
            v-if="productStore.totalPages > 1"
            class="mt-8 flex justify-center"
          >
            <nav class="flex items-center space-x-2">
              <!-- 이전 페이지 -->
              <button
                :disabled="productStore.currentPage === 1"
                @click="handlePageChange(productStore.currentPage - 1)"
                class="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                이전
              </button>

              <!-- 페이지 번호들 -->
              <button
                v-for="page in pageNumbers"
                :key="page"
                @click="handlePageChange(page)"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium border',
                  page === productStore.currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>

              <!-- 다음 페이지 -->
              <button
                :disabled="productStore.currentPage === productStore.totalPages"
                @click="handlePageChange(productStore.currentPage + 1)"
                class="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                다음
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/products";
import type { ProductSort } from "@/types";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ProductCard from "@/components/ui/ProductCard.vue";

const router = useRouter();
const productStore = useProductStore();

const selectedSort = ref("createdAt-desc");

const pageNumbers = computed(() => {
  const current = productStore.currentPage;
  const total = productStore.totalPages;
  const delta = 2;

  let start = Math.max(1, current - delta);
  let end = Math.min(total, current + delta);

  if (end - start < delta * 2) {
    if (start === 1) {
      end = Math.min(total, delta * 2 + 1);
    } else if (end === total) {
      start = Math.max(1, total - delta * 2);
    }
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const handleSortChange = () => {
  const [field, direction] = selectedSort.value.split("-") as [
    ProductSort["field"],
    ProductSort["direction"]
  ];

  productStore.setSort({ field, direction });
};

const handlePageChange = (page: number) => {
  productStore.setPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleProductClick = (product: any) => {
  router.push(`/products/${product.slug}`);
};
</script>

<style scoped></style>
