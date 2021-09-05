export default function ContentEditable(props) {
    const { defaultValue, onChange, className, id } = props
    return (
        <div
            id={id}
            className={className}
            suppressContentEditableWarning
            contentEditable
            onBeforeInput={(e) => {
                if (["", "\n"].includes(e.target.innerText)) {
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
                    onChange(e, adjustVal(e.target.innerText))
                    e.preventDefault()
                }
            }}
            onInput={(e) => {
                onChange(e, adjustVal(e.target.innerText))
            }}
        >
            {renderContent(defaultValue)}
        </div>
    )
}

function adjustVal(val) {
    if (val === "\n") {
        return ""
    } else {
        return val.replaceAll("\n\n", "\n")
    }
}

function renderContent(val) {
    if (val === "") {
        return
    } else {
        return val.split("\n").map((i, index) => <div key={index}>{i}</div>)
    }
}
