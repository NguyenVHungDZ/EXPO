// export default defineNuxtRouteMiddleware((to, _) => {
//   const token = useCookie('expo_token')
//   if (
//     // Check the user if is authenticated or not
//     token.value &&
//     // ❗️ Check next route name is sign in or sign up or forgot password
//     (to.path.includes('/login') || to.path === '/register')
//   ) {
//     // redirect the user to the home page
//     return navigateTo('/')
//   } else if (
//     !token.value &&
//     // ❗️ Check next route name is information
//     (to.path.includes('/information') || to.path.includes('/admin'))
//   ) {
//     return navigateTo('/')
//   } else if (
//     !token.value &&
//     // ❗️ Check next route name is information
//     to.path.includes('/register-booth')
//   ) {
//     return navigateTo('/login')
//   }
// })

export default defineNuxtRouteMiddleware((to, _) => {
  const token = useCookie('expo_token')
})
