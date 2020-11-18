import request from '../util/request'

const { post, get, put, delete: Delete } = request

const visualPagePaging = params => get('/api/visual-page', { params })
const geVisualPageById = id => get(`/api/visual-page/${id}`)
const addVisualPage = data => post(`/api/visual-page`, { data })
const updateVisualPage = data => put(`/api/visual-page/${data.id}`, { data })
const updateVisualPageData = data => put(`/api/update-visual-page/${data.id}`, { data })
const deleteVisualPage = id => Delete(`/api/visual-page/${id}`)

export {
  visualPagePaging,
  geVisualPageById,
  addVisualPage,
  updateVisualPage,
  updateVisualPageData,
  deleteVisualPage,
}
