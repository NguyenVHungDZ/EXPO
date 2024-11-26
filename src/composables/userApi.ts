import { ElMessage } from 'element-plus'
import { fetchApi } from './request/fetchApi'

export const getUserMe = async (): Promise<any> => {
  const token = useCookie<string | null>('expo_token')
  const router = useRouter()
  try {
    const res = await fetchApi('/User/me')
    return res
  } catch (error) {
    // @ts-ignore // TODO: need check
    if (error && error.response && error.response.status === 401) {
      token.value = null
      router.go(0)
    }
  }
}

export const updateUserMe = async (info = {}) => {
  try {
    return await fetchApi('/User/me', {
      method: 'PUT',
      body: info,
    })
  } catch (error) {}
}
