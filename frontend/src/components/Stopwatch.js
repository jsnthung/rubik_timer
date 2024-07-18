import React, { useState, useEffect, useRef } from 'react'

// TODO: Maybe create a class of duration. It will have a time property of type number, then a function to convert it into human readable time 00:00:00.00

const Stopwatch = () => {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const spacebarDownTime = useRef(null)
    const [message, setMessage] = useState('Hold down spacebar')

    useEffect(() => {
        let intervalId

        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1), 10)
        }

        return () => clearInterval(intervalId)
    }, [isRunning, time])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isRunning) {
                setIsRunning(false)
                setMessage('Hold down spacebar')
            } else if (event.key === " " && spacebarDownTime.current === null) {
                spacebarDownTime.current = Date.now()
                setMessage('Hold down spacebar')
            }
        }

        const handleKeyUp = (event) => {
            if (event.key === " " && spacebarDownTime.current !== null) {
                const pressDuration = Date.now() - spacebarDownTime.current

                if (pressDuration >= 1000) {
                    setTime(0)
                    setIsRunning(true)
                    setMessage('Press any key to stop')
                } 
                // else {
                //     setIsRunning(prevState => !prevState)
                //     setMessage(prevState => (prevState === 'Press any key to stop' ? 'Hold down spacebar' : 'Press any key to stop'))
                // }

                spacebarDownTime.current = null  
            } 
        }

        const handleKeyPress = () => {
            if (spacebarDownTime.current !== null) {
                const pressDuration = Date.now() - spacebarDownTime.current
                if (pressDuration >= 1000) {
                    setMessage('Release to start')
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('keypress', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('keypress', handleKeyPress)
        }
    })

    const hours = Math.floor(time / 360000)
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const milliseconds = time % 100

    return (
        <div className='stopwatch-container'>
            <p className='stopwatch-time'>
                {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}.{milliseconds.toString().padStart(2, "0")}
            </p>
            <div>
                {message}
            </div>
        </div>
    )
}

export default Stopwatch