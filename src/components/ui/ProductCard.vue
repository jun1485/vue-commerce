<template>
  <BaseCard
    :hover="true"
    :clickable="true"
    class="group overflow-hidden"
    @click="handleClick"
  >
    <!-- 상품 이미지 -->
    <div class="relative overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />

      <!-- 할인 배지 -->
      <div
        v-if="product.discount"
        class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
      >
        {{ product.discount }}% 할인
      </div>

      <!-- 재고 부족 오버레이 -->
      <div
        v-if="!product.inStock"
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <span class="text-white font-semibold">품절</span>
      </div>
    </div>

    <!-- 상품 정보 -->
    <div class="p-4">
      <!-- 브랜드 -->
      <p class="text-sm text-gray-500 mb-1">{{ product.brand.name }}</p>

      <!-- 상품명 -->
      <h3
        class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
      >
        {{ product.name }}
      </h3>

      <!-- 짧은 설명 -->
      <p
        v-if="product.shortDescription"
        class="text-sm text-gray-600 mb-3 line-clamp-1"
      >
        {{ product.shortDescription }}
      </p>

      <!-- 평점 및 리뷰 -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <!-- 별점 표시 -->
          <div class="flex">
            <StarIcon
              v-for="star in 5"
              :key="star"
              :class="[
                'w-4 h-4',
                star <= Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300',
              ]"
            />
          </div>
          <span class="ml-1 text-sm text-gray-600">
            {{ product.rating }} ({{ product.reviewCount }})
          </span>
        </div>
      </div>

      <!-- 가격 정보 -->
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-lg font-bold text-gray-900">
              {{ formatPrice(product.price) }}원
            </span>
            <span
              v-if="product.originalPrice"
              class="text-sm text-gray-500 line-through"
            >
              {{ formatPrice(product.originalPrice) }}원
            </span>
          </div>

          <!-- 카테고리 태그 -->
          <div class="mt-2">
            <span
              class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {{ product.category.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Product } from "@/types";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  click: [Product];
}>();

const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR");
};

const handleClick = () => {
  emit("click", props.product);
};
</script>

<style scoped>
/* 텍스트 말줄임 클래스 */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
