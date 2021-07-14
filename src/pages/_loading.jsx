import React from 'react'
import { Spin } from 'antd'
import './_loading.less'

export default () => {
  return (
    <div className="loading">
      <Spin tip="加载中..." />
    </div>
  )
}
