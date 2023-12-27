import { useDebounce } from '@uidotdev/usehooks'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'
import { Button, Container, FloatingLabel, Form, Table } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import {
  FaArrowDownLong,
  FaArrowUpLong,
  FaCirclePlus,
  FaFileArrowDown,
  FaFileImport,
} from 'react-icons/fa6'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import { fetchUsers } from '../services/UserService'
import ModalAddNew from './ModalAddNew'
import ModalConfirm from './ModalConfirm'
import ModalEditUser from './ModalEditUser'

const TableUsers = () => {
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  const getUsers = async (page) => {
    try {
      const res = await fetchUsers(page)
      if (res?.data) {
        setUsers(res.data)
        setTotalPages(res.total_pages)
      }
    } catch (error) {
      toast.error(error.message || error)
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handlePageClick = (event) => getUsers(+event.selected + 1)

  const handleUpdateTable = (user) => setUsers([user, ...users])

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})

  const handleEditUser = (user) => {
    const index = users.findIndex((item) => item.id === user.id)
    users[index].first_name = user.first_name
  }

  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
  const [dataUserDelete, setDataUserDelete] = useState({})

  const handleDeleteUser = (id) => {
    const index = users.findIndex((item) => item.id === id)
    users.splice(index, 1)
  }

  const [sortBy, setSortBy] = useState({ id: 'asc', first_name: 'asc' })

  const handleSort = (field, sortBy) => {
    users.sort((a, b) => {
      const valueA = JSON.stringify(a[field]).toUpperCase()
      const valueB = JSON.stringify(b[field]).toUpperCase()

      if (valueA < valueB) return -1
      if (valueA > valueB) return 1
      return 0
    })

    if (sortBy === 'desc') users.reverse()
  }

  const [searchEmail, setSearchEmail] = useState('')
  const debounceSearchEmail = useDebounce(searchEmail, 300)

  useEffect(() => {
    if (debounceSearchEmail) {
      const tmp = users.filter((user) =>
        user.email.includes(debounceSearchEmail),
      )
      setUsers(tmp)
    } else {
      getUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchEmail])

  const [dataExport, setDataExport] = useState([])
  const getUsersExport = (event, done) => {
    let data = []

    if (users?.length > 0) {
      data.push(['ID', 'First name', 'Last name', 'Email'])
      users.map((user) => {
        let row = []
        row[0] = user.id
        row[1] = user.first_name
        row[2] = user.last_name
        row[3] = user.email
        data.push(row)
      })

      setDataExport(data)
      done()
    }
  }

  const handleUsersImport = (event) => {
    if (event?.target?.files[0]) {
      const file = event.target.files[0]

      const validType = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'text/csv', // .csv
      ]

      if (!validType.some((type) => type === file.type))
        return toast.error('Only accept xlsx, xls, csv file')

      Papa.parse(file, {
        complete: (responses) => {
          const data = responses.data

          if (data?.length <= 0) return toast.error('Not found data in file')

          if (
            data[0]?.length !== 3 ||
            data[0][0] !== 'first_name' ||
            data[0][1] !== 'last_name' ||
            data[0][2] !== 'email'
          )
            return toast.error('Wrong file format')

          const result = []
          data.forEach((value, index) => {
            if (index > 0 && value.length === 3) {
              const obj = {
                first_name: value[0],
                last_name: value[1],
                email: value[2],
              }

              result.push(obj)
            }
          })

          setUsers(result)
          toast.success('Import successfully')
        },
      })
    }
  }

  return (
    <>
      <Container>
        <div className="my-3 d-flex flex-column md-flex-row md-align-items-center justify-content-between">
          <h3>List users:</h3>
          <div className="d-flex gap-2 align-items-center">
            <Button
              className="d-flex align-items-center gap-1"
              variant="success"
              onClick={() => setIsShowModalAddNew(true)}
            >
              <FaCirclePlus /> Add
            </Button>

            <label
              htmlFor="csv"
              className="d-flex align-items-center gap-1 btn btn-primary"
            >
              <FaFileImport /> Import
            </label>
            <input
              type="file"
              id="csv"
              accept=".xlsx, .xls, .csv"
              hidden
              onChange={(event) => handleUsersImport(event)}
            />

            <CSVLink
              className="btn btn-warning d-flex align-items-center gap-1"
              data={dataExport}
              filename={Date.now() + '.csv'}
              asyncOnClick={true}
              onClick={getUsersExport}
            >
              <FaFileArrowDown />
              Export
            </CSVLink>
          </div>
        </div>
        <FloatingLabel label="Search by email" className="mb-3">
          <Form.Control
            type="text"
            placeholder="name@example.com"
            value={searchEmail}
            onChange={(event) => setSearchEmail(event.target.value)}
          />
        </FloatingLabel>
        <Table
          striped
          bordered
          hover
          className="d-block d-md-table overflow-auto"
        >
          <thead>
            <tr>
              <th>
                <div className="d-flex justify-content-between align-items-center">
                  ID
                  {sortBy?.id === 'asc' ? (
                    <FaArrowDownLong
                      size={'18px'}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSortBy((value) => ({ ...value, id: 'desc' }))
                        handleSort('id', 'desc')
                      }}
                    />
                  ) : (
                    <FaArrowUpLong
                      size={'18px'}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSortBy((value) => ({ ...value, id: 'asc' }))
                        handleSort('id', 'asc')
                      }}
                    />
                  )}
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between align-items-center">
                  First Name
                  {sortBy?.first_name === 'asc' ? (
                    <FaArrowDownLong
                      size={'18px'}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSortBy((value) => ({ ...value, first_name: 'desc' }))
                        handleSort('first_name', 'desc')
                      }}
                    />
                  ) : (
                    <FaArrowUpLong
                      size={'18px'}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSortBy((value) => ({ ...value, first_name: 'asc' }))
                        handleSort('first_name', 'asc')
                      }}
                    />
                  )}
                </div>
              </th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 &&
              users.map((user, index) => (
                <tr key={`user-${index}`}>
                  <th>{user.id}</th>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        onClick={() => {
                          setDataUserEdit(user)
                          setIsShowModalEdit(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDataUserDelete(user)
                          setIsShowModalConfirm(true)
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination justify-content-center"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
        <ModalAddNew
          show={isShowModalAddNew}
          handleClose={() => setIsShowModalAddNew(false)}
          handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
          show={isShowModalEdit}
          handleClose={() => setIsShowModalEdit(false)}
          dataUserEdit={dataUserEdit}
          handleEditUser={handleEditUser}
        />
        <ModalConfirm
          show={isShowModalConfirm}
          handleClose={() => setIsShowModalConfirm(false)}
          dataUserDelete={dataUserDelete}
          handleDeleteUser={handleDeleteUser}
        />
      </Container>
    </>
  )
}

export default TableUsers
