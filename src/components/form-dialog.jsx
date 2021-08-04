import React from 'react'
import { Button } from 'antd'
import { FormDialog, FormLayout, Submit } from '@formily/antd'
import { SchemaField } from './index'

const defaultSubmit = () => { }
export default ({
  schema,
  title = '表单',
  labelCol = 6,
  wrapperCol = 14,
  onsubmit = defaultSubmit,
}) =>
  FormDialog(
    {
      title,
      footer: [],
    },
    (confirm, cancel) => {
      return (
        <>
          <FormLayout labelCol={labelCol} wrapperCol={wrapperCol}>
            <SchemaField schema={schema} />
          </FormLayout>
          <FormDialog.Footer>
            <Button onClick={cancel}>取消</Button>
            <Submit onSubmit={data => onsubmit({ data, confirm })}>保存</Submit>
          </FormDialog.Footer>
        </>
      )
    },
  )
