/* eslint-disable */

import { CSSProperties, DOMAttributes, FunctionComponent } from 'react'

interface Props extends DOMAttributes<SVGElement> {
  name: 'edit' | 'delete' | 'up' | 'down'
  size?: number
  color?: string | string[]
  style?: CSSProperties
  className?: string
}

declare const IconFont: FunctionComponent<Props>

export default IconFont
