import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { postUser } from '../services/UserService'

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props
  const [name, setName] = useState('')
  const [job, setJob] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await postUser(name, job)
      if (res) {
        handleUpdateTable({ first_name: name, id: res.id })
        toast.success('Create successful')
        handleClose()
        setName('')
        setJob('')
      }
    } catch (error) {
      toast.error(`Error: ${error}`)
      console.error(error)
    }
  }

  const handleHide = () => {
    handleClose()
    setName('')
    setJob('')
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formJob">
            <Form.Label>Job</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter job"
              value={job}
              onChange={(event) => setJob(event.target.value)}
            />
          </Form.Group>
          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={handleHide}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAddNew
