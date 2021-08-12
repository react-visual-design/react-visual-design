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
  }

  static defaultProps = {
    imgSrc: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      coordinates: props.value,
      imgWidthZoomRadio: null,
      imgHeightZoomRadio: null,
    }
  }

  imgContainerRef = createRef(null)

  imgRef = createRef(null)

  imgmapName = v4()

  onImgLoad = () => {
    this.setState({
      imgWidthZoomRadio: +(this.imgRef.current.width / this.imgRef.current.naturalWidth).toFixed(2),
      imgHeightZoomRadio: +(this.imgRef.current.height / this.imgRef.current.naturalHeight).toFixed(
        2,
      ),
    })
  }

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
    const { imgWidthZoomRadio, imgHeightZoomRadio } = this.state
    const matchIndex = coordinates.findIndex(item => item.id === coordinate.id)
    if (type === 'delete') {
      coordinates.splice(matchIndex, 1)
    } else if (type === 'add' || type === 'update') {
      const { width, height, x, y } = coordinate
      const newCoordinate = {
        ...coordinate,
        x: +(x / imgWidthZoomRadio).toFixed(2),
        y: +(y / imgWidthZoomRadio).toFixed(2),
        width: +(width / imgWidthZoomRadio).toFixed(2),
        height: +(height / imgHeightZoomRadio).toFixed(2),
      }
      if (matchIndex === -1) {
        coordinates = [...coordinates, newCoordinate]
      } else {
        coordinates[matchIndex] = newCoordinate
      }
    }
    this.setState({ coordinates: [...coordinates] })
  }

  render() {
    const { imgSrc } = this.props
    const { coordinates, imgWidthZoomRadio, imgHeightZoomRadio } = this.state
    return (
      <div
        className={styles.container}
        ref={this.imgContainerRef}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <img
          className={styles.img}
          ref={this.imgRef}
          src={imgSrc || defaultImg}
          draggable={false}
          onLoad={this.onImgLoad}
          useMap={`#${this.imgmapName}`}
        />
        {imgWidthZoomRadio &&
          imgHeightZoomRadio &&
          coordinates.map(coordinate => {
            const { width, height, x, y } = coordinate
            const newCoordinate = {
              ...coordinate,
              x: +(x * imgWidthZoomRadio).toFixed(2),
              y: +(y * imgHeightZoomRadio).toFixed(2),
              width: +(width * imgWidthZoomRadio).toFixed(2),
              height: +(height * imgHeightZoomRadio).toFixed(2),
            }
            return (
              <Area
                key={coordinate.id}
                coordinate={newCoordinate}
                updateCoordinate={this.updateCoordinate}
                imgWidthZoomRadio={imgWidthZoomRadio}
                imgHeightZoomRadio={imgHeightZoomRadio}
              />
            )
          })}
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
