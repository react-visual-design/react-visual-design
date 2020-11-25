import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

export default props => <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>
