import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'


const UpdatePostModal = () => {

    const { postStates: { post }, showUpdateModal, setShowUpdateModal, updatePost, setShowToast } = useContext(PostContext)

    const [updatedPost, setUpdatedPost] = useState(post)

    const { title, description, url, status } = updatedPost

    useEffect(() => setUpdatedPost(post), [post])

    const onChangeUpdatedPostForm = event => setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        // setNewPost({
        //     title: '',
        //     description: '',
        //     url: '',
        //     status: 'TO LEARN'
        // })
        setShowUpdateModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await updatePost(updatedPost)
        setShowUpdateModal(false)
        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'danger'
        })
    }

    return (
        <Modal show={showUpdateModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making process?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control value={title} onChange={onChangeUpdatedPostForm} type="text" placeholder='Title' name="title" required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={description} onChange={onChangeUpdatedPostForm} as='textarea' row={3} placeholder='Description' className='mt-16' name="description" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control value={url} onChange={onChangeUpdatedPostForm} type="text" placeholder='Url' name="url" className='mt-16' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name="status" onChange={onChangeUpdatedPostForm} className='mt-16'>
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
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

export default UpdatePostModal