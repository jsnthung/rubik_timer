import { useEffect, useState } from "react"

const Home = () => {
    const [times, setTimes] = useState(null)

    useEffect(() => {
        const fetchTimes = async () => {
            const response = await fetch('/api/times')
            const json = await response.json()

            if (response.ok) {
                setTimes(json)
            }
        }

        fetchTimes()
    }, [])

    return (
        <div className="home">
            <h2>Rubik's Cube Timer by me</h2>
            <div className="times">
                {times && times.map((time) => (
                    <p key={time._id}>{time.duration}</p>
                ))}
            </div>
        </div>
    )
}

export default Home