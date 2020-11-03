import React from 'react'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import { isEmpty } from 'lodash'
import * as allComp from '@formily/antd-components'

const formMoalAction = createAsyncFormActions()
const components = {
  Radio: allComp.Radio.Group,
  Checkbox: allComp.Checkbox.Group,
  TextArea: allComp.Input.TextArea,
  DateRangePicker: allComp.DatePicker.RangePicker,
  YearPicker: allComp.DatePicker.YearPicker,
  MonthPicker: allComp.DatePicker.MonthPicker,
  WeekPicker: allComp.DatePicker.WeekPicker,
  TimeRangePicker: allComp.TimePicker.RangePicker,
  ...allComp,
}
export { formMoalAction, components }

export default props => {
  const { schema, id, data } = props
  if (isEmpty(id)) {
    return <p>请点击组件设置属性</p>
  }
  if (isEmpty(schema)) {
    return <p>该点击组件无设置属性</p>
  }
  return (
    <SchemaForm
      labelCol={6}
      wrapperCol={16}
      value={data}
      schema={schema}
      actions={formMoalAction}
      components={components}
    />
  )
}
