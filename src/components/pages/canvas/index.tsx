import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { IframeInCanvas } from "./components/IframeInCanvas";
import styles from "./index.module.css";

const defaultScript = `
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvasSize = {
    width: 300,
    height: 300,
}

canvas.style.border = "1px solid #000"
canvas.width = canvasSize.width
canvas.height = canvasSize.height

// rect
ctx.fillStyle = "green"
ctx.fillRect(50, 50, 100, 100)

// arc
ctx.strokeStyle = "red"
ctx.beginPath();
ctx.arc(150, 150, 50, 0, 2 * Math.PI);
ctx.stroke();

// line dash
ctx.strokeStyle = "blue"
ctx.beginPath();
ctx.setLineDash([5, 5]);
ctx.moveTo(50, 250);
ctx.lineTo(200, 50);
ctx.stroke();

`

export const CanvasIndex = () => {
  const [scriptValue, setScript] = useState<string>(defaultScript)

  useEffect(() => {
    const cachedScript = localStorage.getItem('script')
    if (cachedScript) {
      setScript(cachedScript)
    }
  }, [])

  const handleChange = (value: string | undefined, ev: editor.IModelContentChangedEvent) => {
    if (value) {
      setScript(`${value}`)
      localStorage.setItem('script', value);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.result}>
        <IframeInCanvas scriptValue={scriptValue} />
      </div>
      <div className={styles.editor}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={scriptValue}
          onChange={handleChange}
          theme="vs-dark"
        />
      </div>
    </div>
  )
}