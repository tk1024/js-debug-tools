import Editor, { DiffEditor } from "@monaco-editor/react";
import { FC } from "react";
import styled from "styled-components";
import { TestExecuteResultType } from "../libs/testExecuter";

type Props = {
  result?: TestExecuteResultType
}

export const TestResultDetail: FC<Props> = (props) => {
  if (!props.result) {
    return null
  }

  return (
    <Wrapper>
      <Title>Result</Title>

      <Label>Diff</Label>
      <DiffEditor
        width="100%"
        height="100px"
        language="javascript"
        original={props.result.result.expectedOutput}
        modified={props.result.result.output}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />

      <Label>Execute code</Label>
      <div>
        <Editor
          width="100%"
          height="100px"
          defaultLanguage="javascript"
          value={props.result.executeSourceCode}
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 16px;
  padding: 16px;
  color: #fafafa;
  background-color: #333;
`

const Title = styled.div`
  font-size: 14px;
  margin: -16px -16px 16px -16px;
  padding: 4px 8px;
  background-color: #555;
`

const Label = styled.div`
  margin-top: 16px;
  font-size: 14px;
`