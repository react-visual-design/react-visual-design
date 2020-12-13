import { PureComponent } from 'react'
import { Link } from 'umi'
import * as AntdIcons from '@ant-design/icons'
import { v4 } from 'uuid'
import * as VisualDesignComponents from 'react-visual-design-components'
import { Button, Select, Modal, notification, Popover } from 'antd'
import { find, map, get } from 'lodash'
import IframeComm from 'react-iframe-comm'
import QRCode from 'qrcode.react'

import { DND, CompPropSetting, Devices } from '@/components'
import { formMoalAction } from '@/components/comp-prop-setting'
import { geVisualPageById, updateVisualPageData } from '@/service'
import deviceList from '@/util/device'
import { arrayIndexForward, arrayIndexBackward } from '@/util/array'
import styles from './edit.less'

const { Option } = Select

export default class Index extends PureComponent {
  state = {
    dragList: map(Object.values(VisualDesignComponents), v => {
      const { compAttr } = v
      const IconComp = AntdIcons[compAttr.iconName || 'StarOutlined']
      return {
        ...compAttr,
        key: compAttr.name,
        icon: <IconComp />,
      }
    }),
    selectedList: [],
    showDrop: false,
    activeCompId: '',
    selectedDevice: 'iphone-8',
    compSettingKey: v4(),
  }

  async componentDidMount() {
    this.pageId = get(this, 'props.location.query.pageId')
    if (this.pageId) {
      const res = await geVisualPageById(this.pageId)
      document.title = res.name
      this.setState({ selectedList: res.data || [] })
    }
  }

  handleDragStart = () => {
    this.setState({ showDrop: true })
  }

  handleDragEnd = () => {
    this.setState({ showDrop: false })
  }

  handleApplySetting = async () => {
    const { values } = await formMoalAction.submit()
    const { activeCompId, selectedList } = this.state
    const matchComp = find(selectedList, { id: activeCompId })
    if (!matchComp) {
      return false
    }
    matchComp.data = values
    return this.setState({ selectedList: [...selectedList] })
  }

  handleDeviceChange = val => {
    this.setState({ selectedDevice: val })
  }

  handleSaveBtnClick = async () => {
    await updateVisualPageData({ id: this.pageId, data: this.state.selectedList })
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
    return this.setState({
      activeCompId: id,
      selectedList: [...selectedList],
      compSettingKey: v4(),
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
    const data = JSON.parse(e.data)
    if (data.func) {
      this[data.func](data.params)
    }
  }

  render() {
    const {
      dragList,
      showDrop,
      selectedList,
      activeCompId,
      selectedDevice,
      compSettingKey,
    } = this.state
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
        <section className={styles.content}>
          <div className={styles.left}>
            <div className={styles.title}>组件库</div>
            <div className={styles.comp}>
              <p className={styles['comp-title']}>基础组件</p>
              <DND.Drag
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
              <IframeComm
                attributes={{
                  src: '/visual-page/selected-comp',
                  width: '100%',
                  height: '100%',
                  frameBorder: 0,
                }}
                postMessageData={{ selectedList, showDrop, activeCompId }}
                // handleReady={onReady}
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
            <CompPropSetting
              key={compSettingKey}
              schema={activeCompSchema}
              data={activeComp.data}
              id={activeComp.id}
              handlePropChange={this.handlePropChange}
            />
          </div>
        </section>
      </div>
    )
  }
}
