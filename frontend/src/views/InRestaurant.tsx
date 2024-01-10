import Meal from '../ui/Meal.tsx'
import React from 'react'

function InRestaurant() {
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

      <div className="container">
        {/** means */}
        <div className="row pt-3 px-2">
          {/** summer lunch  */}
          <div className=" fw-bold h4">
            <small className=" py-1">Summer Lunch</small>
          </div>
        </div>
        <div className="row px-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((rest, index) => (
            <Meal key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default InRestaurant
