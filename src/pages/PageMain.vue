<template>
  <div class="px-0">
    <!-- 히어로 섹션 -->
    <section
      class="bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 text-white py-20 text-center -mx-4 mb-16 md:py-24"
    >
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Vue Commerce에 오신 것을 환영합니다
        </h1>
        <p class="text-lg md:text-xl mb-8 opacity-90">
          최고의 쇼핑 경험을 위한 현대적인 이커머스 플랫폼
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton size="large" @click="goToProducts">
            상품 둘러보기
          </BaseButton>
          <BaseButton
            variant="outline"
            size="large"
            @click="goToSale"
            class="!text-white !border-white hover:!bg-white hover:!text-purple-700"
          >
            특가 상품 보기
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- 카테고리 섹션 -->
    <section class="mb-16">
      <h2
        class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
      >
        인기 카테고리
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <BaseCard
          v-for="category in categories"
          :key="category.id"
          hover
          clickable
          @click="goToCategory(category.id)"
          class="text-center p-6 cursor-pointer transform hover:scale-105 transition-transform duration-200"
        >
          <div class="text-4xl mb-4">{{ category.icon }}</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-800">
            {{ category.name }}
          </h3>
          <p class="text-gray-600">{{ category.description }}</p>
        </BaseCard>
      </div>
    </section>

    <!-- 특징 섹션 -->
    <section class="mb-16">
      <h2
        class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
      >
        왜 Vue Commerce를 선택해야 할까요?
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="text-center p-6"
        >
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold mb-3 text-gray-800">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- UI 컴포넌트 데모 섹션 -->
    <section class="bg-white p-8 rounded-xl shadow-lg mb-16">
      <h2
        class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
      >
        UI 컴포넌트 데모
      </h2>

      <div class="space-y-8">
        <!-- 버튼 데모 -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-gray-700">
            버튼 컴포넌트
          </h3>
          <div class="flex flex-wrap gap-4">
            <BaseButton variant="primary">Primary</BaseButton>
            <BaseButton variant="secondary">Secondary</BaseButton>
            <BaseButton variant="outline">Outline</BaseButton>
            <BaseButton variant="text">Text</BaseButton>
            <BaseButton variant="primary" size="small">Small</BaseButton>
            <BaseButton variant="primary" size="large">Large</BaseButton>
            <BaseButton variant="primary" loading>Loading</BaseButton>
            <BaseButton variant="primary" disabled>Disabled</BaseButton>
          </div>
        </div>

        <!-- 입력 필드 데모 -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-gray-700">
            입력 필드 컴포넌트
          </h3>
          <div class="grid md:grid-cols-2 gap-4 max-w-2xl">
            <BaseInput
              v-model="demoInput"
              label="기본 입력"
              placeholder="텍스트를 입력하세요"
              hint="도움말 텍스트입니다"
            />
            <BaseInput
              v-model="demoEmail"
              type="email"
              label="이메일"
              placeholder="email@example.com"
              :error="emailError"
            />
          </div>
        </div>

        <!-- 모달 데모 -->
        <div>
          <h3 class="text-xl font-semibold mb-4 text-gray-700">
            모달 컴포넌트
          </h3>
          <BaseButton @click="showModal = true">모달 열기</BaseButton>
        </div>
      </div>
    </section>

    <!-- 데모 모달 -->
    <BaseModal :show="showModal" title="데모 모달" @close="showModal = false">
      <p class="mb-4">이것은 테스트용 모달입니다!</p>
      <p>Vue 3의 Teleport 기능을 사용하여 body에 렌더링됩니다.</p>

      <template #footer>
        <BaseButton variant="outline" @click="showModal = false">
          취소
        </BaseButton>
        <BaseButton @click="showModal = false"> 확인 </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseModal from "@/components/ui/BaseModal.vue";

// 라우터
const router = useRouter();

// 반응형 상태
const showModal = ref(false);
const demoInput = ref("");
const demoEmail = ref("");

// 이메일 유효성 검사
const emailError = computed(() => {
  if (!demoEmail.value) return "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(demoEmail.value)
    ? ""
    : "올바른 이메일 형식이 아닙니다";
});

// 카테고리 데이터
const categories = [
  {
    id: "fashion",
    name: "패션",
    description: "트렌디한 의류와 액세서리",
    icon: "👗",
  },
  {
    id: "electronics",
    name: "전자제품",
    description: "최신 IT 기기와 가전제품",
    icon: "📱",
  },
  {
    id: "beauty",
    name: "뷰티",
    description: "화장품과 스킨케어 제품",
    icon: "💄",
  },
  {
    id: "home",
    name: "홈 & 리빙",
    description: "인테리어와 생활용품",
    icon: "🏠",
  },
  {
    id: "sports",
    name: "스포츠",
    description: "운동용품과 아웃도어 장비",
    icon: "⚽",
  },
  {
    id: "books",
    name: "도서",
    description: "다양한 장르의 책과 e-book",
    icon: "📚",
  },
];

// 특징 데이터
const features = [
  {
    id: 1,
    title: "빠른 배송",
    description: "전국 당일/익일 배송 서비스로 빠르게 받아보세요",
    icon: "🚚",
  },
  {
    id: 2,
    title: "안전한 결제",
    description: "다양한 결제 수단과 보안 시스템으로 안전하게",
    icon: "🔒",
  },
  {
    id: 3,
    title: "품질 보장",
    description: "엄선된 상품만을 제공하며 품질을 보장합니다",
    icon: "✅",
  },
  {
    id: 4,
    title: "고객 지원",
    description: "24/7 고객센터에서 언제든지 도움을 드립니다",
    icon: "💬",
  },
];

// 네비게이션 함수들
const goToProducts = () => {
  router.push("/products");
};

const goToSale = () => {
  router.push("/sale");
};

const goToCategory = (categoryId: string) => {
  router.push(`/category/${categoryId}`);
};
</script>
