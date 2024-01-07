import React, { useState } from 'react';

function Admin() {
 
  const [mainPhotoLink, setMainPhotoLink] = useState('');
  const [mainTitle, setMainTitle] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

 
  const handleSaveClick = () => {

    console.log('Main Photo Link:', mainPhotoLink);
    console.log('Main Title:', mainTitle);
    console.log('Main Description:', mainDescription);
    console.log('Restaurant Description:', restaurantDescription);
    
    {/* ------------------------------------------------------------------------------- */}

    setMainPhotoLink('');
    setMainTitle('');
    setMainDescription('');
    setRestaurantDescription('');
    setSuccessMessage('Changes saved successfully!');
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10">
          <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white">
            <div className="px-2 mb-4">
              <span className="h4 fw-bold">Edit web page</span>
            </div>

            {/* Main photo link */}
            <div className="mb-4 px-2">
              <label htmlFor="mainPhotoLink" className="form-label fs-16">
                Main photo link
              </label>
              <input
                type="text"
                id="mainPhotoLink"
                className="form-control input-n-medium sign-up-form"
                value={mainPhotoLink}
                onChange={(e) => setMainPhotoLink(e.target.value)}
              />
            </div>

            {/* Main title */}
            <div className="mb-4 mt-2 px-2">
              <label htmlFor="mainTitle" className="form-label fs-16">
                Main title
              </label>
              <input
                type="text"
                id="mainTitle"
                className="form-control input-n-medium sign-up-form"
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
              />
            </div>

            {/* Main description */}
            <div className="mb-4 mt-2 px-2">
              <label htmlFor="mainDescription" className="form-label fs-16">
                Main description
              </label>
              <input
                type="text"
                id="mainDescription"
                className="form-control input-n-medium sign-up-form"
                value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
              />
            </div>

            {/* Restaurant description */}
            <div className="mb-4 mt-2 px-2">
              <label
                htmlFor="restaurantDescription"
                className="form-label fs-16"
              >
                Restaurant description
              </label>
              <textarea
                id="restaurantDescription"
                className="form-control input-n-medium sign-up-form"
                rows={8}
                style={{ resize: 'none', width: '100%', height: '200px' }}
                value={restaurantDescription}
                onChange={(e) => setRestaurantDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Save button */}
            <div className="row pt-4 mt-2 px-2">
              <div className="col-12">
                <button
                  className="w-100 py-3 br-theme bg-dark text-white border-0"
                  type="button"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </div>
            </div>
            {successMessage && (
                  <div className="text-success mt-2">{successMessage}</div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
