/* eslint-disable */

import React from 'react'
import { getIconColor } from './helper'

const DEFAULT_STYLE = {
  display: 'block',
}

const Icondelete = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M790.2150271 265.84582543L772.73852539 248.34460473 519.29217506 501.81567406 258.55364967 241.07714867 241.07714867 258.55364967 501.81567406 519.29217506 248.36932373 772.73852539 265.84582543 790.2150271 519.29217506 536.76867676 765.44635033 782.92285133 782.92285133 765.44635033 536.76867676 519.29217506Z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
    </svg>
  )
}

Icondelete.defaultProps = {
  size: 18,
}

export default Icondelete
