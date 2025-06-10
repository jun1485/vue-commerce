<template>
  <div class="home-page">
    <!-- 히어로 섹션 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Vue Commerce에 오신 것을 환영합니다</h1>
        <p class="hero-description">최고의 상품을 합리적인 가격에 만나보세요</p>
        <div class="hero-actions">
          <BaseButton size="large" @click="goToProducts">
            상품 둘러보기
          </BaseButton>
          <BaseButton variant="outline" size="large" @click="goToSale">
            세일 상품 보기
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- 카테고리 섹션 -->
    <section class="categories-section">
      <h2 class="section-title">인기 카테고리</h2>
      <div class="categories-grid">
        <BaseCard
          v-for="category in categories"
          :key="category.id"
          hover
          clickable
          @click="goToCategory(category.id)"
          class="category-card"
        >
          <div class="category-content">
            <div class="category-icon">{{ category.icon }}</div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-description">{{ category.description }}</p>
          </div>
        </BaseCard>
      </div>
    </section>

    <!-- 특징 섹션 -->
    <section class="features-section">
      <h2 class="section-title">왜 Vue Commerce를 선택해야 할까요?</h2>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.id" class="feature-item">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 테스트 모달 버튼 -->
    <section class="demo-section">
      <h2 class="section-title">UI 컴포넌트 데모</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h3>버튼 컴포넌트</h3>
          <div class="button-demo">
            <BaseButton variant="primary">Primary</BaseButton>
            <BaseButton variant="secondary">Secondary</BaseButton>
            <BaseButton variant="outline">Outline</BaseButton>
            <BaseButton variant="text">Text</BaseButton>
          </div>
        </div>

        <div class="demo-item">
          <h3>입력 컴포넌트</h3>
          <div class="input-demo">
            <BaseInput
              v-model="demoInput"
              label="이름"
              placeholder="이름을 입력하세요"
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

        <div class="demo-item">
          <h3>모달 컴포넌트</h3>
          <BaseButton @click="showModal = true">모달 열기</BaseButton>
        </div>
      </div>
    </section>

    <!-- 테스트 모달 -->
    <BaseModal
      v-model:show="showModal"
      title="데모 모달"
      @close="showModal = false"
    >
      <p>이것은 테스트용 모달입니다!</p>
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

<style scoped>
.home-page {
  padding: 0;
}

/* 히어로 섹션 */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  margin: -20px -16px 40px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 32px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 섹션 공통 스타일 */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
  color: #1f2937;
}

/* 카테고리 섹션 */
.categories-section {
  margin-bottom: 80px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.category-card {
  height: 100%;
}

.category-content {
  text-align: center;
  padding: 16px;
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.category-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}

.category-description {
  color: #6b7280;
  margin: 0;
}

/* 특징 섹션 */
.features-section {
  margin-bottom: 80px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.feature-item {
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}

.feature-description {
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

/* 데모 섹션 */
.demo-section {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.demo-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
}

.button-demo {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .categories-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .demo-grid {
    grid-template-columns: 1fr;
  }

  .button-demo {
    flex-direction: column;
  }
}
</style>
