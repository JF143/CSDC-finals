import type { DataProvider } from "@refinedev/core"
import { axiosInstance } from "./axiosInstance"

// Helper function to transform MongoDB documents to have 'id' instead of '_id'
const transformData = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      id: item._id,
    }))
  } else if (data && data._id) {
    return {
      ...data,
      id: data._id,
    }
  }
  return data
}

// Export as a function that returns a DataProvider
export const dataProvider = (): DataProvider => {
  return {
    getList: async ({ resource, pagination, filters, meta }) => {
      const url = `/${resource}`

      // Handle pagination
      const current = pagination?.current || 1
      const pageSize = pagination?.pageSize || 10

      // Handle filters
      const queryFilters = filters?.reduce((prev, filter) => {
        if (filter.operator === "eq") {
          return { ...prev, [filter.field]: filter.value }
        }
        return prev
      }, {})

      try {
        console.log(`Fetching ${resource} from: ${url}`)

        const { data } = await axiosInstance.get(url, {
          params: {
            page: current,
            pageSize,
            ...queryFilters,
            ...meta,
          },
        })

        console.log(`Raw response for ${resource}:`, data)

        // Handle different response formats
        if (resource === "categories") {
          // Categories endpoint returns an array directly
          const transformedData = transformData(data)
          console.log(`Transformed categories data:`, transformedData)
          return {
            data: Array.isArray(transformedData) ? transformedData : [],
            total: Array.isArray(transformedData) ? transformedData.length : 0,
          }
        } else if (resource === "blog-posts") {
          // Blog posts endpoint returns an object with blogPosts array
          const transformedData = transformData(data.blogPosts || [])
          console.log(`Transformed blog posts data:`, transformedData)
          return {
            data: transformedData,
            total: data.total || 0,
          }
        }

        // Fallback for other resources
        const transformedData = transformData(Array.isArray(data) ? data : data.data || [])
        return {
          data: transformedData,
          total: data.total || transformedData.length,
        }
      } catch (error) {
        console.error(`Error fetching ${resource}:`, error)
        return {
          data: [],
          total: 0,
        }
      }
    },

    getOne: async ({ resource, id }) => {
      const url = `/${resource}/${id}`
      try {
        console.log(`Fetching single ${resource} from: ${url}`)
        const { data } = await axiosInstance.get(url)
        const transformedData = transformData(data)
        console.log(`Transformed single ${resource} data:`, transformedData)
        return {
          data: transformedData,
        }
      } catch (error) {
        console.error(`Error fetching single ${resource}:`, error)
        throw error
      }
    },

    create: async ({ resource, variables }) => {
      const url = `/${resource}`
      try {
        console.log(`Creating ${resource} at: ${url}`, variables)
        const { data } = await axiosInstance.post(url, variables)
        const transformedData = transformData(data)
        return {
          data: transformedData,
        }
      } catch (error) {
        console.error(`Error creating ${resource}:`, error)
        throw error
      }
    },

    update: async ({ resource, id, variables }) => {
      const url = `/${resource}/${id}`
      try {
        console.log(`Updating ${resource} at: ${url}`, variables)
        const { data } = await axiosInstance.put(url, variables)
        const transformedData = transformData(data)
        return {
          data: transformedData,
        }
      } catch (error) {
        console.error(`Error updating ${resource}:`, error)
        throw error
      }
    },

    deleteOne: async ({ resource, id }) => {
      const url = `/${resource}/${id}`
      try {
        console.log(`Deleting ${resource} at: ${url}`)
        await axiosInstance.delete(url)
        // Return the deleted item with the id
        return {
          data: { id } as any,
        }
      } catch (error) {
        console.error(`Error deleting ${resource}:`, error)
        throw error
      }
    },

    getApiUrl: () => {
      return "http://localhost:5000/api"
    },
  }
}

// Do NOT export default as an object - this was causing the error
// export default dataProvider
