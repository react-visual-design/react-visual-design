import React, { PureComponent } from 'react'

import * as VisualDesignComponents from 'react-visual-design-components'
import { map, get } from 'lodash'
import { geVisualPageById } from '@/service'
import styles from './preview.less'

export default class Index extends PureComponent {
  state = {
    data: [],
  }

  async componentDidMount() {
    this.pageId = get(this, 'props.location.query.pageId')
    if (this.pageId) {
      const res = await geVisualPageById(this.pageId)
      document.title = res.name
      this.setState({ data: res.data || [] })
    }
  }

  render() {
    return map(this.state.data, ({ name, id, data }, index) => {
      const Comp = VisualDesignComponents[name]
      if (Comp) {
        return <Comp key={id} data={data} />
      }
      return (
        <div key={`${index}-null`} className={styles['null-comp']}>
          该组件不存在
        </div>
      )
    })
  }
}
