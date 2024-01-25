import React, { useEffect, useState } from 'react'
import { getDishesList } from '../redux/silces/dishesSlice.tsx'
import { useDispatch, useSelector } from 'react-redux'
import FoodViewModal from '../ui/FoodViewModal.tsx'
import { RootState } from '../redux/store.tsx'

function InRestaurant() {
  const dispatch = useDispatch()
  const dishesList = useSelector((state: RootState) => state.dishes.dishesList)
  const [isViewingItem, setIsViewItem] = useState(
    new Array(dishesList.length).fill(false),
  )
  const [isLoaded, setIsLoaded] = useState(false)
  const showMealDetail = (index: number) => {
    setIsViewItem(prevState => {
      const temp = [...prevState]
      temp.forEach(() => {
        return false
      })
      prevState[index] = true
      return temp
    })
  }

  const closeModal = (index: number) => {
    setIsViewItem(prevState => {
      const temp = [...prevState]
      temp[index] = false
      return temp
    })
  }

  useEffect(() => {
    dispatch(getDishesList())
    setIsLoaded(true)
  }, [dispatch])

  return (
    <section>
      <div
        className="container-fluid pt-5 text-theme pb-5 inrest-wrapper-image"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)),url("${'images/rest-wra.jpg'}")`,
        }}
      >
        {/** intro text */}

        <div className="row px-md-5 mx-md-3">
          <div className="col-12 mt-4 px-4">
            <div className="h3 fw-bolder">Pizza Plaza</div>
            <div className="p">Italian cuisine, cocktails and wines</div>
          </div>
        </div>

        {/** contacts */}
        <div className="row px-md-5 mx-md-3">
          <div className="col-12 px-4">
            <div className="pt-2 text-grey fs-14 d-flex-native">
              <img
                className="img-fluid"
                src="/images/Vector location.png"
                alt=""
              />
              <span className="ps-2">Poznan</span>
            </div>
            <div className="pt-2 text-grey fs-14 d-flex-native">
              <img
                src="/images/Vector telephone.png"
                className="img-fluid"
                alt=""
              />
              <span className="ps-2"></span>123 456 789
            </div>
          </div>
        </div>
      </div>

      {isLoaded && (
        <div className="container">
          {/** means */}
          <div className="row pt-3 px-2">
            {/** summer lunch  */}
            <div className=" fw-bold h4">
              <small className=" py-1">Summer Lunch</small>
            </div>
          </div>
          <div className="row px-2">
            {dishesList &&
              dishesList.map((dish, index) => {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-3 cur-pointer"
                    onClick={() => showMealDetail(index)}
                    key={index}
                  >
                    <div className="card border-0">
                      <div className="card-body px-0">
                        <img
                          src={dish.Photo}
                          alt=""
                          className="img-fluid w-100"
                        />
                        <h6 className="card-title pt-2 restaurantCardHeader fw-bold text-uppercase mb-1">
                          {dish.DishName}
                        </h6>
                        <p className="card-text mb-1 restaurantCardText">
                          {dish.DishDesc}
                        </p>
                        <div className="fw-bold">{dish.Price} Zł</div>
                      </div>
                    </div>
                    {isViewingItem[index] && (
                      <FoodViewModal
                        closeModal={closeModal}
                        dish={dish}
                        index={index}
                      />
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </section>
  )
}

export default InRestaurant
