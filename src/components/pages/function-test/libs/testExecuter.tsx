export interface TestExecuteResultType {
  isPass: boolean
  executeSourceCode: string
  result: {
    output: any
    expectedOutput: any
  }
}

export const testExecuter = (input: string, expectedOutput: string, sourceCode: string): TestExecuteResultType => {
  console.log(11, input)
  try {
    const executeSourceCode = `const test = ${sourceCode};\n${input};`
    const output = eval(executeSourceCode)
    const expectedOutputVar = eval(`${expectedOutput}; expectedOutput;`)
    return {
      isPass: output === expectedOutputVar,
      executeSourceCode,
      result: {
        output,
        expectedOutput: expectedOutputVar
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        isPass: false,
        executeSourceCode: err.message,
        result: {
          output: "",
          expectedOutput: "",
        }
      }
    }
    throw Error()
  }
}