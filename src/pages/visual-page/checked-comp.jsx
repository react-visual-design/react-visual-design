import { PureComponent } from 'react'
import { Alert } from 'antd'
import * as VisualDesignComponents from 'react-visual-design-components'
import { map, isEmpty } from 'lodash'
import { Drop, Icon } from '@/components'

import styles from './checked-comp.less'

export default class SelectedComp extends PureComponent {
  state = {
    selectedList: [],
    showDrop: false,
    activeCompId: '',
  }

  componentDidMount() {
    window.addEventListener('message', e => {
      this.setState({ ...JSON.parse(e.data) })
    })
  }

  handleEditItemClick = (id, comp) => {
    window.parent.postMessage(
      JSON.stringify({
        func: 'handleEditItemClick',
        params: { id, compDefaultData: comp.defaultProps.data },
      }),
      '*',
    )
  }

  handleOperateItem = ({ type, index }, e) => {
    e.stopPropagation()
    window.parent.postMessage(
      JSON.stringify({ func: 'handleOperateItem', params: { type, index } }),
      '*',
    )
  }

  handleDrop = (index, { name }) => {
    window.parent.postMessage(JSON.stringify({ func: 'handleDrop', params: { index, name } }), '*')
  }

  render() {
    const { selectedList, showDrop, activeCompId } = this.state
    return (
      <>
        {map(selectedList, ({ name, id, data }, index) => {
          const Comp = VisualDesignComponents[name]
          const showUp = index > 0
          const showDown = index < selectedList.length - 1 && selectedList.length > 1
          if (Comp) {
            return (
              <div
                className={`${styles['comp-wrap']} ${
                  id === activeCompId ? styles['comp-wrap-active'] : ''
                }`}
                key={id}
                tabIndex="0"
              >
                <Drop show={showDrop} handleDrop={this.handleDrop.bind(this, index)} />
                <div className={styles['operate-wrap']}>
                  <Icon
                    className={styles['operate-item']}
                    type="edit"
                    size={24}
                    onClick={this.handleEditItemClick.bind(this, id, Comp)}
                  />
                  <Icon
                    className={styles['operate-item']}
                    type="delete"
                    size={24}
                    onClick={this.handleOperateItem.bind(this, { type: 'delete', index })}
                  />
                  {showUp && (
                    <Icon
                      className={styles['operate-item']}
                      type="up"
                      size={24}
                      onClick={this.handleOperateItem.bind(this, { type: 'up', index })}
                    />
                  )}
                  {showDown && (
                    <Icon
                      className={styles['operate-item']}
                      type="down"
                      size={24}
                      onClick={this.handleOperateItem.bind(this, { type: 'down', index })}
                    />
                  )}
                </div>
                <Comp data={data} />
              </div>
            )
          }
          return (
            <div key={`${index}-null`} className={styles['null-comp']}>
              该组件不存在
            </div>
          )
        })}
        <Drop show={showDrop} handleDrop={this.handleDrop.bind(this, selectedList.length)} />
        {isEmpty(selectedList) && <Alert message="请从左侧选择组件拖动到手机区域" type="info" />}
      </>
    )
  }
}
