<template>
  <Body class="antialiased duration-300 transition-colors text-gray-800">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script setup lang="ts">
import { useUser } from '~/stores/user'
useHead({
  title: 'VEXPO',
  titleTemplate: `%s - Nền tảng triển lãm ảo`,
})
const baseToken = useCookie('expo_token')
const token = useState('token', () => baseToken.value)
const user = useUser()

const setToken = () => {
  if (baseToken.value) {
    // @ts-ignore
    token.value = baseToken.value
    user.getUserInfo()
  }
}

watch(
  baseToken,
  (value) => {
    setToken()
  },
  { immediate: true },
)
</script>
<style lang="scss">
$color-primary-global: #356df1;

* {
  font-family: Inter;
}

:root {
  --el-color-primary: #356df1 !important;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: theme('colors.primary.DEFAULT');
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
</style>
