import { useState } from "react/cjs/react.development";

export function useTempError(duration = 5)
{
    const [error, setError] = useState(null)

    const defineError = (msg) => {
        setError(msg)

        setTimeout(() => {
            setError(null)
        }, duration * 1000)
    }

    return [error, defineError]
}