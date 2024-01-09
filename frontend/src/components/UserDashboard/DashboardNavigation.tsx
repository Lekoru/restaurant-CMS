import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { loadFromLocal } from '../../helpers/storage'
import { DiGoogleAnalytics } from 'react-icons/di'
import { TiDropbox } from 'react-icons/ti'

function DashboardNavigation() {
  let navigate = useNavigate()
  const location = useLocation()
  const userData = loadFromLocal('emauth')

  const toProfile = () => {
    navigate('/user-dashboard/profile')
  }
  const toHistory = () => {
    navigate('/user-dashboard/history')
  }
  const toAdmin = () => {
    navigate('/user-dashboard/adminPanel')
  }
  const toMenu = () => {
    navigate('/user-dashboard/menu_edit')
  }

  useEffect(() => {
    const temp = loadFromLocal('emauth')
    if (!temp) navigate('/')
  }, [navigate])

  return (
    <>
      <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
        <div className="row pt-5 mt-5 px-2">
          <div
            className={`col-11 ps-0 br-tr-lb mt-5 ${
              location.pathname === '/user-dashboard/profile' &&
              'bg-theme br-left-only-dark'
            }`}
          >
            <span
              onClick={toProfile}
              className={`btn d-flex-align-center`}
              style={{ height: '51px' }}
            >
              <span className="d-flex-align-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-dash-icon py-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ps-2  fs-16">Profile</span>
              </span>
            </span>
          </div>

          {/*  ------------------------------------  Admin Link   ---------------------------------------------  */}
          {userData && userData.user.Role === 'Admin' && (
            <div
              className={`col-11 ps-0 br-tr-lb mt-3 ${
                location.pathname === '/user-dashboard/adminPanel' &&
                'bg-theme br-left-only-dark'
              }`}
            >
              <span
                onClick={toAdmin}
                className={`btn d-flex-align-center`}
                style={{ height: '51px' }}
              >
                <span className="d-flex-align-center">
                  <DiGoogleAnalytics />
                  <span className="ps-2 fs-16">Admin</span>
                </span>
              </span>
            </div>
          )}
          {/*  ------------------------------------  Menu Link   ---------------------------------------------  */}
          <div
            className={`col-11 ps-0 br-tr-lb mt-3 ${
              location.pathname === '/user-dashboard/menu_edit' &&
              'bg-theme br-left-only-dark'
            }`}
          >
            <span
              onClick={toMenu}
              className={`btn d-flex-align-center`}
              style={{ height: '51px' }}
            >
              <TiDropbox />
              <span className="ps-2 fs-16">Edit Menu</span>
            </span>
          </div>

          <div
            className={`col-11 ps-0 br-tr-lb mt-3 ${
              location.pathname === '/user-dashboard/history' &&
              'bg-theme br-left-only-dark'
            }`}
          >
            <span
              onClick={toHistory}
              className={`btn d-flex-align-center`}
              style={{ height: '51px' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-dash-icon py-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span className="ps-2  fs-16">Order history</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardNavigation
