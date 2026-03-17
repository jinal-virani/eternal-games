import axiosInstance from './axiosInstance'

export default class websiteService {
  static async getWebsiteList() {
    try {
      const response = await axiosInstance.get('/v1/websites')
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getWebsite(id) {
    try {
      const response = await axiosInstance.get(`/v1/websites/${id}`)

      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  static async createWebsite(website) {
    {
      try {
        const response = await axiosInstance.post('/v1/websites/create', {
          ...website
        })

        return response.data
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  static async updateWebsite(websiteId, website) {
    try {
      const response = await axiosInstance.put(`/v1/websites/${websiteId}`, {
        ...website
      })

      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  static async deleteWebsite(websiteId) {
    try {
      const response = await axiosInstance.delete(`/v1/websites/${websiteId}`)

      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

}
