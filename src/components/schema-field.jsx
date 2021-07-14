import * as allComp from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { Icon } from './index'
import RichText from './formily-extend/rich-text'

export default createSchemaField({
  components: {
    Radio: allComp.Radio.Group,
    Checkbox: allComp.Checkbox.Group,
    TextArea: allComp.Input.TextArea,
    DateRangePicker: allComp.DatePicker.RangePicker,
    YearPicker: allComp.DatePicker.YearPicker,
    MonthPicker: allComp.DatePicker.MonthPicker,
    WeekPicker: allComp.DatePicker.WeekPicker,
    TimeRangePicker: allComp.TimePicker.RangePicker,
    RichText,
    ...allComp,
  },
  scope: {
    icon: (type, style) => <Icon type={type} style={style} />,
  },
})
