import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    return response.data
  })
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then((response) => response.data)
}

const updateBlog = (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog)
  return request.then((response) => response.data)
}

const removeBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}
// eslint-disable-next-line
export default { getAll, create, updateBlog, removeBlog, setToken }
