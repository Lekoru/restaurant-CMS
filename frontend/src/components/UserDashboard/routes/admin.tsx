import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { changeWebSettings, createUser } from '../../../helpers/web'
import {
  initNewUserConfig,
  initWebSettings,
  NewUserProps,
  webSettingsProps,
} from '../../../helpers/types'

function Admin() {
  const [webSettings, setWebSettings] =
    useState<webSettingsProps>(initWebSettings)
  const [successMessage_web, setSuccessMessage_web] = useState('')
  const [newUserConfig, setNewUserConfig] =
    useState<NewUserProps>(initNewUserConfig)
  const [successMessage_user, setSuccessMessage_user] = useState('')

  const extractIdFromGoogleDriveLink = (link_photo: string) => {
    const regex = /\/file\/d\/(.*?)\//
    const match = link_photo.match(regex)
    return match ? match[1] : null
  }

  const handleSaveClick_add_user = () => {
    createUser(newUserConfig).then()
    setNewUserConfig(initNewUserConfig)
    setSuccessMessage_user('Changes saved successfully!')
  }

  const handleSaveClick_webPage = () => {
    // Google Drive share link
    const googleDriveShareLink = webSettings.MainPhoto

    // Extract ID from Google Drive share link
    const fileId = extractIdFromGoogleDriveLink(googleDriveShareLink)

    // Construct export link
    const exportLink = fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId}`
      : ''
    {
      /* ------------------------------------------------------------------------------- */
    }

    changeWebSettings({ ...webSettings, MainPhoto: exportLink }).then()

    setWebSettings(initWebSettings)
    setSuccessMessage_web('Changes saved successfully!')
  }

  return (
    <>
      <div className="row mb-4">
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
                value={webSettings.MainPhoto}
                onChange={e =>
                  setWebSettings({ ...webSettings, MainPhoto: e.target.value })
                }
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
                value={webSettings.MainTitle}
                onChange={e =>
                  setWebSettings({ ...webSettings, MainTitle: e.target.value })
                }
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
                value={webSettings.MainDesc}
                onChange={e =>
                  setWebSettings({ ...webSettings, MainDesc: e.target.value })
                }
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
                value={webSettings.RestaurantDesc}
                onChange={e =>
                  setWebSettings({
                    ...webSettings,
                    RestaurantDesc: e.target.value,
                  })
                }
              ></textarea>
            </div>

            {/* Save button */}
            <div className="row pt-4 mt-2 px-2">
              <div className="col-12">
                <button
                  className="w-100 py-3 br-theme bg-dark text-white border-0"
                  type="button"
                  onClick={handleSaveClick_webPage}
                >
                  Save
                </button>
              </div>
            </div>
            {successMessage_web && (
              <div className="text-success mt-2">{successMessage_web}</div>
            )}
          </div>
        </div>
      </div>

      {/*----------------------------------------------------------------- Add User ----------------------------------------------------------------------------*/}
      <div className="row mb-4">
        <div className="col-12 col-md-10">
          <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white">
            <div className="px-2 mb-4">
              <span className="h4 fw-bold">Add new User</span>
            </div>

            {/* Name */}
            <div className="mb-4 px-2">
              <label htmlFor="newusername" className="form-label fs-16">
                Name
              </label>
              <input
                type="text"
                id="newusername"
                className="form-control input-n-medium sign-up-form"
                value={newUserConfig.Name}
                onChange={e =>
                  setNewUserConfig({ ...newUserConfig, Name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="mb-4 mt-2 px-2">
              <label htmlFor="newuseremail" className="form-label fs-16">
                Email
              </label>
              <input
                type="text"
                id="newuseremail"
                className="form-control input-n-medium sign-up-form"
                value={newUserConfig.Email}
                onChange={e =>
                  setNewUserConfig({ ...newUserConfig, Email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="mb-4 mt-2 px-2">
              <label htmlFor="newuserpasswd" className="form-label fs-16">
                Password
              </label>
              <input
                type="text"
                id="newuserpasswd"
                className="form-control input-n-medium sign-up-form"
                value={newUserConfig.Password}
                onChange={e =>
                  setNewUserConfig({
                    ...newUserConfig,
                    Password: e.target.value,
                  })
                }
              />
            </div>

            {/* Role */}
            <div className="mb-4 mt-2 px-2">
              <label htmlFor="newuserrole" className="form-label fs-16">
                Role
              </label>
              <Dropdown>
                <Dropdown.Toggle variant={'secondary'}>
                  {newUserConfig.Role}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      setNewUserConfig({ ...newUserConfig, Role: 'User' })
                    }
                  >
                    User
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      setNewUserConfig({ ...newUserConfig, Role: 'Admin' })
                    }
                  >
                    Admin
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* Save button */}
            <div className="row pt-4 mt-2 px-2">
              <div className="col-12">
                <button
                  className="w-100 py-3 br-theme bg-dark text-white border-0"
                  type="button"
                  onClick={handleSaveClick_add_user}
                >
                  Save
                </button>
              </div>
            </div>
            {successMessage_user && (
              <div className="text-success mt-2">{successMessage_user}</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
