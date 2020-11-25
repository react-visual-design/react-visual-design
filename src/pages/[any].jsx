import { Icon } from 'antd'
import styles from './404.less'

const NoFoundPage = () => (
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>404 Not Found</h1>
  </div>
)

NoFoundPage.path = undefined

export default NoFoundPage
