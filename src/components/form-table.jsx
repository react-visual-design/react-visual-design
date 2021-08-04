import React from 'react'
import { Table, Space } from 'antd'
import { Form, FormButtonGroup, FormGrid, Submit, Reset } from '@formily/antd'
import { createForm } from '@formily/core'
import { SchemaField } from './'

const formTableIns = createForm()

export default class extends React.PureComponent {
  state = {
    pageSize: 10,
    current: 1,
    total: 0,
    loading: false,
    dataSource: [],
    filters: {},
  }

  componentDidMount() {
    this.getTableData()
  }

  getTableData = () => {
    const { fetchTableData } = this.props
    const { pageSize, current, filters } = this.state
    this.setState({ loading: true }, () => {
      fetchTableData({
        offset: pageSize * (current - 1),
        limit: pageSize,
        ...filters,
      }).then(res => {
        this.setState({ total: res.count, dataSource: res.rows, loading: false })
      })
    })
  }

  submit = filters => {
    this.setState({ filters, current: 1, total: 0 }, () => {
      this.getTableData()
    })
  }

  reset = () => {
    this.setState({ filters: {}, current: 1, total: 0 }, () => {
      this.getTableData()
    })
  }

  handleTableChange = ({ current }) => {
    this.setState({ current }, () => {
      this.getTableData()
    })
  }

  render() {
    const { schema, columns = [], headBtnGroup, rowKey = 'id' } = this.props
    const { dataSource, loading, current, pageSize, total } = this.state
    return (
      <>
        <Space direction="vertical">
          <div className="table-top-placeholder">{headBtnGroup}</div>
          {schema && (
            <Form form={formTableIns} onAutoSubmit={this.submit}>
              <FormGrid minColumns={1} maxColumns={4}>
                <SchemaField schema={schema} />
                <FormButtonGroup.FormItem>
                  <Submit>查询</Submit>
                  <Reset onClick={this.reset}>重置</Reset>
                </FormButtonGroup.FormItem>
              </FormGrid>
            </Form>
          )}
          <Table
            columns={columns}
            rowKey={rowKey}
            loading={loading}
            dataSource={dataSource}
            pagination={{ current, pageSize, total }}
            onChange={this.handleTableChange}
          />
        </Space>
      </>
    )
  }
}
