import Link from "next/link"

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/function-test">関数のテストをする</Link>
      </li>
      <li>
        <Link href="/canvas">Canvasを書いて確認するツール</Link>
      </li>
    </ul>
  )
}