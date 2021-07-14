import { isEmpty } from 'lodash'
import { Alert } from 'antd'
import { createForm } from '@formily/core'
import { Form, FormLayout } from '@formily/antd'
import { SchemaField } from '../'

export const propFormIns = createForm()

export default props => {
  const { id, schema } = props
  if (isEmpty(id)) {
    return <Alert message="请点击组件设置属性" type="info" />
  }
  if (isEmpty(schema)) {
    return <Alert message="该点击组件无设置属性" type="warning" />
  }
  console.log(schema)

  return (
    <Form form={propFormIns}>
      <FormLayout labelCol={6} wrapperCol={16}>
        <SchemaField schema={schema} />
      </FormLayout>
    </Form>
  )
}
