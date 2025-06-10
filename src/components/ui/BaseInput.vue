<template>
  <div class="base-input-wrapper">
    <!-- 라벨 -->
    <label v-if="label" class="base-input-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <!-- 입력 필드 -->
    <div class="base-input-container">
      <!-- 앞쪽 아이콘 -->
      <div v-if="$slots.prepend" class="base-input-prepend">
        <slot name="prepend" />
      </div>

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />

      <!-- 뒤쪽 아이콘 -->
      <div v-if="$slots.append" class="base-input-append">
        <slot name="append" />
      </div>
    </div>

    <!-- 에러 메시지 -->
    <div v-if="error" class="base-input-error">
      {{ error }}
    </div>

    <!-- 도움말 텍스트 -->
    <div v-if="hint && !error" class="base-input-hint">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import type { InputProps } from "@/types";

interface Props extends InputProps {
  modelValue?: string;
  label?: string;
  hint?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  required: false,
});

// 이벤트 정의
const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

// 고유 ID 생성 (라벨과 입력 필드 연결용)
const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);

// 입력 값 변경 핸들러
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

// slots 접근
const slots = useSlots();

// 입력 필드 클래스 동적 계산
const inputClasses = computed(() => [
  "base-input",
  {
    "base-input--error": props.error,
    "base-input--disabled": props.disabled,
    "base-input--has-prepend": !!slots.prepend,
    "base-input--has-append": !!slots.append,
  },
]);
</script>

<style scoped>
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.base-input-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
}

.base-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.base-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: white;
}

.base-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.base-input::placeholder {
  color: #9ca3af;
}

.base-input--error {
  border-color: #ef4444;
}

.base-input--error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.base-input--disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.base-input--has-prepend {
  padding-left: 40px;
}

.base-input--has-append {
  padding-right: 40px;
}

.base-input-prepend,
.base-input-append {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: #6b7280;
}

.base-input-prepend {
  left: 12px;
}

.base-input-append {
  right: 12px;
}

.base-input-error {
  font-size: 14px;
  color: #ef4444;
}

.base-input-hint {
  font-size: 14px;
  color: #6b7280;
}
</style>
