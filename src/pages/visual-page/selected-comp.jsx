import { PureComponent } from 'react'
import * as VisualDesignComponents from 'react-visual-design-components'
import { map, isEmpty } from 'lodash'

import { DND, IconFont } from '@/components'

import styles from './selected-comp.less'

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
                <DND.Drop show={showDrop} handleDrop={this.handleDrop.bind(this, index)} />
                <div className={styles['operate-wrap']}>
                  <IconFont
                    className={styles['operate-item']}
                    name="edit"
                    size={24}
                    onClick={this.handleEditItemClick.bind(this, id, Comp)}
                  />
                  <IconFont
                    className={styles['operate-item']}
                    name="delete"
                    size={24}
                    onClick={this.handleOperateItem.bind(this, { type: 'delete', index })}
                  />
                  {showUp && (
                    <IconFont
                      className={styles['operate-item']}
                      name="up"
                      size={24}
                      onClick={this.handleOperateItem.bind(this, { type: 'up', index })}
                    />
                  )}
                  {showDown && (
                    <IconFont
                      className={styles['operate-item']}
                      name="down"
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
        <DND.Drop show={showDrop} handleDrop={this.handleDrop.bind(this, selectedList.length)} />
        {isEmpty(selectedList) && (
          <h3 className={styles.emptyTip}>请从左侧选择组件拖动到手机区域</h3>
        )}
      </>
    )
  }
}
