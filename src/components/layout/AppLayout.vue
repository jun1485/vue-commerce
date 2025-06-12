<template>
  <div class="min-h-screen flex flex-col">
    <!-- 헤더 -->
    <AppHeader />

    <!-- 메인 콘텐츠 영역 -->
    <main class="flex-1 py-8 max-w-6xl mx-auto w-full px-4">
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
