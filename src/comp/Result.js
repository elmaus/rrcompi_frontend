import React from 'react'

export default function Result(props) {
    return (
        <div>
            <h1>{props.data}</h1>
            <button onClick={(b) => props.back("")}>Back</button>
        </div>
    )
}
