// import { store, tokenActions } from '@store/index'
// import { deleteLocalStorage, getLocalStroge } from '@core/index'
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// function onSuccess(response) {
//   return response.data
// }

// function onError(error) {
//   handleError(error)
//   return error
// }

// api.interceptors.response.use(onSuccess, onError)
// api.interceptors.request.use(
//   (config) => {
//     const user = getLocalStroge('users')?.find((user) => user.isOnline)

//     if (user && user.token && user.isOnline) {
//       config.headers.Authorization = 'Bearer ' + user.token
//     }

//     return config
//   },
//   (error) => {
//     return handleError(error)
//   },
// )

// const handleError = (error) => {
//   if (error.response) {
//     console.error('Response Error:', error.response.data)
//     console.error('Status:', error.response.status)
//     console.error('Headers:', error.response.headers)

//     // Handle specific status codes
//     switch (error.response.status) {
//       case 401:
//         alert('Unauthorized! Please log in again.')
//         deleteLocalStorage('token')
//         window.location.pathname = '/auth'
//         break
//       case 403:
//         alert('Forbidden! You don’t have permission to access this resource.')
//         break
//       case 404:
//         alert('Not Found! The requested resource was not found.')
//         break
//       case 405:
//         alert('Wrong http method provided. Method not allowed.')
//         break
//       case 500:
//         alert('Internal Server Error! Please try again later.')
//         break

//       default:
//         if (error.response.status >= 400 && error.response.status < 500) {
//           // Handle all other 4xx errors
//           //alert('A client error occurred! Status: ' + error.response.status)
//         } else if (
//           error.response.status >= 500 &&
//           error.response.status < 600
//         ) {
//           // Handle all other 5xx errors
//           alert('A server error occurred! Status: ' + error.response.status)
//         }
//         break
//     }
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.error('Request Error:', error.request)
//     // alert('Network error! Please check your internet connection.')
//     if (error.request.status === 0) {
//       console.error('Network error or unauthorized access. Are you login??')
//       store.dispatch(tokenActions.logout())
//     }
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.error('Error:', error.message)
//     alert('An unexpected error occurred. Please try again.')
//   }
//   return Promise.reject(error) // Reject the promise to keep the error flowing
// }
