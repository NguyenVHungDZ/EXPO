// API fetching function
export const fetchApi = async (
  url: string,
  params = {},
  options = {},
  urlParams = '',
) => {
  // Get the URL from .env file (enviroment file)
  const PRIVATE_URL = import.meta.env.VITE_API_BASE_URL
  // Retrieve token stored in the global state
  const token = useState('token')
  // Header of the fetch function
  const headers = {
    Authorization: `Bearer ${
      // @ts-ignore
      token.value && token.value.access_token ? token.value.access_token : null
    }`,
  }

  // Configure the return of the fetching data
  return await $fetch(
    url +
      (Object.keys(params).length !== 0 || urlParams ? '?' : '') +
      (params ? `${new URLSearchParams(params)}` : '') +
      (urlParams || ''),
    {
      baseURL: String(PRIVATE_URL),
      headers,
      ...options,
    },
  )
}
