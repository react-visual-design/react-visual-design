/* eslint-disable */

import React from 'react'
import { getIconColor } from './helper'

const DEFAULT_STYLE = {
  display: 'block',
}

const Iconup = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M764.208 499.616 516.592 252 509.12 259.472 497.408 247.744 247.968 497.2 270.752 520 488 302.752 488 792 520 792 520 300.656 741.584 522.256Z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
    </svg>
  )
}

Iconup.defaultProps = {
  size: 18,
}

export default Iconup
