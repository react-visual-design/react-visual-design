import { createFromIconfontCN } from '@ant-design/icons'

const Icon = createFromIconfontCN({
  scriptUrl: ICON_FONT_URL,
})

export default ({ type, style = {}, spin = false, ...rest }) => (
  <Icon type={`icon-${type}`} style={{ ...style, fontSize: '20px' }} spin={spin} {...rest} />
)
