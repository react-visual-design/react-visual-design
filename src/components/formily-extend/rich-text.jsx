import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { connect, mapProps } from '@formily/react'
import { LoadingOutlined } from '@ant-design/icons'

const controls = [
  'bold',
  'italic',
  'underline',
  'text-color',
  'separator',
  'link',
  'separator',
  'media',
]

const RichText = props => {
  return (
    <BraftEditor
      style={{ border: '1px solid #d1d1d1', borderRadius: '5px' }}
      controls={controls}
      value={BraftEditor.createEditorState(props.value)}
      onChange={editorState => props.onChange(editorState.toHTML())}
    />
  )
}

export const Select = connect(
  RichText,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon: field?.loading || field?.validating ? <LoadingOutlined /> : props.suffixIcon,
      }
    },
  ),
)

export default Select
