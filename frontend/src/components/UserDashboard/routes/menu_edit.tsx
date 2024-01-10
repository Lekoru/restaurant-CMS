import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../../../helpers/web'
import { loadFromLocal } from '../../../helpers/storage'
import { useDispatch } from 'react-redux'
import { getUsersList } from '../../../redux/silces/usersSlice'
import { DiSqllite } from 'react-icons/di'
import { MdDelete } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function Admin() {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [, setUserData] = useState(loadFromLocal('emauth'))
  const [usersData, setUsersData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  const extractIdFromGoogleDriveLink = (link_photo: string) => {
    const regex = /\/file\/d\/(.*?)\//
    const match = link_photo.match(regex)
    return match ? match[1] : null
  }

  const [, setSavedDishData] = useState({
    dishName: '',
    dishDesc: '',
    ingredients: '',
    photoLink: '',
    cost: '',
  })

  const [dishData, setDishData] = useState({
    dishName: '',
    dishDesc: '',
    ingredients: '',
    photoLink: '',
    cost: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDishData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSaveClick = () => {
    // Access the dish data using dishData
    console.log('Dish Data:', dishData)

    // Save the dish data to a variable
    setSavedDishData(prevData => ({
      ...prevData,
      ...dishData,
      googleDriveShareLink: dishData.photoLink,
    }))

    const googleDriveShareLink = dishData.photoLink // Use photoLink as googleDriveShareLink

    // Extract ID from Google Drive share link
    const fileId = extractIdFromGoogleDriveLink(googleDriveShareLink)

    // Construct export link
    const exportLink = fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId}`
      : ''

    // Save exportLink to savedDishData
    setSavedDishData(prevData => ({
      ...prevData,
      exportLink: exportLink,
    }))

    handleCloseModal()
  }

  useEffect(() => {
    dispatch(getUsersList())
    let temp = loadFromLocal('emauth')
    if (!temp) navigate('/')
    setUserData(temp)
    temp = loadFromLocal('usersList')
    setUsersData(temp)
    return localStorage.removeItem('usersList')
  }, [navigate, dispatch])

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10">
          <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Dish Name</th>
                  <th>Dish Description</th>
                  <th>Ingredients</th>
                  <th>Photo Link</th>
                  <th>Cost</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {usersData &&
                  usersData.map((user: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.Name}</td>
                        <td>{user.Email}</td>
                        <td>{user.Role}</td>
                        <td>{}</td>
                        <td>
                          <DiSqllite size={30} onClick={handleShowModal} />
                        </td>
                        <td>
                          <MdDelete
                            size={30}
                            onClick={() => removeUser(user.Email)}
                          />
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Dish</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Dish Name"
                    name="dishName"
                    value={dishData.dishName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Dish Description"
                    name="dishDesc"
                    value={dishData.dishDesc}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Ingridients"
                    name="ingredients"
                    value={dishData.ingredients}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Photo link"
                    name="photoLink"
                    value={dishData.photoLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Cost"
                    name="cost"
                    value={dishData.cost}
                    onChange={handleInputChange}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
