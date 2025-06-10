<template>
  <header class="app-header">
    <div class="header-container">
      <!-- 로고 -->
      <div class="header-logo">
        <router-link to="/" class="logo-link">
          <h1 class="logo-text">Vue Commerce</h1>
        </router-link>
      </div>

      <!-- 검색바 -->
      <div class="header-search">
        <BaseInput
          v-model="searchQuery"
          type="search"
          placeholder="상품을 검색해보세요..."
          @keyup.enter="handleSearch"
        >
          <template #append>
            <button class="search-button" @click="handleSearch">🔍</button>
          </template>
        </BaseInput>
      </div>

      <!-- 네비게이션 및 유틸리티 -->
      <div class="header-actions">
        <!-- 주요 네비게이션 -->
        <nav class="header-nav">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <!-- 유틸리티 버튼들 -->
        <div class="header-utils">
          <!-- 장바구니 -->
          <button class="util-button cart-button" @click="goToCart">
            🛒
            <span v-if="cartItemCount > 0" class="cart-badge">
              {{ cartItemCount }}
            </span>
          </button>

          <!-- 찜한 상품 -->
          <button class="util-button" @click="goToWishlist">❤️</button>

          <!-- 사용자 메뉴 -->
          <div class="user-menu">
            <button class="util-button user-button" @click="toggleUserMenu">
              👤
            </button>

            <!-- 사용자 드롭다운 메뉴 -->
            <div v-if="showUserMenu" class="user-dropdown">
              <router-link to="/login" class="dropdown-item"
                >로그인</router-link
              >
              <router-link to="/signup" class="dropdown-item"
                >회원가입</router-link
              >
              <router-link to="/mypage" class="dropdown-item"
                >마이페이지</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 모바일 메뉴 버튼 -->
      <button class="mobile-menu-button" @click="toggleMobileMenu">☰</button>
    </div>

    <!-- 모바일 메뉴 -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <div class="mobile-search">
        <BaseInput
          v-model="searchQuery"
          type="search"
          placeholder="상품 검색..."
          @keyup.enter="handleSearch"
        />
      </div>

      <nav class="mobile-nav">
        <router-link
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "@/components/ui/BaseInput.vue";
import type { NavigationItem } from "@/types";

// 반응형 상태
const searchQuery = ref("");
const showUserMenu = ref(false);
const showMobileMenu = ref(false);

// 라우터
const router = useRouter();

// 네비게이션 아이템들
const navigationItems: NavigationItem[] = [
  { label: "전체상품", path: "/products" },
  { label: "카테고리", path: "/categories" },
  { label: "베스트", path: "/best" },
  { label: "세일", path: "/sale" },
];

// 장바구니 아이템 수 (임시로 하드코딩, 나중에 스토어에서 가져올 예정)
const cartItemCount = computed(() => 0);

// 검색 기능
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/search",
      query: { q: searchQuery.value.trim() },
    });
  }
};

// 네비게이션 함수들
const goToCart = () => {
  router.push("/cart");
};

const goToWishlist = () => {
  router.push("/wishlist");
};

// 메뉴 토글 함수들
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showMobileMenu.value = false;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  showUserMenu.value = false;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

// 클릭 외부 감지로 메뉴 닫기 (추후 구현 예정)
</script>

<style scoped>
.app-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 24px;
}

/* 로고 */
.header-logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #3b82f6;
  margin: 0;
}

/* 검색바 */
.header-search {
  flex: 1;
  max-width: 400px;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
}

/* 네비게이션과 액션들 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #3b82f6;
  background-color: #f3f4f6;
}

/* 유틸리티 버튼들 */
.header-utils {
  display: flex;
  align-items: center;
  gap: 8px;
}

.util-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
}

.util-button:hover {
  background-color: #f3f4f6;
}

/* 장바구니 배지 */
.cart-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 사용자 메뉴 */
.user-menu {
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 120px;
  z-index: 10;
}

.dropdown-item {
  display: block;
  color: #374151;
  text-decoration: none;
  padding: 8px 16px;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

/* 모바일 메뉴 버튼 */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}

/* 모바일 메뉴 */
.mobile-menu {
  display: none;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 16px;
}

.mobile-search {
  margin-bottom: 16px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-nav-link {
  color: #374151;
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .header-nav,
  .header-utils {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .header-search {
    display: none;
  }
}

@media (max-width: 1024px) {
  .header-nav {
    display: none;
  }
}
</style>
