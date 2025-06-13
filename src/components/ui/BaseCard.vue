<template>
  <div :class="cardClasses" @click="handleClick">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  shadow?: "none" | "sm" | "base" | "md" | "lg";
  padding?: "none" | "sm" | "base" | "lg";
  hover?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  shadow: "base",
  padding: "base",
  hover: false,
  clickable: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};

const cardClasses = computed(() => {
  const baseClasses =
    "bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200";

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    base: "shadow",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    base: "p-4",
    lg: "p-6",
  };

  const interactiveClasses = [
    props.hover ? "hover:shadow-lg hover:-translate-y-1" : "",
    props.clickable ? "cursor-pointer" : "",
  ].filter(Boolean);

  return [
    baseClasses,
    shadowClasses[props.shadow],
    paddingClasses[props.padding],
    ...interactiveClasses,
  ].join(" ");
});
</script>
