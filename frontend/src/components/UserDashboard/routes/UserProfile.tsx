import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  changePassword,
  genUserPassword,
  removeUser,
} from '../../../helpers/web.tsx'
import { loadFromLocal } from '../../../helpers/storage.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersList } from '../../../redux/silces/usersSlice.tsx'
import { LiaExpeditedssl } from 'react-icons/lia'
import { MdDelete } from 'react-icons/md'
import { RootState } from '../../../redux/store.tsx'
import { Button, Modal } from 'react-bootstrap'
function UserProfile() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const usersList = useSelector((state: RootState) => state.users.usersList)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [genPassword, setGenPassword] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [userData, setUserData] = useState(loadFromLocal('emauth'))

  const [showDialog, setShowDialog] = useState(
    new Array(usersList.length).fill(false),
  )
  const [showDialog1, setShowDialog1] = useState(
    new Array(usersList.length).fill(false),
  )

  const showUserGenPassDial = (index: number) => {
    setShowDialog(prevState => {
      const temp = [...prevState]
      temp.forEach(() => {
        return false
      })
      prevState[index] = true
      return temp
    })
  }

  const closeUserGenPassDial = (index: number) => {
    setShowDialog(prevState => {
      const temp = [...prevState]
      temp[index] = false
      return temp
    })
  }
  const showDeleteUserDial = (index: number) => {
    setShowDialog1(prevState => {
      const temp = [...prevState]
      temp.forEach(() => {
        return false
      })
      prevState[index] = true
      return temp
    })
  }

  const closeDeleteUserDial = (index: number) => {
    setShowDialog1(prevState => {
      const temp = [...prevState]
      temp[index] = false
      return temp
    })
  }

  useEffect(() => {
    dispatch(getUsersList())
    setIsLoaded(true)
    const temp = loadFromLocal('emauth')
    if (!temp) navigate('/')
    setUserData(temp)
  }, [navigate, dispatch])

  const handleSaveClick = () => {
    const handleSuccess = (e: any) => {
      setSuccessMessage(e.message)
    }
    const handleErrors = (e: any) => {
      setErrorMessage(e.response.data.error)
    }

    setErrorMessage('')
    setSuccessMessage('')

    changePassword({ oldPassword, newPassword })
      .then(res => {
        handleSuccess(res)
      })
      .catch(err => {
        handleErrors(err)
      })

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New password and confirm new password must match')
      setSuccessMessage('')
    } else {
      setOldPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10">
          <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white">
            <div className="px-2 mb-4">
              <span className="h4 fw-bold">Edit password</span>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-4 px-2">
                  <label htmlFor="oldpassword" className="form-label fs-16">
                    Old password
                  </label>
                  <input
                    type="password"
                    className="form-control input-n-medium sign-up-form"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-4 mt-2 px-2">
                  <label htmlFor="password" className="form-label fs-16">
                    New password
                  </label>
                  <input
                    type="password"
                    className="form-control input-n-medium sign-up-form"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4 mt-2 px-2">
                  <label htmlFor="passwordconf" className="form-label fs-16">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    className="form-control input-n-medium sign-up-form"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <div className="row pt-4 mt-2 px-2">
                  <div className="col-12">
                    <button
                      className="w-100 py-3 br-theme bg-dark text-white border-0"
                      type="button"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  </div>
                </div>
                {errorMessage && (
                  <div className="text-danger mt-2">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="text-success mt-2">{successMessage}</div>
                )}
              </div>
            </div>
          </div>

          {userData && userData.user.Role === 'Admin' && (
            <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white mt-4">
              <div className="px-2 mb-4">
                <span className="h4 fw-bold">Worker Table</span>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoaded &&
                    usersList &&
                    usersList.map((user: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.Name}</td>
                          <td>{user.Email}</td>
                          <td>{user.Role}</td>
                          <td>
                            {
                              <LiaExpeditedssl
                                size={30}
                                onClick={async () => {
                                  const data = await genUserPassword(user.Email)
                                  // @ts-ignore
                                  data && setGenPassword(data)
                                  showUserGenPassDial(index)
                                }}
                              />
                            }
                            <Modal
                              show={showDialog[index]}
                              onHide={() => closeUserGenPassDial(index)}
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header>
                                <Modal.Title>
                                  New {user.Name} password
                                </Modal.Title>
                              </Modal.Header>

                              <Modal.Body>
                                <p>
                                  New user password is:
                                  {genPassword ? genPassword : ''}
                                </p>
                              </Modal.Body>

                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => closeUserGenPassDial(index)}
                                >
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </td>
                          <td>
                            {
                              <MdDelete
                                size={30}
                                onClick={() => showDeleteUserDial(index)}
                              />
                            }
                            <Modal
                              show={showDialog1[index]}
                              onHide={() => closeDeleteUserDial(index)}
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header>
                                <Modal.Title>Delete User</Modal.Title>
                              </Modal.Header>

                              <Modal.Body>
                                <p>
                                  Are you sure you want to delete {user.Name}?
                                </p>
                              </Modal.Body>

                              <Modal.Footer>
                                <Button
                                  variant="warning"
                                  onClick={() => {
                                    removeUser(user.Email).then()
                                    closeDeleteUserDial(index)
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => () =>
                                    closeDeleteUserDial(index)
                                  }
                                >
                                  No
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserProfile
