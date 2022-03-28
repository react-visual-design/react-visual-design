import request from '../util/request'


const prefixApi = 'https://koki-5ghulbfed42032ec-1301619189.ap-shanghai.service.tcloudbase.com/api/v1.0/'
const { post, get, delete: Delete, patch } = request
const visualPagePaging = () => get(`${prefixApi}page`)
const geVisualPageById = id => get(`${prefixApi}page/${id}`)
const addVisualPage = data => post(`${prefixApi}page`, { data: { data: [data] } })
const updateVisualPage = ({ _id, ...rest }) => patch(`${prefixApi}page/${_id}`, { data: { data: rest } })
const deleteVisualPage = id => Delete(`${prefixApi}page/${id}`)

export {
  visualPagePaging,
  geVisualPageById,
  addVisualPage,
  updateVisualPage,
  deleteVisualPage,
}
