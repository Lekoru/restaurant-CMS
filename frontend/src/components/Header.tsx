import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useSelector, useDispatch } from 'react-redux'

import React, { useEffect, useState } from 'react'
//import Overlay from "../ui/Overlay";
import { setAuth } from '../redux/silces/authSlice'
import { loadFromLocal, removeFromLocal } from '../helpers/storage'
import { toggleMenu } from '../redux/silces/menuSlice'
import { RootState } from '../redux/store'

function Header() {
  const authState = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const userName = loadFromLocal('emauth')
  //const mMenu = useSelector((state) => state.menu.menu);
  const [secMenu, setSecMenu] = useState(false)
  let navigate = useNavigate()
  const location = useLocation()

  const showSecMenu = () => {
    //show secondary  menu
    secMenu ? setSecMenu(false) : setSecMenu(true)
  }

  const toLogin = () => {
    navigate('/login')
    dispatch(toggleMenu(false))
  }

  const toRest = () => {
    navigate('/in-resturant')
    dispatch(toggleMenu(false))
  }

  const goHome = () => {
    navigate('/')
    dispatch(toggleMenu(false))
  }

  const notShowSignIn = () => {
    if (authState.auth !== null) {
      return false
    }
    return !(
      location.pathname === '/login' || location.pathname === '/register'
    )
  }

  const notShowMenu = () => {
    if (authState.auth !== null) {
      return false
    }
    return !(
      location.pathname === '/in-resturant' || location.pathname === '/login'
    )
  }

  const logout = () => {
    dispatch(setAuth(null))
    removeFromLocal()
    navigate('/')
  }

  const goToUserProfile = () => {
    navigate('/user-dashboard/profile')
    showSecMenu()
  }

  useEffect(() => {
    let myFunction = () => {}
    var header = document.getElementById('myHeader')
    if (header) {
      var sticky = header.offsetTop
      myFunction = () => {
        if (window.pageYOffset > sticky && header) {
          header.classList.add('bg-white-native')
        } else {
          if (header) header.classList.remove('bg-white-native')
        }
      }
    }

    window.onscroll = function () {
      myFunction()
    }
  }, [])

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        id="myHeader"
        className="pt-4 pt-md-1"
      >
        <Container fluid className="mx-md-5 mx-3">
          <Navbar.Brand className="cur-pointer" onClick={goHome}>
            <span id="logo-text" className="text-dark">
              Pizza Plaza
            </span>
          </Navbar.Brand>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features"></Nav.Link>
            </Nav>
            <Nav>
              {authState.auth && (
                <Nav.Link className="mx-3" style={{ position: 'relative' }}>
                  <span className="btn btn-n-small px-4" onClick={showSecMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon me-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {(userName && userName.user.Name) || ''}
                  </span>

                  {/** secondary menu */}
                  {secMenu && (
                    <span className="sec-menu">
                      <div className="py-4">
                        <div className="col-10 offset-1">
                          <div className="pb-4">
                            <span
                              className="btn rounded-pill"
                              onClick={goToUserProfile}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg-icon me-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="fw-bold">My Profile</span>
                            </span>
                          </div>
                          <div className="" onClick={logout}>
                            <span className="btn rounded-pill">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg-icon me-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="fw-bold">Logout</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </span>
                  )}
                </Nav.Link>
              )}

              <>
                {notShowMenu() && (
                  <Nav.Link onClick={toRest}>
                    <span className="btn btn-n-small px-4 fw-bold">Menu</span>
                  </Nav.Link>
                )}
              </>

              <>
                {
                  notShowSignIn() && (
                    <Nav.Link onClick={toLogin}>
                      <span className="btn btn-n-small px-4 fw-bold">
                        Sign In
                      </span>
                    </Nav.Link>
                  ) /*: (
                  <Nav.Link onClick={goHome}>
                    <span className="btn btn-n-small px-4 fw-bold">Home</span>
                  </Nav.Link>
                )*/
                }
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
