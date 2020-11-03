import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

import { Modal } from 'antd'
import { isFunction } from 'lodash'

import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import * as allComp from '@formily/antd-components'

const formMoalAction = createAsyncFormActions()
class FormModal extends PureComponent {
  state = {
    visible: false,
    confirmLoading: false,
    title: '',
  }

  showModal = async ({ values, title }) => {
    this.setState(
      {
        visible: true,
        confirmLoading: false,
        title,
      },
      () => {
        formMoalAction.setFormState(state => (state.values = values))
      },
    )
  }

  handleOk = () => {
    const { onOk } = this.props
    formMoalAction
      .submit()
      .then(res => {
        this.setState({ confirmLoading: true }, () =>
          onOk(res.values).then(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
              title: '',
            })
          }),
        )
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  handleCancel = async () => {
    const { onCancel } = this.props
    if (isFunction(onCancel)) {
      onCancel()
    }
    await formMoalAction.reset({ validate: false })
    this.setState({
      visible: false,
      confirmLoading: false,
      title: '',
    })
  }

  render() {
    const { visible, confirmLoading, title } = this.state
    const { schema, effects } = this.props
    return (
      <Modal
        title={title}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        maskClosable={false}
      >
        <SchemaForm
          labelCol={6}
          wrapperCol={16}
          components={{ ...allComp, TextArea: allComp.Input.TextArea }}
          schema={schema}
          actions={formMoalAction}
          effects={effects}
        />
      </Modal>
    )
  }
}

FormModal.propTypes = {
  onOk: propTypes.func,
  onCancel: propTypes.func,
  schema: propTypes.object,
  effects: propTypes.func,
}

FormModal.defaultProps = {
  onOk: () => {},
  onCancel: () => {},
  effects: () => {},
}

export default FormModal
