import { useRef } from 'react'
import { Button, Modal, notification } from 'antd'
import { Link } from 'umi'

import {
  visualPagePaging,
  geVisualPageById,
  addVisualPage,
  updateVisualPage,
  deleteVisualPage,
} from '@/service'
import { FormTable, FormModal } from '@/components'

import { createFormActions } from '@formily/antd'
import styles from './index.less'

let formModalRef
const formTableActions = createFormActions()
const service = ({ values, pagination }) => {
  return visualPagePaging({
    limit: pagination.pageSize,
    offset: pagination.pageSize * (pagination.current - 1),
    name: values.name,
  }).then(({ rows, count }) => {
    return {
      dataSource: rows,
      ...pagination,
      total: count,
    }
  })
}

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: '20%',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: '30%',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: '15%',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: '15%',
  },

  {
    title: '操作',
    width: '20%',
    dataIndex: 'id',
    render: id => (
      <>
        <Button
          type="link"
          size="small"
          onClick={async () => {
            const values = await geVisualPageById(id)
            formModalRef.current.showModal({ values, title: '编辑页面' })
          }}
        >
          编辑
        </Button>
        <Link
          to={{
            pathname: '/visual-page/edit',
            search: `?pageId=${id}`,
          }}
        >
          编辑组件
        </Link>
        <Link
          to={{
            pathname: '/visual-page/preview',
            search: `?pageId=${id}`,
          }}
        >
          &nbsp;预览
        </Link>
        <Button
          type="text"
          size="small"
          danger
          onClick={() => {
            Modal.confirm({
              content: '你确定删除该页面?',
              onOk: async () => {
                await deleteVisualPage(id)
                formTableActions.reset()
              },
            })
          }}
        >
          删除
        </Button>
      </>
    ),
  },
]

const formTableschema = {
  type: 'object',
  properties: {
    name: {
      key: 'name',
      name: 'name',
      type: 'string',
      title: '名称',
      'x-component': 'Input',
    },
  },
}

const modalSchema = {
  type: 'object',
  properties: {
    name: {
      key: 'name',
      name: 'name',
      type: 'string',
      title: '名称',
      required: true,
      maxLength: 20,
      triggerType: 'onBlur',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入页面名称',
      },
    },
    description: {
      key: 'description',
      name: 'description',
      type: 'string',
      title: '描述',
      maxLength: 200,
      triggerType: 'onBlur',
      'x-component': 'TextArea',
      'x-component-props': {
        placeholder: '请输入页面描述',
      },
    },
  },
}

const handleCreatePage = () => {
  formModalRef.current.showModal({ values: { name: '', description: '' }, title: '新增页面' })
}

const handleModalFormSubmit = async value => {
  const { id, name, description } = value
  if (id) {
    await updateVisualPage({ id, name, description })
  } else {
    await addVisualPage({ name, description })
  }
  notification.success({
    message: `${id ? '编辑' : '新建'}成功`,
    duration: 2,
  })
  formTableActions.reset()
}

export default () => {
  formModalRef = useRef()
  return (
    <div className={styles.page}>
      <FormTable
        columns={columns}
        hiddenHeadSearch
        service={service}
        schema={formTableschema}
        actions={formTableActions}
        headBtnGroup={
          <p className="table-top-group">
            <Button type="primary" onClick={handleCreatePage}>
              新增页面
            </Button>
          </p>
        }
      />
      <FormModal ref={formModalRef} schema={modalSchema} onOk={handleModalFormSubmit} />
    </div>
  )
}
