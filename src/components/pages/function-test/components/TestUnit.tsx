import { FC, useCallback } from "react";
import styled from "styled-components";
import { TestUnitType } from "..";
import { TestInput } from "./TestInput";
import { TestOutput } from "./TestOutput";
import { TestResultDetail } from "./TestResultDetail";

type Props = {
  id: string
  onChangeInput: (id: string, input: string) => void
  onChangeOutput: (id: string, output: string) => void
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onRun: (id: string) => void
} & TestUnitType

export const TestUnit: FC<Props> = (props) => {

  const handleChangeInput = useCallback((input: string) => {
    props.onChangeInput(props.id, input)
  }, [props.id, props.onChangeInput])

  const handleChangeOutput = useCallback((output: string) => {
    props.onChangeOutput(props.id, output)
  }, [props.id, props.onChangeOutput])

  const handleToggle = useCallback(() => {
    props.onToggle(props.id)
  }, [props.id, props.onToggle])

  const handleRun = useCallback(() => {
    props.onRun(props.id)
  }, [props.id, props.onRun])

  const handleRemove = useCallback(() => {
    props.onRemove(props.id)
  }, [props.id, props.onRemove])

  console.log(39, props)

  const status = props.result ? props.result.isPass ? "PASS" : "FAILED" : ""

  return (
    <Wrapper className={status}>
      <Header>
        <ID>ID: {props.id.substr(-5)}</ID>
        <Buttons>
          <button onClick={handleToggle}>{props.isOpen ? "close" : "open"}</button>
          <button onClick={handleRun}>Run Test</button>
          <button onClick={handleRemove}>Remove</button>
        </Buttons>
      </Header>
      {props.isOpen && (
        <>
          <Label>Input</Label>
          <TestInput value={props.input} onChange={handleChangeInput} />
          <Label>Expected Output</Label>
          <TestOutput value={props.output} onChange={handleChangeOutput} />
          <TestResultDetail result={props.result} />
        </>
      )
      }
    </Wrapper >
  )
}

const Wrapper = styled.div`
  margin: 16px;
  padding: 16px;
  background-color: #fafafa;
  border-radius: 4px;
  box-shadow: 0 0 6px #333;
  border: 4px solid #fafafa;
  &.FAILED {
    border-color: #e5534b;
  }
  &.PASS {
    border-color: #46954a;
  }
`

const Label = styled.div`
  margin-top: 16px;
  font-size: 14px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Buttons = styled.div`
  & > button {
    margin-right: 8px;
  }
`

const ID = styled.div`
  font-size: 14px;
`