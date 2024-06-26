import React from 'react'

const ReviewCard = ({ item }: { item: number }) => {
  return (
    <div className="col-7 col-md-4 col-lg-3">
      <div className="card border-2 border-r-5">
        <div className="card-body py-4 ">
          <span className="card-title">
            <img src="images/textt.svg" alt="" />
          </span>
          <p className="card-text mb-5 mt-3" style={{ lineHeight: '20px' }}>
            <small>
              Best food delivery app i have used in Poznan. Absolutely
              recommended and ill use it over and over again! Awesome!
            </small>
          </p>
          <div className="row">
            <div className="col-4 pe-md-3 pe-2">
              <img src="images/review_image.png" alt="" className="img-fluid" />
            </div>
            <div className="col-8 ps-0 my-auto">
              <div className="h5 fw-bold mb-0">Mary Jane</div>
              <div className="p">
                <small>Facebook Post</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
