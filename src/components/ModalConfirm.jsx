import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { deleteUser } from '../services/UserService'

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUser } = props

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      const res = await deleteUser(dataUserDelete.id)
      if (+res === 204) {
        handleDeleteUser(dataUserDelete.id)
        toast.success('Delete successful')
        handleClose()
      }
    } catch (error) {
      toast.error(error.message || error)
      console.error(error)
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete &quot;{dataUserDelete.first_name}&quot;
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm
