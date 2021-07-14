import React, { Component } from 'react'
import { Result, Button } from 'antd'
import { Link } from 'umi'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.error(error)
    return { hasError: true }
  }

  componentDidCatch() {
    // console.log(error, errorInfo)
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Link to="/">
              <Button type="primary" key="console">
                返回首页
              </Button>
            </Link>
          }
        />
      )
    }

    return this.props.children
  }
}
