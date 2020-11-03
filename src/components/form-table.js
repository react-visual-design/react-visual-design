import React from 'react'
import { SchemaForm, useFormTableQuery, FormButtonGroup, Submit, Reset } from '@formily/antd'
import * as allComp from '@formily/antd-components'
import { Table } from 'antd'

// 重置reset pageNo
const submitResetMiddleware = () => ({ context }) => ({
  onFormResetQuery(payload, next) {
    context.setPagination({
      ...context.pagination,
      current: 1,
    })
    return next(payload)
  },
})

export default props => {
  const {
    columns = [],
    service,
    schema = {},
    headBtnGroup = '',
    children,
    pageSize = 10,
    actions,
  } = props
  const { form, table } = useFormTableQuery(service, [submitResetMiddleware()], {
    pagination: {
      pageSize,
    },
  })

  return (
    <>
      <SchemaForm
        {...form}
        components={allComp}
        style={{ marginBottom: 20 }}
        inline
        schema={schema}
        actions={actions}
      >
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      {headBtnGroup}
      <Table {...table} columns={columns} rowKey={item => item.id} bordered />
      {children}
    </>
  )
}
