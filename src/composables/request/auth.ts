// Using URL stored in .env file
const PRIVATE_URL = import.meta.env.VITE_API_BASE_URL
// Define authRequest function to hold all authentication-related API requests
const authRequest = () => {
  // Handle login
  const login = async (data: any) => {
    return await fetch(`${PRIVATE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  // Handle register
  const register = async (data: any) => {
    return await fetch(`${PRIVATE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  // Handle forget password
  const forgotPassword = async (data: any) => {
    return await fetch(`${PRIVATE_URL}/auth/forget-password`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  // Hnadle verification
  const verified = async (data: any) => {
    return await fetch(`${PRIVATE_URL}/auth/verified`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: data,
    })
  }

  // Handle reset password
  const resetPassword = async (data: any) => {
    return await fetch(`${PRIVATE_URL}/auth/reset-password`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  // Handle login but with external platform (Google, Facebook, etc)
  const loginWith = async (platform: string, code: string) => {
    return await fetch(
      `${PRIVATE_URL}/auth/${platform}?` + new URLSearchParams({ code }),
    )
  }

  // Return all functions in order to be able to use in other parts of the application
  return {
    login,
    register,
    forgotPassword,
    verified,
    resetPassword,
    loginWith,
  }
}

export default authRequest

