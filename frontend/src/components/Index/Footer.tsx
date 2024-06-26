import React from 'react'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f7f7f7' }}>
      <div className="container mt-5 py-md-3 py-lg-5 py-3">
        <div className="row pt-5 px-md-3 pt-md-3 pb-3 ">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-6">
                <div className="h5 fw-bold">
                  <small> Restaurant-CMS</small>
                </div>

                <div className="p pt-3">
                  <a className="footer-link" href={'zamien'}>
                    <small>Contact Us</small>{' '}
                  </a>
                </div>
                <div className="p pt-3">
                  <a className="footer-link" href={'zamien'}>
                    <small>Terms & Conditions</small>
                  </a>
                </div>
                <div className="p pt-3">
                  <a className="footer-link" href={'zamien'}>
                    <small>Privacy Policy</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- locations and app for mobile -->*/}
          <div className="col-lg-6">
            <div className="row pt-5 pt-lg-0">
              <div className="col-6">
                <div className="h5 fw-bold pt-3 pt-lg-0">
                  Locations<small></small>
                </div>
                <div className="p pt-3">
                  <a href={'zamien'} className="footer-link">
                    <small>Poznan </small>{' '}
                  </a>
                </div>
              </div>
              <div className="col-6 pt-3 pt-lg-0">
                <div className="h5 fw-bold">
                  <small>Take Restaurant-CMS With you</small>
                </div>

                <div className="ps-0 mt-3 col-10">
                  <button className="btn w-100 btn-lg btn-dark" type="button">
                    <img
                      src="images/Apple App Store Coming Soon.png"
                      alt=""
                      className="img-fluid"
                    />
                  </button>
                </div>

                <div className="ps-0 col-10 pt-3">
                  <button className="btn w-100 btn-lg btn-dark" type="button">
                    <img
                      src="images/google play Store Coming Soon.png"
                      alt=""
                      className="img-fluid"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 pt-lg-0 pb-3 px-lg-3">
          <div className="col-12">
            <hr />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <img
                  src="images/Vector (3)black.png"
                  width="20px"
                  alt=""
                  className="img-fluid"
                />
                <img
                  src="images/Vector (5)black.png"
                  width="20px"
                  alt=""
                  className="ms-md-3 ms-1 img-fluid"
                />
                <img
                  src="images/Vector (6)black.png"
                  width="20px"
                  alt=""
                  className="ms-md-3 ms-1 img-fluid"
                />
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div className="p">
                  <small>© 2022 Restaurant-CMS Ltd.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
