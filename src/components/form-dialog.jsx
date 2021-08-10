import React from 'react'
import { FormDialog, FormLayout } from '@formily/antd'
import { SchemaField } from './index'

export default ({ schema, title = '表单', labelCol = 6, wrapperCol = 14 }) =>
  FormDialog({ title, maskClosable: false }, () => {
    return (
      <>
        <FormLayout labelCol={labelCol} wrapperCol={wrapperCol}>
          <SchemaField schema={schema} />
        </FormLayout>
      </>
    )
  })
