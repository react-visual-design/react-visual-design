import request from '../util/request'

const { post, get, put, delete: Delete } = request

const PagePaging = params => get('/api/page', { params })
const gePageById = id => get(`/api/page/${id}`)
const addPage = data => post(`/api/page`, { data })
const updatePage = data => put(`/api/page/${data.id}`, { data })
const updatePageData = data => put(`/api/update-page-data/${data.id}`, { data })
const deletePage = id => Delete(`/api/page/${id}`)

export { PagePaging, gePageById, addPage, updatePage, updatePageData, deletePage }
