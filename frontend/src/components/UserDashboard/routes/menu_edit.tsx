import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createDish, deleteDish, editDish } from '../../../helpers/web.tsx'
import { loadFromLocal } from '../../../helpers/storage.tsx'
import { useDispatch } from 'react-redux'
import { DiSqllite } from 'react-icons/di'
import { MdDelete } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { initNewDishProps, NewDishProps } from '../../../helpers/types.tsx'
import { getDishesList } from '../../../redux/silces/dishesSlice.tsx'

function Admin() {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [newDish, setNewDish] = useState<NewDishProps>(initNewDishProps)
  const [dishData, setDishData] = useState<NewDishProps>(initNewDishProps)
  const [dishesList, setDishesList] = useState<NewDishProps[]>([])
  const [showModal, setShowModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = (id: number) => {
    dishData.id = id
    setShowModal(true)
  }

  const extractIdFromGoogleDriveLink = (link_photo: string) => {
    const regex = /\/file\/d\/(.*?)\//
    const match = link_photo.match(regex)
    return match ? match[1] : null
  }

  const handleSaveClick1 = () => {
    createDish(newDish)
      .then(() => {
        setSuccessMessage('Successfully created new dish.')
      })
      .catch(e => {
        setErrorMessage(
          e && 'error' in e.response.data ? e.response.data.error : '',
        )
      })
    setNewDish(initNewDishProps)
  }

  const handleSaveClick2 = async () => {
    const googleDriveShareLink = dishData.Photo

    const fileId = extractIdFromGoogleDriveLink(googleDriveShareLink)

    const exportLink = fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId}`
      : ''

    await editDish({ ...dishData, Photo: exportLink })
    setDishData(initNewDishProps)
    handleCloseModal()
  }

  useEffect(() => {
    dispatch(getDishesList())
    let temp = loadFromLocal('emauth')
    if (!temp) navigate('/')
    temp = loadFromLocal('dishesList')
    setDishesList(temp)
    return localStorage.removeItem('dishesList')
  }, [navigate, dispatch])

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10">
          <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white">
            <div className="px-2 mb-4">
              <span className="h4 fw-bold">Add new menu</span>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-4 px-2">
                  <label htmlFor="dishname" className="form-label fs-16">
                    Dish Name
                  </label>
                  <input
                    type="text"
                    className="form-control input-n-medium sign-up-form"
                    value={newDish.DishName}
                    onChange={e =>
                      setNewDish({ ...newDish, DishName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4 px-2">
                  <label htmlFor="dishDescription" className="form-label fs-16">
                    Dish Description
                  </label>
                  <input
                    type="text"
                    className="form-control input-n-medium sign-up-form"
                    value={newDish.DishDesc}
                    onChange={e =>
                      setNewDish({ ...newDish, DishDesc: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4 px-2">
                  <label htmlFor="ingredientsList" className="form-label fs-16">
                    Ingredients List
                  </label>
                  <input
                    type="text"
                    className="form-control input-n-medium sign-up-form"
                    value={newDish.Ingredients}
                    onChange={e =>
                      setNewDish({ ...newDish, Ingredients: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4 px-2">
                  <label htmlFor="photoLink" className="form-label fs-16">
                    Photo Link
                  </label>
                  <input
                    type="text"
                    className="form-control input-n-medium sign-up-form"
                    value={newDish.Photo}
                    onChange={e =>
                      setNewDish({ ...newDish, Photo: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4 px-2">
                  <label htmlFor="cost" className="form-label fs-16">
                    Cost
                  </label>
                  <input
                    type="number"
                    className="form-control input-n-medium sign-up-form"
                    value={newDish.Price}
                    onChange={e =>
                      setNewDish({
                        ...newDish,
                        Price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="row pt-4 mt-2 px-2">
                  <div className="col-12">
                    <button
                      className="w-100 py-3 br-theme bg-dark text-white border-0"
                      type="button"
                      onClick={handleSaveClick1}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
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
                {dishesList &&
                  dishesList.map((dish: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{dish.DishName}</td>
                        <td>{dish.DishDesc}</td>
                        <td>{dish.Ingredients}</td>
                        <td>{dish.Photo}</td>
                        <td>{dish.Price}</td>
                        <td>
                          <DiSqllite
                            size={30}
                            onClick={() => {
                              handleShowModal(dish.id)
                            }}
                          />
                        </td>
                        <td>
                          <MdDelete
                            size={30}
                            onClick={() => deleteDish(dish.id)}
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
                    value={dishData.DishName}
                    onChange={e =>
                      setDishData({ ...dishData, DishName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Dish Description"
                    name="dishDesc"
                    value={dishData.DishDesc}
                    onChange={e =>
                      setDishData({ ...dishData, DishDesc: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Ingridients"
                    name="ingredients"
                    value={dishData.Ingredients}
                    onChange={e =>
                      setDishData({ ...dishData, Ingredients: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Photo link"
                    name="photoLink"
                    value={dishData.Photo}
                    onChange={e =>
                      setDishData({ ...dishData, Photo: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Cost"
                    name="cost"
                    value={dishData.Price}
                    onChange={e =>
                      setDishData({
                        ...dishData,
                        Price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSaveClick2}>
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
