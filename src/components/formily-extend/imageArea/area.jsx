import React, { createRef, Component } from 'react'

import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import interact from 'interactjs'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { FormDialog } from '@/components'

import styles from './index.less'

const modalSchema = {
  type: 'object',
  properties: {
    href: {
      type: 'string',
      title: 'url',
      required: true,
      triggerType: 'onBlur',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': [
        {
          required: true,
          format: 'url',
          triggerType: 'onBlur',
        },
      ],
      'x-component-props': {
        placeholder: '请输入链接',
      },
    },
  },
}

const getAreaStyle = coordinate => {
  const { x, y, width, height } = coordinate
  return {
    position: 'absolute',
    width,
    height,
    top: y,
    left: x,
    background: '#dedede',
    opacity: 0.6,
  }
}

export default class Area extends Component {
  static propTypes = {
    coordinate: PropTypes.object,
    updateCoordinate: PropTypes.func,
  }

  areaRef = createRef(null)

  componentDidMount() {
    interact(this.areaRef.current)
      .draggable({})
      .resizable({
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true,
        },
      })
      .on('dragmove', this.onDragMove)
      .on('resizemove', this.onResizeMove)
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.coordinate, nextProps.coordinate)
  }

  componentWillUnmount() {
    interact(this.areaRef.current).unset()
  }

  onResizeMove = e => {
    const { coordinate, updateCoordinate } = this.props
    const { x, y } = coordinate
    const { width, height } = e.rect
    const { left, top } = e.deltaRect
    const nextCoordinate = {
      ...coordinate,
      x: x + left,
      y: y + top,
      width,
      height,
    }
    updateCoordinate({ type: 'update', coordinate: nextCoordinate })
  }

  onDragMove = e => {
    const {
      coordinate,
      coordinate: { x, y },
      updateCoordinate,
    } = this.props
    const { dx, dy } = e
    const nextCoordinate = { ...coordinate, x: x + dx, y: y + dy }
    updateCoordinate({ type: 'update', coordinate: nextCoordinate })
  }

  handleDelete = () => {
    const { updateCoordinate, coordinate } = this.props
    updateCoordinate({ type: 'delete', coordinate })
  }

  handleEdit = () => {
    const { coordinate, updateCoordinate } = this.props
    FormDialog({ schema: modalSchema, title: '编辑链接' })
      .forOpen((_, next) => {
        next({
          initialValues: { href: coordinate.href },
        })
      })
      .forConfirm((payload, next) => {
        updateCoordinate({
          type: 'update',
          coordinate: { ...coordinate, href: payload.values.href },
        })
        next(payload)
      })
      .open()
  }

  render() {
    const { coordinate } = this.props
    return (
      <div ref={this.areaRef} style={getAreaStyle(coordinate)}>
        <div className={styles['operate-container']}>
          <DeleteOutlined className={styles.icon} onClick={this.handleDelete} />
          <EditOutlined className={styles.icon} onClick={this.handleEdit} />
        </div>
      </div>
    )
  }
}
