import { useState, useEffect } from "react"
import BulletedTextarea from "./BulletedTextarea"

export default function () {
    const [instances, setInstances] = useState("Wow")

    useEffect(() => {
        console.log(instances)
    }, [instances])

    return (
        <BulletedTextarea
            onChange={(val) => setInstances(val)}
            defaultValue={instances}
        />
    )
}
