import { Button, Modal, message } from 'antd'
import { Link } from 'umi'
import { FormDialog } from '@/components'
import {
  geVisualPageById,
  updateVisualPage,
  deleteVisualPage,
} from '@/service'



export const modalSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      required: true,
      maxLength: 20,
      triggerType: 'onBlur',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入页面名称',
      },
    },
    description: {
      type: 'string',
      title: '描述',
      maxLength: 200,
      triggerType: 'onBlur',
      'x-decorator': 'FormItem',
      'x-component': 'TextArea',
      'x-component-props': {
        placeholder: '请输入页面描述',
      },
    },
  },
}

export const createTableColumns = (formTableEl) => {

  const onsubmit = async ({ data, confirm }) => {
    await updateVisualPage(data)
    confirm()
    formTableEl.current.reset()
    message.success('编辑成功')
  }

  return [
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
              FormDialog({ schema: modalSchema, title: '编辑模块', onsubmit }).open({
                initialValues: values
              })
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
                  message.success('删除成功')
                  formTableEl.current.reset()
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
}

export const tableSearchSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}


