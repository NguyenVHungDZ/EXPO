// Convert URL to lowercase
// Removes trailing slashes from the URL (if present), except for the root path
// Uses 301 redirect status code for permanent redirections when normalizing the path
export default defineNuxtRouteMiddleware((to, _) => {
  const path = to.path
  let hasUppercase = false
  for (let i = 0; i < path.length; i++) {
    if (path[i] === path[i].toUpperCase() && path[i].match(/[a-z]/i)) {
      hasUppercase = true
      break
    }
  }
  if (hasUppercase) {
    if (path.endsWith('/')) {
      navigateTo(path.toLowerCase().substring(0, path.length - 1), {
        redirectCode: 301,
      })
    }
    return navigateTo(path.toLowerCase())
  } else if (path.endsWith('/') && path.length !== 1) {
    navigateTo(path.substring(0, path.length - 1), { redirectCode: 301 })
  }
})
