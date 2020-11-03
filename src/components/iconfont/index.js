/* eslint-disable */

import React from 'react'
import Iconedit from './Iconedit'
import Icondelete from './Icondelete'
import Iconup from './Iconup'
import Icondown from './Icondown'

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'edit':
      return <Iconedit {...rest} />
    case 'delete':
      return <Icondelete {...rest} />
    case 'up':
      return <Iconup {...rest} />
    case 'down':
      return <Icondown {...rest} />
  }

  return null
}

export default IconFont
