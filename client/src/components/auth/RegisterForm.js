import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Auth from "../../views/Auth"
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessger from '../layout/AlertMessger'



const RegisterForm = () => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmpassword: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password, confirmpassword } = registerForm

    // contexts
    const { registerUser } = useContext(AuthContext)


    const onChangeRegisterForm = (event) => {
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })
    }

    const handleRegisterForm = async (event) => {
        event.preventDefault()

        if (password !== confirmpassword) {
            setAlert({ type: 'danger', message: 'Password do noy match' })
            setTimeout(() => setAlert(null), 5000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Auth>
            <Form className='my-4' onSubmit={handleRegisterForm}>
                <AlertMessger info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='mt-16'>
                    <Form.Control
                        type="password"
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='mt-16'>
                    <Form.Control
                        type="password"
                        placeholder='ConfirmPassword'
                        name='confirmpassword'
                        required
                        value={confirmpassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant='success' type="submit" className='mt-16'>Tạo tài khoản</Button>
            </Form>
            <p className='mt-16'>
                Bạn đã có tài khoản?
                <Link to='/login'>
                    <Button variant='info' size='sm' className="ml-2">Đăng nhập</Button>
                </Link>
            </p>
        </Auth>
    )
}

export default RegisterForm