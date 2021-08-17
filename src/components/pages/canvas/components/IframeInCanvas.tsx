import styles from "../index.module.css";

interface Props {
  scriptValue: string
}

const generateIframeSrc = (scriptValue: string): string => {
  const html = `
  <html>
    <head>
      <style>html, body { all: unset; }</style>
    </head>
    <body>
      <canvas id="canvas"></canvas>
      <div id="errorLog"></div>
    </body>
    <script>
      ${scriptValue}
    </script>
  </html>
  `
  return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
}

export const IframeInCanvas = (props: Props) => {
  return (
    <iframe
      className={styles.iframe}
      src={generateIframeSrc(props.scriptValue)}
      sandbox="allow-scripts"
    />
  )
}