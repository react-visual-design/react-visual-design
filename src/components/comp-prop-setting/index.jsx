import { isEmpty } from 'lodash'
import { Alert } from 'antd'

import { Form, FormLayout } from '@formily/antd'
import { SchemaField } from '../'

export default props => {
  const { id, schema, propFormIns } = props
  if (isEmpty(id)) {
    return <Alert message="请点击组件设置属性" type="info" />
  }
  if (isEmpty(schema)) {
    return <Alert message="该点击组件无设置属性" type="warning" />
  }

  return (
    <Form form={propFormIns}>
      <FormLayout labelCol={6} wrapperCol={16}>
        <SchemaField schema={schema} />
      </FormLayout>
    </Form>
  )
}
