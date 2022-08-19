import { useParams } from "react-router-dom"

const SingleGame = () => {
    
    const params = useParams()
    return (
        <h1 style={{ color: 'red'}}>Test {params.id}</h1>
    )
}

type gameProps = {
    location?: any
}
export default SingleGame;