import axios from "axios"

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)

    // Add auth token if it exists
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status)
    return response
  },
  (error) => {
    console.error("Response error:", error)

    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token")
      // You might want to redirect to login page here
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
