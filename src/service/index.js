import request from '../util/request'

const { post, get, put, delete: Delete } = request

const visualPagePaging = params => get('/bff/visual-page', { params })
const geVisualPageById = id => get(`/bff/visual-page/${id}`)
const addVisualPage = data => post(`/bff/visual-page`, { data })
const updateVisualPage = data => put(`/bff/visual-page/${data.id}`, { data })
const updateVisualPageData = data => put(`/bff/update-visual-page/${data.id}`, { data })
const deleteVisualPage = id => Delete(`/bff/visual-page/${id}`)

export {
  visualPagePaging,
  geVisualPageById,
  addVisualPage,
  updateVisualPage,
  updateVisualPageData,
  deleteVisualPage,
}
