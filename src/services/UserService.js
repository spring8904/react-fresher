import axios from './customize-axios'

export const fetchUsers = (page = 1) => axios.get(`users?page=${page}`)

export const postUser = (name, job) => axios.post('users', { name, job })

export const putUser = (name, job, id) =>
  axios.put(`users/${id}`, { name, job })

export const deleteUser = (id) => axios.delete(`users/${id}`)
