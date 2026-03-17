import axiosInstance from './axiosInstance'

export default class blogService {
  static async getBlogList(page, limit) {
    try {
      const response = await axiosInstance.get(`/v1/blog?page=${page}&limit=${limit}`)

      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getBlog(slug) {
    try {
      const response = await axiosInstance.get(`/v1/blog/${slug}`)

      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
}
