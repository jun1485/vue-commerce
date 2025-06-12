<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 로딩 스피너 -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- 버튼 텍스트 -->
    <slot />
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
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

/**
 * 버튼 클릭 이벤트 핸들러
 * 로딩 중이거나 비활성화된 경우 이벤트를 무시
 */
const handleClick = (event: MouseEvent) => {
  if (!props.loading && !props.disabled) {
    emit("click", event);
  }
};

/**
 * 버튼 스타일 계산
 * variant, size, disabled, loading 상태에 따라 클래스 조합
 */
const buttonClasses = computed(() => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // 크기별 클래스
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  // 변형별 클래스
  const variantClasses = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    text: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  };

  // 상태별 클래스
  const stateClasses =
    props.disabled || props.loading
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer";

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    stateClasses,
  ].join(" ");
});
</script>
