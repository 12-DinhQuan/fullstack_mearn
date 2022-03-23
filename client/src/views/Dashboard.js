import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBarMenu from '../components/layout/NavBarMenu'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import UpdatePostModal from '../components/posts/UpdatePostModal'

const Dashboard = () => {
    const { authState: { user: { username } } } = useContext(AuthContext)
    const { postStates: { post, posts, postLoading }, getPost, setShowAddModal, showToast: { show, message, type }, setShowToast } = useContext(PostContext)

    useEffect(() => getPost(), [])

    let body = null

    if (postLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <Card className="text-center mx-5 my-5">
                <Card.Header as='h1'>
                    Hi {username}
                </Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to Learning</Card.Title>
                    <Card.Text>Click the button below to track your learning</Card.Text>
                    <Button variant='primary' onClick={setShowAddModal.bind(this, true)}>Learn</Button>
                </Card.Body>
            </Card>
        )
    } else {
        body = (
            <>
                <Row className='row-col-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map((post) => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>

                <Button className='btn-floating' onClick={setShowAddModal.bind(this, true)}>
                    <img src={addIcon} width='60' height='60' />
                </Button>
            </>
        )
    }

    return (
        <NavBarMenu >
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}
            <Toast
                show={show}
                style={{ position: 'fixed', top: '10%', right: '10px' }}
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null
                })}
                delay={3000}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </NavBarMenu>
    )
}

export default Dashboard