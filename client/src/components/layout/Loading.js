import Spinner from 'react-bootstrap/Spinner'
import Auth from "../../views/Auth"

const Loading = () => {
    return (
        <Auth>
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant='info' />
            </div>
        </Auth>
    )
}

export default Loading