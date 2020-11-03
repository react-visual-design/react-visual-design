/* eslint-disable */

import React from 'react'
import { getIconColor } from './helper'

const DEFAULT_STYLE = {
  display: 'block',
}

const Icondown = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M764.208 540.384 741.584 517.744 520 739.344 520 248 488 248 488 737.248 270.752 520 247.968 542.8 497.408 792.256 509.12 780.528 516.592 788Z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
    </svg>
  )
}

Icondown.defaultProps = {
  size: 18,
}

export default Icondown
