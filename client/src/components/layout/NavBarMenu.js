import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'



const NavBarMenu = ({ children }) => {
    const { authState: { user: { username } }, logoutUser } = useContext(AuthContext)

    const handleLogoutUser = () => logoutUser()

    return (
        <>
            <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
                <Navbar.Brand className='font-weight-border text-white'>
                    <img src={learnItLogo} width='32' height='32' className='mr-2' />
                    Learn it
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link className='font-weight-border text-white' to='/dashboarb' as={Link}>
                            Dashboarb
                        </Nav.Link>
                        <Nav.Link className='font-weight-border text-white' to='/about' as={Link}>
                            About
                        </Nav.Link>
                    </Nav>

                    <Nav style={{ marginLeft: 'auto', paddingRight: '20px' }}>
                        <Nav.Link className='font-weight-border text-white' disabled>
                            Welcome {username}
                        </Nav.Link>
                        <Button variant='danger' className='font-weight-border text-white' onClick={handleLogoutUser}>
                            <img src={logoutIcon} width='32' height='32' className='mr-2' />
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
        </>
    )
}

export default NavBarMenu