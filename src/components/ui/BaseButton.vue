<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <!-- 로딩 스피너 -->
    <div v-if="loading" class="spinner"></div>

    <!-- 슬롯으로 버튼 내용 -->
    <slot v-if="!loading" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "@/types";

interface Props extends ButtonProps {}

// props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "medium",
  disabled: false,
  loading: false,
});

// 이벤트 정의
defineEmits<{
  click: [event: MouseEvent];
}>();

// 버튼 클래스 동적 계산
const buttonClasses = computed(() => [
  "base-button",
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    "base-button--disabled": props.disabled,
    "base-button--loading": props.loading,
  },
]);
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  text-decoration: none;
}

/* 사이즈 변형 */
.base-button--small {
  padding: 6px 12px;
  font-size: 14px;
  height: 32px;
}

.base-button--medium {
  padding: 8px 16px;
  font-size: 16px;
  height: 40px;
}

.base-button--large {
  padding: 12px 24px;
  font-size: 18px;
  height: 48px;
}

/* 색상 변형 */
.base-button--primary {
  background-color: #3b82f6;
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.base-button--secondary {
  background-color: #6b7280;
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.base-button--outline {
  background-color: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.base-button--outline:hover:not(:disabled) {
  background-color: #3b82f6;
  color: white;
}

.base-button--text {
  background-color: transparent;
  color: #3b82f6;
  padding: 4px 8px;
}

.base-button--text:hover:not(:disabled) {
  background-color: #f3f4f6;
}

/* 상태 */
.base-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button--loading {
  cursor: not-allowed;
}

/* 로딩 스피너 */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
