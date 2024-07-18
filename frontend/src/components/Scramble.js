import React, { useState } from 'react'

const Scramble = () => {
    const generateScrambleSequence = () => {
        const faces = ['R', 'L', 'F', 'B', 'U', 'D']
        const directions = ['', "'", '2']

        const scrambleLength = Math.floor(Math.random() * 5) + 16

        let sequence = []
        let prev_face = ""

        while (sequence.length < scrambleLength) {
            let turn_face = faces[Math.floor(Math.random() * 6)]
            while (turn_face === prev_face) {
                turn_face = faces[Math.floor(Math.random() * 6)]
            }

            let turn_direction = directions[Math.floor(Math.random() * 3)]
            let turn = turn_face + turn_direction

            sequence.push(turn)

            prev_face = turn_face
        }

        return sequence.join(' ')
    }

    const [scramble, setScramble] = useState(generateScrambleSequence)

    const generateNewScramble = () => {
        setScramble(generateScrambleSequence)
    }

    return (
        <div>
            <p>{scramble}</p>
            <button onClick={generateNewScramble}>New scramble</button>
        </div>
    )
}

export default Scramble