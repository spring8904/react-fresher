import axios from './customize-axios'

export const fetchUsers = (page = 1) => axios.get(`api/users?page=${page}`)

export const postUser = (name, job) => axios.post('api/users', { name, job })

export const putUser = (name, job, id) =>
  axios.put(`api/users/${id}`, { name, job })

export const deleteUser = (id) => axios.delete(`api/users/${id}`)

export const loginApi = (email, password) =>
  axios.post('api/login', { email, password })
