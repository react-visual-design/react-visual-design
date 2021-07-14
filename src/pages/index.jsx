import { Link } from 'umi'

// import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd'

export default () => (
  <>
    <Link to="/visual-page">visual page</Link>
    {/* <SchemaForm
      onChange={values => {
        console.log(values)
        console.log(values.name.toHTML())
      }}
    >
      <Field type="string" name="name" title="Name" x-component="RichTextInput" />
    </SchemaForm> */}
  </>
)
