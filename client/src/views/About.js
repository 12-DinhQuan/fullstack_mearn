import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBarMenu from '../components/layout/NavBarMenu'

const About = () => {
    return (
        <NavBarMenu>
            <Row className='mt-5'>
                <Col className='text-center'>
                    <Button variant='primary' href='https://www.facebook.com/profile.php?id=100025352810031' size='lg'>
                        Facebook Profile
                    </Button>
                </Col>
            </Row>
        </NavBarMenu>
    )
}

export default About