import React, { createRef, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { connect, mapProps } from '@formily/react'
import Area from './area'
import styles from './index.less'
import { defaultImg } from '@/util/img'

let pointStart = { x: null, y: null }
let currentId = null

class ImageArea extends PureComponent {
  static propTypes = {
    value: PropTypes.array,
    imgSrc: PropTypes.string,
    imgWidth: PropTypes.string,
    imgHeight: PropTypes.string,
  }

  static defaultProps = {
    imgSrc: '',
    imgWidth: '100%',
    imgHeight: '100%',
  }

  constructor(props) {
    super(props)
    this.state = {
      coordinates: props.value,
    }
  }

  imgContainerRef = createRef(null)

  imgRef = createRef(null)

  imgmapName = v4()

  getCursorPosition = e => {
    const { left, top } = this.imgContainerRef.current.getBoundingClientRect()
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    }
  }

  onMouseDown = e => {
    if (e.target === this.imgRef.current || e.target === this.imgContainerRef.current) {
      const { x, y } = this.getCursorPosition(e)
      pointStart = { x, y }
      currentId = v4()
    } else {
      pointStart = { x: null, y: null }
      currentId = null
    }
  }

  onMouseMove = e => {
    if (pointStart.x && pointStart.y) {
      const pointEnd = this.getCursorPosition(e)
      const newCoordinate = {
        x: Math.min(pointStart.x, pointEnd.x),
        y: Math.min(pointStart.y, pointEnd.y),
        width: Math.abs(pointStart.x - pointEnd.x),
        height: Math.abs(pointStart.y - pointEnd.y),
        id: currentId,
        href: '',
      }
      this.updateCoordinate({ type: 'add', coordinate: newCoordinate })
    }
  }

  onMouseUp = () => {
    pointStart = { x: null, y: null }
    currentId = null
    this.props.onChange(this.state.coordinates)
  }

  updateCoordinate = ({ type, coordinate }) => {
    let { coordinates } = this.state
    const matchIndex = coordinates.findIndex(item => item.id === coordinate.id)
    if (type === 'delete') {
      coordinates.splice(matchIndex, 1)
    } else if (type === 'add' || type === 'update') {
      if (matchIndex === -1) {
        coordinates = [...coordinates, coordinate]
      } else {
        coordinates[matchIndex] = coordinate
      }
    }
    this.setState({ coordinates: [...coordinates] })
  }

  render() {
    const { imgSrc, imgWidth = '100%', imgHeight = '100%' } = this.props
    const { coordinates } = this.state
    return (
      <div
        className={styles.container}
        ref={this.imgContainerRef}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <img
          className="img"
          ref={this.imgRef}
          src={imgSrc || defaultImg}
          width={imgWidth}
          height={imgHeight}
          alt=""
          draggable={false}
          useMap={`#${this.imgmapName}`}
        />
        {coordinates.map(coordinate => (
          <Area
            key={coordinate.id}
            coordinate={coordinate}
            updateCoordinate={this.updateCoordinate}
          />
        ))}
      </div>
    )
  }
}

export default connect(
  ImageArea,
  mapProps(_, (props, field) => {
    return {
      ...props,
      imgSrc: field.form.values.src,
    }
  }),
)
