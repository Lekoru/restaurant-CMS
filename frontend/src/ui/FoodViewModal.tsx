import './foodViewcss.css'
import React from 'react'
import { NewDishProps } from '../helpers/types.tsx'

interface FoodViewProps {
  closeModal: Function
  dish: NewDishProps
  index: number
}
function FoodViewModal({ closeModal, dish, index }: FoodViewProps) {
  const title = dish.DishName
  const description = dish.DishDesc
  const ingredients = dish.Ingredients.split(',')

  return (
    <>
      <div
        className="modal"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content delete">
            <i
              onClick={() => closeModal(index)}
              className="bi bi-x position-absolute cur-pointer end-0 p-0 m-0"
              style={{
                fontSize: '36px',
                top: '0%',
                zIndex: '45',
                backgroundColor: '#eee',
              }}
            ></i>

            <div className="d-sm-flex justify-content-between d-inline-block">
              <img
                src={dish.Photo || ''}
                alt=""
                className="img-fluid bg-dark image"
              />
              <div className="bg-white" style={{ width: '100%' }}>
                <div className="p-3 position-relative pt-4">
                  <h5 className="fw-bold d-sm-block">{title}</h5>
                  <p className="options fs-16 d-sm-block">{description}</p>
                  <div
                    className="no-scroll-bar"
                    style={{
                      maxHeight: '320px',
                      minHeight: '320px',
                      overflowY: 'scroll',
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <p className="fw-bold mt-2">Ingredients</p>
                      <i className="bi bi-asterisk fs-small pb-2 ps-2"></i>
                    </div>
                    <div className="ingredients">
                      {ingredients.map((ingredient, index) => {
                        return (
                          <div
                            key={index}
                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                          >
                            <div>{ingredient}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => closeModal(index)} className="modal-backdrop show" />
    </>
  )
}

export default FoodViewModal
