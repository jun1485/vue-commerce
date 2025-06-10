<template>
  <div class="app-layout">
    <!-- 헤더 -->
    <AppHeader />

    <!-- 메인 콘텐츠 영역 -->
    <main class="main-content">
      <slot />
    </main>

    <!-- 푸터 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
}

/* 전역 스타일 리셋 (scoped가 아닌 전역에 적용될 스타일) */
</style>

<!-- 전역 스타일 -->
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9fafb;
}

#app {
  min-height: 100vh;
}

/* 스크롤바 스타일링 (WebKit 브라우저) */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 포커스 스타일 통일 */
*:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 링크 기본 스타일 */
a {
  color: #3b82f6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 버튼 기본 스타일 리셋 */
button {
  font-family: inherit;
}

/* 이미지 반응형 */
img {
  max-width: 100%;
  height: auto;
}

/* 유틸리티 클래스들 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.mb-0 {
  margin-bottom: 0;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-5 {
  margin-bottom: 1.25rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}

.mt-0 {
  margin-top: 0;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-5 {
  margin-top: 1.25rem;
}
.mt-6 {
  margin-top: 1.5rem;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-2 {
  gap: 0.5rem;
}
.gap-3 {
  gap: 0.75rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-6 {
  gap: 1.5rem;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (min-width: 640px) {
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .sm\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .sm\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .md\:grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .lg\:grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .lg\:grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>
