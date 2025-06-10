<template>
  <div :class="cardClasses">
    <!-- 카드 헤더 -->
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <!-- 카드 본문 -->
    <div class="card-body">
      <slot />
    </div>

    <!-- 카드 푸터 -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

interface Props {
  shadow?: "none" | "small" | "medium" | "large";
  padding?: "none" | "small" | "medium" | "large";
  hover?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  shadow: "medium",
  padding: "medium",
  hover: false,
  clickable: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const slots = useSlots();

// 카드 클래스 동적 계산
const cardClasses = computed(() => [
  "base-card",
  `base-card--shadow-${props.shadow}`,
  `base-card--padding-${props.padding}`,
  {
    "base-card--hover": props.hover,
    "base-card--clickable": props.clickable,
  },
]);

// 카드 클릭 이벤트
const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};
</script>

<style scoped>
.base-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  overflow: hidden;
}

/* 그림자 변형 */
.base-card--shadow-none {
  box-shadow: none;
}

.base-card--shadow-small {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.base-card--shadow-medium {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.base-card--shadow-large {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 패딩 변형 */
.base-card--padding-none .card-body {
  padding: 0;
}

.base-card--padding-small .card-body {
  padding: 12px;
}

.base-card--padding-medium .card-body {
  padding: 16px;
}

.base-card--padding-large .card-body {
  padding: 24px;
}

/* 호버 효과 */
.base-card--hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
}

/* 클릭 가능한 카드 */
.base-card--clickable {
  cursor: pointer;
}

.base-card--clickable:hover {
  border-color: #3b82f6;
}

.base-card--clickable:active {
  transform: translateY(1px);
}

/* 카드 섹션들 */
.card-header {
  padding: 16px 16px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
}

.card-body {
  /* 패딩은 상위 클래스에서 제어 */
}

.card-footer {
  padding: 0 16px 16px;
  border-top: 1px solid #e5e7eb;
  margin-top: 16px;
  padding-top: 16px;
}
</style>
