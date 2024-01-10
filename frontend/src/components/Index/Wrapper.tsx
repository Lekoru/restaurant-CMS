import React from 'react'
import { webSettingsProps } from '../../helpers/types.tsx'

function Wrapper({
  loading,
  webSettings,
}: {
  loading: boolean
  webSettings: webSettingsProps
}) {
  return (
    <>
      {loading && (
        <div
          id="bgLanding"
          className=""
          style={{
            zIndex: '1',
            width: '100%',
            backgroundImage: `url(${webSettings.MainPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container-fluid px-md-4 pt-md-5">
            <div className="row pt-md-5">
              <div className="pt-5 mt-5 px-4">
                <h1 className="col-8 col-md-12 h1 text-white ps-lg-4 mt-5">
                  <span className="font-boldest-biggest">
                    {webSettings.MainTitle}
                  </span>
                </h1>
                <p className="pb-md-4 pb-lg-0 mt-md-2 mt-lg-0 text-white ps-lg-4 pt-4">
                  <span
                    className="the-food"
                    style={{ backgroundColor: 'black' }}
                  >
                    {webSettings.MainDesc}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Wrapper
