import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { FC, useCallback } from "react";

interface Props {
  value: string
  onChange: (input: string) => void
}

export const TestOutput: FC<Props> = (props) => {

  const handleChange = useCallback((value: string | undefined, ev: editor.IModelContentChangedEvent) => {
    if (value) {
      props.onChange(value)
    }
  }, [props.onChange])

  return (
    <div>
      <Editor
        width="100%"
        height="80px"
        defaultLanguage="javascript"
        value={props.value}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  )
}