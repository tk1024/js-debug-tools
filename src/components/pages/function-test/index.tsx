import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { TestFunction } from "./components/TestFunction";
import { TestUnit } from "./components/TestUnit";
import styles from "./index.module.css";
import { produce } from "immer"
import { ulid } from 'ulid'
import { testExecuter, TestExecuteResultType } from "./libs/testExecuter";

type Store = {
  sourceCode: string
  test: { [id: string]: TestUnitType }
}

export type TestUnitType = {
  input: string
  output: string
  isOpen: boolean
  result?: TestExecuteResultType
}

const defaultSourceCode = `function test(str) {
  return str;
}`

const defaultInput = `test("test");`

const defaultOutput = `const expectedOutput = "test";`

export const FunctionTestIndex = () => {
  const [store, setStore] = useState<Store>({
    sourceCode: defaultSourceCode,
    test: {}
  })

  const handleChangeSourceCode = useCallback((sourceCode: string) => {
    setStore(produce((draft) => {
      draft.sourceCode = sourceCode
    }))
  }, [])

  const handleChangeInput = useCallback((id: string, input: string) => {
    setStore(produce((draft) => {
      draft.test[id].input = input
    }))
  }, [])

  const handleChangeOutput = useCallback((id: string, output: string) => {
    setStore(produce((draft) => {
      draft.test[id].output = output
    }))
  }, [])

  const handleToggle = useCallback((id: string) => {
    setStore(produce((draft) => {
      draft.test[id].isOpen = !draft.test[id].isOpen
    }))
  }, [])

  const handleAddTest = useCallback(() => {
    setStore(produce((draft) => {
      const id = ulid()
      draft.test[id] = {
        input: defaultInput,
        output: defaultOutput,
        isOpen: true,
      }
    }))
  }, [])

  const handleOpenAll = useCallback(() => {
    Object.entries(store.test).forEach(([id, test]) => {
      setStore(produce((draft) => {
        draft.test[id].isOpen = true
      }))
    })
  }, [store])

  const handleCloseAll = useCallback(() => {
    Object.entries(store.test).forEach(([id, test]) => {
      setStore(produce((draft) => {
        draft.test[id].isOpen = false
      }))
    })
  }, [store])

  const handleRunTestAll = useCallback(() => {
    Object.entries(store.test).forEach(([id, test]) => {
      setStore(produce((draft) => {
        draft.test[id].result = testExecuter(test.input, test.output, store.sourceCode)
      }))
    })
  }, [store])

  const handleRunTest = useCallback((id: string) => {
    setStore(produce((draft) => {
      draft.test[id].result = testExecuter(store.test[id].input, store.test[id].output, store.sourceCode)
    }))
  }, [store])


  const handleRemove = useCallback((id: string) => {
    setStore(produce((draft) => {
      delete draft.test[id]
    }))
  }, [store])


  useEffect(() => {
    handleAddTest()
  }, [])

  return (
    <div className={styles.page}>
      <TestCodeArea>
        <Buttons>
          <button onClick={handleRunTestAll}>Run All</button>
          <button onClick={handleAddTest}>Add Test</button>
          <button onClick={handleOpenAll}>Open All</button>
          <button onClick={handleCloseAll}>Close All</button>
        </Buttons>
        {Object.entries(store.test).map(([id, test]) => (
          <TestUnit
            key={id}
            id={id}
            onChangeInput={handleChangeInput}
            onChangeOutput={handleChangeOutput}
            onToggle={handleToggle}
            onRun={handleRunTest}
            onRemove={handleRemove}
            {...test}
          />
        ))}
      </TestCodeArea>
      <div className={styles.editor}>
        <TestFunction value={store.sourceCode} onChange={handleChangeSourceCode} />
      </div>
    </div>
  )
}

const TestCodeArea = styled.div`
  max-height: 100%;
  overflow: scroll;
  background-color: #333;
`

const Buttons = styled.div`
  margin: 16px;
  & > button {
    margin-right: 8px;
  }
`