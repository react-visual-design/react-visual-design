import React from 'react'
import styles from './index.less'

export default props => (
  <div className={`${styles.device} ${styles[`device-${props.deviceName || 'iphone-8'}`]}`}>
    <div className={styles['device-frame']}>
      <div className={styles['device-content']}>{props.children}</div>
    </div>
    <div className={styles['device-stripe']} />
    <div className={styles['device-header']} />
    <div className={styles['device-sensors']} />
    <div className={styles['device-btns']} />
    <div className={styles['device-power']} />
  </div>
)
