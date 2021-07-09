import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`
  }
}

const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    return response.data
  })
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios
    .post(baseUrl, blog, config)
    .then((response) => {
      return response.data
    })
    .catch((e) => e)
}

const updateBlog = (id, blog) => {
  return axios.put(`${baseUrl}/${id}`, blog).then((response) => response.data)
}

const removeBlog = (id) => {
  console.log('token:', token)
  const config = {
    headers: { Authorization: token },
  }
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then((response) => response.data)
    .catch((e) => e)
}
// eslint-disable-next-line
export default { getAll, create, updateBlog, removeBlog, setToken }
