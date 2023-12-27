import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { putUser } from '../services/UserService'

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUser } = props
  const [name, setName] = useState('')
  const [job, setJob] = useState('')

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await putUser(name, job, dataUserEdit.id)
      if (res?.updatedAt) {
        handleEditUser({ first_name: name, id: dataUserEdit.id })
        toast.success('Update successful')
        handleClose()
        setName('')
        setJob('')
      }
    } catch (error) {
      toast.error(error.message || error)
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
        <Modal.Title>Edit A User</Modal.Title>
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
              Cancel
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

export default ModalEditUser
