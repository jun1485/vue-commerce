<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- 상품을 찾을 수 없는 경우 -->
    <div
      v-else-if="!product"
      class="flex flex-col items-center justify-center min-h-screen"
    >
      <div class="text-gray-400 mb-4">
        <svg
          class="mx-auto h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.901-6.071 2.379C5.484 17.706 5.484 18 6 18h12c.516 0 .516-.294.071-.621zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        상품을 찾을 수 없습니다
      </h2>
      <p class="text-gray-600 mb-4">
        요청하신 상품이 존재하지 않거나 삭제되었습니다.
      </p>
      <BaseButton @click="router.push('/products')"
        >상품 목록으로 돌아가기</BaseButton
      >
    </div>

    <!-- 상품 상세 내용 -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 뒤로가기 버튼 -->
      <div class="mb-6">
        <button
          @click="router.back()"
          class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          뒤로가기
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- 이미지 갤러리 -->
        <div class="space-y-4">
          <!-- 메인 이미지 -->
          <div
            class="aspect-square bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              :src="selectedImage"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- 썸네일 이미지들 -->
          <div v-if="product.images.length > 1" class="grid grid-cols-4 gap-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = image"
              :class="[
                'aspect-square rounded-md overflow-hidden border-2 transition-all',
                selectedImage === image
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300',
              ]"
            >
              <img
                :src="image"
                :alt="`${product.name} 이미지 ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- 상품 정보 -->
        <div class="space-y-6">
          <!-- 브랜드 및 상품명 -->
          <div>
            <p class="text-sm font-medium text-blue-600 mb-1">
              {{ product.brand.name }}
            </p>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              {{ product.name }}
            </h1>
            <p v-if="product.shortDescription" class="text-lg text-gray-600">
              {{ product.shortDescription }}
            </p>
          </div>

          <!-- 평점 및 리뷰 -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <div class="flex">
                <StarIcon
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'w-5 h-5',
                    star <= Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300',
                  ]"
                />
              </div>
              <span class="ml-2 text-sm text-gray-600">
                {{ product.rating }} ({{ product.reviewCount }}개 리뷰)
              </span>
            </div>

            <!-- 카테고리 -->
            <span
              class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {{ product.category.name }}
            </span>
          </div>

          <!-- 가격 정보 -->
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <span class="text-3xl font-bold text-gray-900">
                {{ formatPrice(product.price) }}원
              </span>
              <span
                v-if="product.originalPrice"
                class="text-lg text-gray-500 line-through"
              >
                {{ formatPrice(product.originalPrice) }}원
              </span>
              <span
                v-if="product.discount"
                class="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold"
              >
                {{ product.discount }}% 할인
              </span>
            </div>

            <!-- 재고 상태 -->
            <div class="flex items-center">
              <div
                :class="[
                  'w-3 h-3 rounded-full mr-2',
                  product.inStock ? 'bg-green-500' : 'bg-red-500',
                ]"
              ></div>
              <span
                :class="[
                  'text-sm font-medium',
                  product.inStock ? 'text-green-700' : 'text-red-700',
                ]"
              >
                {{ product.inStock ? `재고 ${product.stock}개` : "품절" }}
              </span>
            </div>
          </div>

          <!-- 상품 옵션 선택 -->
          <div
            v-if="product.options && product.options.length > 0"
            class="space-y-4"
          >
            <div
              v-for="option in product.options"
              :key="option.name"
              class="space-y-2"
            >
              <label class="text-sm font-medium text-gray-700">{{
                option.name
              }}</label>
              <select
                v-model="selectedOptions[option.name]"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                :disabled="!product.inStock"
              >
                <option value="">{{ option.name }} 선택</option>
                <option
                  v-for="value in option.values"
                  :key="value"
                  :value="value"
                >
                  {{ value }}
                </option>
              </select>
            </div>
          </div>

          <!-- 수량 선택 및 장바구니 -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <label class="text-sm font-medium text-gray-700">수량</label>
              <div class="flex items-center border border-gray-300 rounded-md">
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1 || !product.inStock"
                  class="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  :max="product.stock"
                  :disabled="!product.inStock"
                  class="w-16 px-3 py-2 text-center border-0 focus:outline-none"
                />
                <button
                  @click="increaseQuantity"
                  :disabled="quantity >= product.stock || !product.inStock"
                  class="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            <!-- 액션 버튼들 -->
            <div class="flex space-x-4">
              <BaseButton
                @click="addToCart"
                :disabled="!canAddToCart"
                size="large"
                class="flex-1"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h6a1 1 0 001-1v-6m-2 6V9a1 1 0 00-1-1H9a1 1 0 00-1 1v10.02"
                  />
                </svg>
                장바구니 담기
              </BaseButton>

              <BaseButton
                variant="outline"
                size="large"
                @click="toggleWishlist"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </BaseButton>
            </div>
          </div>

          <!-- 상품 특징 -->
          <div
            v-if="product.features && product.features.length > 0"
            class="space-y-3"
          >
            <h3 class="text-lg font-semibold text-gray-900">주요 특징</h3>
            <ul class="space-y-2">
              <li
                v-for="feature in product.features"
                :key="feature"
                class="flex items-center text-sm text-gray-700"
              >
                <svg
                  class="w-4 h-4 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- 태그 -->
          <div v-if="product.tags && product.tags.length > 0" class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900">태그</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 상품 상세 설명 -->
      <div class="mt-12 bg-white rounded-lg shadow p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">상품 상세 정보</h2>
        <div class="prose max-w-none">
          <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { StarIcon } from "@heroicons/vue/24/solid";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useProductStore } from "@/stores/products";
import type { Product } from "@/types";

// 라우터 및 스토어
const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

// 반응형 상태
const loading = ref(true);
const product = ref<Product | null>(null);
const selectedImage = ref("");
const selectedOptions = ref<Record<string, string>>({});
const quantity = ref(1);

// 가격 포맷팅 함수
const formatPrice = (price: number): string => {
  return price.toLocaleString("ko-KR");
};

// 장바구니 추가 가능 여부
const canAddToCart = computed(() => {
  if (!product.value || !product.value.inStock || quantity.value < 1) {
    return false;
  }

  // 모든 필수 옵션이 선택되었는지 확인
  if (product.value.options) {
    return product.value.options.every(
      (option) => selectedOptions.value[option.name]
    );
  }

  return true;
});

// 수량 조절 함수
const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// 장바구니 추가 함수
const addToCart = () => {
  if (!canAddToCart.value || !product.value) return;

  console.log("장바구니 추가:", {
    product: product.value,
    quantity: quantity.value,
    selectedOptions: selectedOptions.value,
  });

  alert(`${product.value.name}이(가) 장바구니에 추가되었습니다!`);
};

// 위시리스트 토글 함수
const toggleWishlist = () => {
  console.log("위시리스트 토글");
};

// 상품 로딩 함수
const loadProduct = async () => {
  loading.value = true;

  try {
    const slug = route.params.slug as string;
    const foundProduct = productStore.getProductBySlug(slug);

    if (foundProduct) {
      product.value = foundProduct;
      selectedImage.value = foundProduct.image;

      // 옵션을 빈 상태로 초기화
      if (foundProduct.options) {
        selectedOptions.value = {};
        foundProduct.options.forEach((option) => {
          selectedOptions.value[option.name] = "";
        });
      }
    } else {
      product.value = null;
    }
  } catch (error) {
    console.error("상품 로딩 실패:", error);
    product.value = null;
  } finally {
    loading.value = false;
  }
};

// 라우트 변경 감지
watch(
  () => route.params.slug,
  () => {
    if (route.params.slug) {
      loadProduct();
    }
  },
  { immediate: true }
);

// // 페이지 로드 시 실행
// loadProduct();
</script>
