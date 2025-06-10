<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
        <div :class="modalClasses" @click.stop>
          <!-- 헤더 -->
          <div v-if="title || closable" class="modal-header">
            <h3 v-if="title" class="modal-title">{{ title }}</h3>
            <button
              v-if="closable"
              class="modal-close"
              @click="$emit('close')"
              aria-label="닫기"
            >
              ✕
            </button>
          </div>

          <!-- 본문 -->
          <div class="modal-body">
            <slot />
          </div>

          <!-- 푸터 (슬롯으로 제공) -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { ModalProps } from "@/types";

interface Props extends ModalProps {}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  closable: true,
});

const emit = defineEmits<{
  close: [];
}>();

const slots = useSlots();

// 오버레이 클릭 시 모달 닫기 (closable이 true일 때만)
const handleOverlayClick = () => {
  if (props.closable) {
    emit("close");
  }
};

// 모달 크기에 따른 클래스
const modalClasses = computed(() => [
  "modal-content",
  `modal-content--${props.size}`,
]);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  max-width: 500px;
}

.modal-content--small {
  max-width: 400px;
}

.modal-content--medium {
  max-width: 500px;
}

.modal-content--large {
  max-width: 800px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 0 24px;
}

.modal-footer {
  padding: 16px 24px 24px;
  border-top: 1px solid #e5e7eb;
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* 트랜지션 효과 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content {
  transform: scale(0.95) translateY(-20px);
}

.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(-20px);
}
</style>
