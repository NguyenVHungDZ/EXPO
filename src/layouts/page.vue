<template>
  <div class="overflow-hidden">
    <client-only>
      <LayoutsPageNavbar class="h-[64px] max-h-[64px]" />
    </client-only>
    <LayoutsPageContent>
      <slot />
    </LayoutsPageContent>
    <LayoutsPageFooter />
  </div>
</template>

<script setup lang="ts"></script>
