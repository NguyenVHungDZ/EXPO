import { fetchApi } from './fetchApi'
// Create useApi object that has all API-related function
const useApi = (route: string) => {
  const ROUTE = route

  // Handle update profile
  const updateProfile = async (data = {}) => {
    await fetchApi(
      `/${ROUTE}`,
      {},
      {
        'content-type': 'application/json',
        body: JSON.stringify(data),
        method: 'PUT',
      },
    )
  }

  // Create a new resource with provided data
  const create = async (data: any) =>
    await fetchApi(
      `/${ROUTE}`,
      {},
      {
        'content-type': 'application/json',
        body: JSON.stringify(data),
        method: 'POST',
      },
    )

  // Get a list of all resource with optional parameters and url parameter
  const getAll = async (params = {}, urlParams = '') => {
    return await fetchApi(
      `/${ROUTE}`,
      params,
      {
        method: 'GET',
      },
      urlParams,
    )
  }

  // Get a specific resource by its ID
  const get = async (id: any, params = {}) =>
    await fetchApi(`/${ROUTE}/${id}`, params, {
      method: 'GET',
    })

  // Get a file by its source URL
  const getFile = async (fileSrc: string) => await fetchApi(`${fileSrc}`)

  // Get information about the currently authenticated user
  const getMe = async (id: any, params = {}) =>
    await fetchApi(`/${ROUTE}/me`, params, {
      method: 'GET',
    })

  // Remove a resource by its ID
  const remove = async (id: any) =>
    await fetchApi(
      `/${ROUTE}/${id}`,
      {},
      {
        method: 'DELETE',
      },
    )

  // Update a resource by its ID with new data
  const update = async (id: any, data: any) =>
    await fetchApi(
      `/${ROUTE}/${id}`,
      {},
      {
        'content-type': 'application/json',
        body: JSON.stringify(data),
        method: 'PUT',
      },
    )

  // Upload a file to a specific endpoint
  const uploadFile = async (data: any) =>
    await fetchApi(
      `/${ROUTE}/upload`,
      {},
      {
        'Content-type': 'multipart/form-data',
        body: data,
        method: 'POST',
      },
    )

  // Upload a file to a specific resource identified by its ID
  const putFile = async (id: string, data: any) =>
    await fetchApi(
      `/${ROUTE}/${id}/file/upload`,
      {},
      {
        'Content-type': 'multipart/form-data',
        body: data,
        method: 'PUT',
      },
    )

  // Update a specific field of a resource by its ID
  const updateOneField = async (id: string, field: string, data: any) =>
    await fetchApi(
      `/${ROUTE}/${id}/${field}`,
      {},
      {
        'content-type': 'application/json',
        body: JSON.stringify(data),
        method: 'PUT',
      },
    )

  // Restore a deleted resource by its ID
  const restore = async (id: any) =>
    await fetchApi(
      `/${ROUTE}/${id}/restore`,
      {},
      {
        method: 'PUT',
      },
    )

  // Change status of a resouce to 'public' or 'private' by its ID
  const changeStatusShare = async (id: string, data: any) =>
    await fetchApi(
      `/${ROUTE}/${id}/is_public`,
      {},
      {
        'content-type': 'application/json',
        body: JSON.stringify(data),
        method: 'PUT',
      },
    )

  // Return all functions in order to use them globally
  return {
    getAll,
    remove,
    get,
    update,
    create,
    getMe,
    updateProfile,
    uploadFile,
    getFile,
    restore,
    changeStatusShare,
    updateOneField,
    putFile,
  }
}

export default useApi
