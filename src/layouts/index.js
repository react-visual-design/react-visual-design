import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

import { ErrorBoundary } from '@/components'


export default (props) => {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        {props.children}
      </ConfigProvider>
    </ErrorBoundary>
  )
}
