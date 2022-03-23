import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import Auth from "../../views/Auth"
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessger from '../layout/AlertMessger'

const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm

    // contexts
    const { loginUser } = useContext(AuthContext)
    // Router 
    let navigate = useNavigate()


    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const handleLoginForm = async (event) => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                navigate('/dashboarb')
            } else {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Auth>
            <Form className='my-4' onSubmit={handleLoginForm}>
                <AlertMessger info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder='Username'
                        name='username'
                        value={username}
                        required
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className='mt-16'>
                    <Form.Control
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={password}
                        required
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant='success' type="submit" className='mt-16'>Login</Button>
            </Form>
            <p className='mt-16'>
                Bạn chưa có tài khoản?
                <Link to='/register'>
                    <Button variant='info' size='sm' className="ml-2">Tạo tài khoản</Button>
                </Link>
            </p>
        </Auth>
    )
}

export default LoginForm