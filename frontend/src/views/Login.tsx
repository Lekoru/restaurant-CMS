import React, { useState } from 'react'
import { login } from '../helpers/web'
import { setAuth, saveAuthToLocal } from '../redux/silces/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setErrors] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleErrors = (e: any) => {
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message)
  }

  const handleSuccess = (e: any) => {
    dispatch(setAuth(e))
    dispatch(saveAuthToLocal())

    navigate('/')
  }

  const loginUser = (e: any) => {
    e.preventDefault()
    setErrors(null)

    login(formData)
      .then(res => {
        handleSuccess(res)
      })
      .catch(err => {
        handleErrors(err)
      })
  }

  const errorDiv = <small className="text-danger">{error}</small>

  return (
    <div style={{ height: '100%' }}>
      <div className="container" style={{ overflow: 'hidden', height: '100%' }}>
        <form onSubmit={loginUser}>
          <div className="row d-flex justify-content-center my-4">
            <div className="col-11 col-md-8 col-lg-5">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <span className="h6"> Email</span>
              </label>
              <input
                type="email"
                className="form-control p-3 sign-up-form input-n-medium"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/*<!-- Password -->*/}
          <div className="row d-flex justify-content-center my-4">
            <div className="col-11 col-md-8 col-lg-5">
              <label htmlFor="inputPassword5" className="form-label">
                <span className="h6">Password</span>
              </label>
              <input
                type="password"
                id="inputPassword5"
                className="form-control p-3 sign-up-form input-n-medium"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
                required={false}
                data-msg="Please enter your password"
                value={formData.password}
                onChange={e =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="row text-center">
              <div className="col-12">{error ? errorDiv : null}</div>
            </div>
          </div>
          {/*<!-- submit button -->*/}
          <div className="d-grid gap-2 col-11 col-md-8 pt-5 col-lg-5 mx-auto mt-2">
            <button
              className="btn btn-primary border-0 br-theme p-3 fw-bold bg-black text-white"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
