import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'


const AddPostModal = () => {

    const { showAddModal, setShowAddModal, addPost, setShowToast } = useContext(PostContext)

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const { title, description, url } = newPost

    const onChangePostForm = event => setNewPost({ ...newPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowAddModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await addPost(newPost)
        closeDialog()
        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'danger'
        })
    }

    return (
        <Modal show={showAddModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control value={title} onChange={onChangePostForm} type="text" placeholder='Title' name="title" required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={description} onChange={onChangePostForm} as='textarea' row={3} placeholder='Description' className='mt-16' name="description" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={url} onChange={onChangePostForm} type="text" placeholder='Url' name="url" className='mt-16' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Learn</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal