import { useNavigate } from 'react-router-dom'
import React from 'react'
import { webSettingsProps } from '../../views'

function Partners({
  loading,
  webSettings,
}: {
  loading: boolean
  webSettings: webSettingsProps
}) {
  let navigate = useNavigate()

  const toRest = () => {
    navigate('/in-resturant')
  }
  return (
    <section>
      <div className="container py-3 my-3">
        <div className="row ">
          <div className="col-lg-3 mt-2 col-12 col-md-5 pt-md-5 pt-lg-3">
            <div className="font-boldest-second-biggest col-9 col-lg-12">
              Our Restaurant
            </div>
            <div className="fs-14 pt-3">
              {loading ? webSettings.RestaurantDesc : ''}
            </div>
            {/*<!-- restaurant button web -->*/}
            <div className="d-none d-md-block mt-3 pb-3 mt-lg-5">
              <button
                onClick={toRest}
                className="btn w-100 d-none br-theme d-md-block py-3 px-4 text-white bg-black"
                type="button"
              >
                View Menu
              </button>
            </div>
          </div>

          {/*<!-- large screen carousel images -->*/}
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide col-lg-9 d-none d-lg-flex ps-5"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <img
                  src="images/restauracja1.jpg"
                  alt=""
                  //className="img-fluid"
                />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img
                  src="images/restauracja2.jpg"
                  //className="d-block w-100"
                  alt=""
                />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img
                  src="images/restauracja3.jpg"
                  //className="d-block w-100"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/*<!-- restaurant button -->*/}
          <div className=" col-12 d-md-none justify-content-center d-flex mt-3 pb-3 col-9">
            <a
              href="replace"
              onClick={toRest}
              className="btn br-theme text-white w-100 py-3  bg-black"
              type="button"
            >
              visit restaurants
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
