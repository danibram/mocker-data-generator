import brace from 'brace'
import { split } from 'react-ace'
const Split = split
import 'brace/mode/javascript'
import 'brace/theme/monokai'

export default ({ value, output, onChange }) => (
    <Split
        mode="javascript"
        theme="monokai"
        splits={2}
        orientation="beside"
        onChange={onChange}
        value={[value, output]}
        name="editor"
        height="600px"
        width="100%"
        editorProps={{ $blockScrolling: true }}
    />
)
