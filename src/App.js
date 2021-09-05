import { useState } from "react"
import ContentEditable from "./ContentEditable"
import "./App.css"

export default function App() {
    const defaultValue = ""
    const [data, setData] = useState(defaultValue)
    const [heights, setHeights] = useState([])

    return (
        <div className="app">
            <ContentEditable
                className="textarea"
                onChange={(e, val) => {
                    setData(val)
                    setHeights(textHeights(e.target))
                }}
                defaultValue={defaultValue}
            />
            <div className="bullets">
                {data.split("\n").map((i, index) => (
                    <Bullet height={heights[index]} key={index} />
                ))}
            </div>
        </div>
    )
}

function Bullet({ height }) {
    return (
        <div style={{ height }} className="bullet">
            <div className="dot"></div>
        </div>
    )
}

const textHeights = (target) => {
    let heights = []
    const children = target.children
    for (const el of children) {
        heights.push(el.offsetHeight)
    }
    return heights
}
