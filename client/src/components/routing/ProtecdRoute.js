import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'

const ProtecdRoute = ({ element: Element, ...rest }) => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation='border' variant='info' />
            </div>
        )
    }

    return (
        <div>
            <Route {...rest} />
        </div>
    )
}

export default ProtecdRoute