import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import classNames from 'classnames'

import styles from './index.less'

export default class Drop extends PureComponent {
  dragOverCallback = throttle(e => {
    if (e.currentTarget) {
      e.currentTarget.classList.add(styles['dropPlaceHolder-active'])
    }
    e.dataTransfer.dropEffect = 'copy'
  }, 1000)

  handleDragOver = e => {
    e.preventDefault()
    e.persist()
    this.dragOverCallback(e)
  }

  handleDragLeave = e => {
    e.currentTarget.classList.remove(styles['dropPlaceHolder-active'])
  }

  handleDrop = e => {
    e.preventDefault()
    const dataStr = e.dataTransfer.getData('data')
    const data = JSON.parse(dataStr)
    this.props.handleDrop(data)
  }

  render() {
    const { show } = this.props
    const placeHolderClasses = classNames(styles.dropPlaceHolder, {
      [styles['dropPlaceHolder-show']]: show,
    })
    return (
      <div
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        className={placeHolderClasses}
      >
        放这里
      </div>
    )
  }
}

Drop.propTypes = {
  handleDrop: PropTypes.func,
  show: PropTypes.bool,
}

Drop.defaultProps = {
  handleDrop: () => {},
  show: false,
}
