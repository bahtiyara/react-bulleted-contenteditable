import { useMemo } from "react"

export default function ContentEditable(props) {
    const { defaultValue, onChange, className, id, onFocus } = props

    const val = useMemo(() => defaultValue, [])

    // console.log(defaultValue)
    return (
        <div
            id={id}
            onFocus={onFocus}
            className={className}
            suppressContentEditableWarning
            contentEditable
            onBeforeInput={(e) => {
                if (e.target.innerText === "") {
                    // Create content
                    const div = document.createElement("div")
                    div.innerText = e.data
                    e.target.innerText = ""
                    e.target.appendChild(div)
                    // Move caret
                    var range = document.createRange()
                    range.setStart(e.target, 1)
                    var sel = window.getSelection()
                    sel.removeAllRanges()
                    sel.addRange(range)
                    // Callbacks
                    onChange(e, e.target.innerText)
                    e.preventDefault()
                }
            }}
            onInput={(e) => {
                if (e.target.innerText === "\n") e.target.innerText = ""
                onChange(e, e.target.innerText.replaceAll("\n\n", "\n"))
            }}
        >
            {renderContent(val)}
        </div>
    )
}

function renderContent(val) {
    if (val === "") {
        return
    } else {
        return val.split("\n").map((i, index) => <div key={index}>{i}</div>)
    }
}
