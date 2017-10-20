import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/github'

export default ({ value, onChange }) => (
    <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        value={value}
        name="editor"
        editorProps={{ $blockScrolling: true }}
    />
)
