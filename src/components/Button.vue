<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
});

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizes = {
    default: 'h-11 px-8 py-2',
    sm: 'h-9 px-4 text-sm',
    lg: 'h-12 px-10 text-lg',
  };

  return `${base} ${variants[props.variant]} ${sizes[props.size]}`;
});
</script>

<template>
  <a v-if="href" :href="href" :class="buttonClasses">
    <slot />
  </a>
  <button v-else :class="buttonClasses">
    <slot />
  </button>
</template>
