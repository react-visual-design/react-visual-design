import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import styles from './index.less'

export default class Drag extends PureComponent {
  handleDragStart = (item, e) => {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('data', JSON.stringify(item))
    this.props.handleDragStart()
  }

  handleDragEnd = e => {
    e.dataTransfer.clearData()
    this.props.handleDragEnd()
  }

  render() {
    const { data, renderChild } = this.props

    return (
      <section className={styles.dragWrap}>
        {map(data, item => (
          <div
            key={item.id}
            draggable
            onDragStart={this.handleDragStart.bind(this, item)}
            onDragEnd={this.handleDragEnd}
          >
            {renderChild(item)}
          </div>
        ))}
      </section>
    )
  }
}

Drag.propTypes = {
  data: PropTypes.array,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  renderChild: PropTypes.func,
}

Drag.defaultProps = {
  data: [],
  handleDragStart: () => {},
  handleDragEnd: () => {},
  renderChild: () => {},
}
