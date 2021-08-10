import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { connect } from '@formily/react'

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

export default connect(props => {
  return (
    <BraftEditor
      style={{ border: '1px solid #d1d1d1', borderRadius: '5px' }}
      controls={controls}
      value={BraftEditor.createEditorState(props.value)}
      onChange={editorState => props.onChange(editorState.toHTML())}
    />
  )
})
