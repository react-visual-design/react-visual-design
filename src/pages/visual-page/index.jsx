import React, { useCallback, useRef } from 'react'
import { Button, message } from 'antd'
import styles from './index.less'
import { FormTable, FormDialog } from '@/components'

import { tableSearchSchema, createTableColumns, modalSchema } from './_config'
import { addVisualPage, visualPagePaging } from '@/service'

export default () => {
  const formTableEl = useRef(null)

  const onsubmit = useCallback(
    async ({ data, confirm }) => {
      await addVisualPage(data)
      confirm()
      formTableEl.current.reset()
      message.success('新增成功')
    },
    [formTableEl],
  )

  return (
    <div className={styles.page}>
      <FormTable
        rowKey="id"
        ref={formTableEl}
        columns={createTableColumns(formTableEl)}
        fetchTableData={visualPagePaging}
        schema={tableSearchSchema}
        headBtnGroup={
          <Button
            type="primary"
            onClick={() => {
              FormDialog({ schema: modalSchema, title: '新增页面', onsubmit }).open({
                initialValues: {},
              })
            }}
          >
            新增页面
          </Button>
        }
      />
    </div>
  )
}
