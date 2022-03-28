import { PureComponent } from 'react'
import { Link } from 'umi'
import * as AntdIcons from '@ant-design/icons'
import { createForm } from '@formily/core'
import { v4 } from 'uuid'
import * as VisualDesignComponents from 'react-visual-design-components'
import { Iframe } from 'react-visual-design-components'
import { Button, Select, Modal, notification, Popover } from 'antd'
import _, { find, map, get } from 'lodash'
import QRCode from 'qrcode.react'
import { Drag, CompPropSetting, Devices } from '@/components'
import { geVisualPageById, updateVisualPage } from '@/service'
import deviceList from '@/util/device'
import { arrayIndexForward, arrayIndexBackward } from '@/util/array'
import styles from './edit.less'

const { Option } = Select

let propFormIns
export default class Index extends PureComponent {
  state = {
    dragList: _(Object.values(VisualDesignComponents))
      .map(v => {
        const { compAttr } = v
        if (!compAttr) {
          return false
        }
        const IconComp = AntdIcons[compAttr.iconName || 'StarOutlined']
        return {
          ...compAttr,
          key: compAttr.name,
          icon: <IconComp />,
        }
      })
      .compact()
      .value(),
    selectedList: [],
    showDrop: false,
    activeCompId: '',
    selectedDevice: 'iphone-8',
  }

  async componentDidMount() {
    this.pageId = get(this, 'props.location.query.pageId')
    if (this.pageId) {
      const res = await geVisualPageById(this.pageId)
      document.title = res.title
      this.setState({ selectedList: get(res, 'data.data') || [] })
    }
  }

  handleDragStart = () => {
    this.setState({ showDrop: true })
  }

  handleDragEnd = () => {
    this.setState({ showDrop: false })
  }

  handleApplySetting = async () => {
    const { activeCompId, selectedList } = this.state
    const matchComp = find(selectedList, { id: activeCompId })
    if (!matchComp) {
      return false
    }
    try {
      matchComp.data = await propFormIns.submit()
      return this.setState({ selectedList: [...selectedList] })
    } catch (err) {
      return console.error(err)
    }
  }

  handleDeviceChange = val => {
    this.setState({ selectedDevice: val })
  }

  handleSaveBtnClick = async () => {
    await updateVisualPage({ _id: this.pageId, data: this.state.selectedList })
    notification.success({
      message: '保存成功',
      duration: 2,
    })
  }

  handleOperateItem({ type, index }) {
    const { selectedList } = this.state
    if (type === 'delete') {
      Modal.confirm({
        title: '确定删除该组件?',
        icon: <AntdIcons.ExclamationCircleOutlined />,
        content: '删除之后,将不能恢复',
        onOk: () => {
          selectedList.splice(index, 1)
          this.setState({ selectedList: [...selectedList] })
        },
      })
    } else if (type === 'up') {
      const newSelectedList = arrayIndexForward(selectedList, index)
      this.setState({ selectedList: [...newSelectedList] })
    } else if (type === 'down') {
      const newSelectedList = arrayIndexBackward(selectedList, index)
      this.setState({ selectedList: [...newSelectedList] })
    }
  }

  handleEditItemClick({ id, compDefaultData }) {
    const { selectedList, activeCompId } = this.state
    if (id === activeCompId) {
      return false
    }
    const matchComp = find(selectedList, { id })
    matchComp.data = matchComp.data || compDefaultData
    propFormIns = createForm()
    propFormIns.setValues(_.cloneDeep(matchComp.data), 'overwrite')
    return this.setState({
      activeCompId: id,
      selectedList: [...selectedList],
    })
  }

  handleDrop = ({ index, name }) => {
    const { selectedList } = this.state
    const id = v4()
    selectedList.splice(index, 0, { name, id })
    this.setState({
      selectedList: [...selectedList],
    })
  }

  onReceiveMessage = e => {
    try {
      const data = JSON.parse(e.data)
      if (_.isFunction(this[data.func])) {
        this[data.func](data.params)
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { dragList, showDrop, selectedList, activeCompId, selectedDevice } = this.state
    const activeComp = find(selectedList, { id: activeCompId }) || {}
    const activeCompSchema = get(VisualDesignComponents, `${activeComp.name}.propSchema`)
    return (
      <div className={styles.page}>
        <section className={styles.head}>
          <div className={styles.title}>react 可视化设计</div>
          <div className={styles['operate-region']}>
            <Button type="primary" onClick={this.handleSaveBtnClick}>
              保存
            </Button>
            <Popover
              content={
                <QRCode value={`${qrcodeUrlPrefix}/visual-page/preview?pageId=${this.pageId}`} />
              }
              title="保存后可以扫码预览"
            >
              <Button>扫码预览</Button>
            </Popover>
            <Link to="/visual-page">返回</Link>
          </div>
          <div>
            <a
              href="https://github.com/react-visual-design/react-visual-design"
              className={styles['github-link']}
              target="_blank"
            />
          </div>
        </section>
        <div className={styles.left}>
          <div className={styles.title}>组件库</div>
          <div className={styles.comp}>
            <p className={styles['comp-title']}>基础组件</p>
            <Drag
              data={dragList}
              renderChild={({ title, icon }) => (
                <div className={styles['comp-item']}>
                  {icon}
                  <span>{title}</span>
                </div>
              )}
              handleDragStart={this.handleDragStart}
              handleDragEnd={this.handleDragEnd}
            />
          </div>
        </div>
        <div className={styles.center}>
          <Select
            className={styles.deviceSelect}
            value={selectedDevice}
            style={{ width: 150 }}
            onChange={this.handleDeviceChange}
          >
            {map(deviceList, ({ title, value }) => (
              <Option key={value} value={value}>
                {title}
              </Option>
            ))}
          </Select>

          <Devices deviceName={selectedDevice}>
            <Iframe
              attributes={{
                src: '#/visual-page/checked-comp',
                width: '100%',
                height: '100%',
                frameBorder: 0,
              }}
              postMessageData={{ selectedList, showDrop, activeCompId }}
              handleReceiveMessage={this.onReceiveMessage}
            />
          </Devices>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>属性设置</span>
            {activeComp.id && (
              <Button type="primary" onClick={this.handleApplySetting}>
                应用
              </Button>
            )}
          </div>
          <div className={styles.content}>
            <CompPropSetting
              schema={activeCompSchema}
              key={activeCompId}
              id={activeCompId}
              propFormIns={propFormIns}
              handlePropChange={this.handlePropChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
