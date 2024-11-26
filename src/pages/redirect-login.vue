<script setup lang="ts">
import { ElLoading } from 'element-plus'
import authRequest from '~/composables/request/auth'
const { t } = useI18n()
const route = useRoute()
const { loginWith } = authRequest()
const baseToken = useCookie('expo_token')

onMounted(async () => {
  // Display a fullscreen loading spinner with a loading message
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: t('message.loading'),
  })
  if (route.query.code) {
    let res
    if (window.name === 'Base login with google') {
      res = await loginWith('google', String(route.query.code))
    } else if (window.name === 'Base login with facebook') {
      res = await loginWith('facebook', String(route.query.code))
    } else if (window.name === 'Base login with github') {
      res = await loginWith('github', String(route.query.code))
    }
    baseToken.value = res ? await res.json() : res
    window.close()
  }
})
</script>

<style></style>
