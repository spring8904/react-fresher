import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://reqres.in/',
})

instance.interceptors.response.use(
  (response) => (response.data ? response.data : response.status),
  (error) => Promise.reject(error),
)

export default instance
