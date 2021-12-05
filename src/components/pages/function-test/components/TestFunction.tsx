import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { FC } from "react";

interface Props {
  value: string
  onChange: (code: string) => void
}

export const TestFunction: FC<Props> = (props) => {
  
  const handleChange = (value: string | undefined, ev: editor.IModelContentChangedEvent) => {
    if (value) {
      props.onChange(value)
    }
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={props.value}
      onChange={handleChange}
      theme="vs-dark"
    />
  )
}