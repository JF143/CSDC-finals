import axios from "axios"

// Create an axios instance with a base URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000, // 10 second timeout
})

// Add a request interceptor to include the auth token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (config.headers && token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url)
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.data)
    return response
  },
  (error) => {
    console.error("Response error:", error)

    if (error.response) {
      // Server responded with error status
      const customError = {
        ...error,
        message: error.response?.data?.message || `Server Error: ${error.response.status}`,
      }
      return Promise.reject(customError)
    } else if (error.request) {
      // Request was made but no response received
      const customError = {
        ...error,
        message: "Network Error: Unable to connect to server",
      }
      return Promise.reject(customError)
    } else {
      // Something else happened
      const customError = {
        ...error,
        message: error.message || "Something went wrong",
      }
      return Promise.reject(customError)
    }
  },
)
