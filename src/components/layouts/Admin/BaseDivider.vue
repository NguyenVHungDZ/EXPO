<script setup>
const props = defineProps({
  navBar: Boolean,
})
</script>

<template>
  <hr
    :class="props.navBar ? 'hidden lg:block lg:my-0.5 ' : 'my-6 -mx-6 '"
    class="border-t border-gray-100"
  />
</template>
