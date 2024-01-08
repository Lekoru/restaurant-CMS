/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Wrapper() {
  
  const googleDriveImageLink = "https://drive.google.com/uc?export=view&id=1WaLxDKb-vmlWCRDtV1qkDjyeQIkjDGGC";

  const main_title = "Food you like";

  const main_desc = "Food you love";
  
  return (
    <div
      id="bgLanding"
      className=""
      style={{
        zIndex: "1",
        width: "100%",
        backgroundImage: `url(${googleDriveImageLink})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-fluid px-md-4 pt-md-5">
        <div className="row pt-md-5">
          <div className="pt-5 mt-5 px-4">
            <h1 className="col-8 col-md-12 h1 text-white ps-lg-4 mt-5">
              <span className="font-boldest-biggest">{main_title}</span>
            </h1>
            <p className="pb-md-4 pb-lg-0 mt-md-2 mt-lg-0 text-white ps-lg-4 pt-4">
              <span className="the-food" style={{ backgroundColor: "black" }}>
              {main_desc}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
