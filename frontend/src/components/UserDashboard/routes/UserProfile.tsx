import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {changePassword, get_users} from "../../../helpers/web";
import {loadFromLocal} from "../../../helpers/storage";
import {changePassword} from "../../../helpers/web";
import {loadFromLocal} from "../../../helpers/storage";

function UserProfile() {
  let navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(loadFromLocal());
  const [usersData, setUsersData] = useState([]);

  const user_table = async () => {
    const temp = await get_users({ email: userData.user.Email });
    return temp ;
  }

  //const [usersData, setUsersData] = useState(user_table());
  //const userData = loadFromLocal()


  useEffect(() => {
    const temp = loadFromLocal()
    if (!temp)
    {
      navigate("/");
    }
  }, [])


  const handleSaveClick = () => {
    const handleSuccess = (e: any) => {
      setSuccessMessage(e.message)
    };
    const handleErrors = (e: any) => {
      setErrorMessage(e.response.data.error)
    };

    setErrorMessage('');
    setSuccessMessage('');

    const userData = loadFromLocal()
    changePassword({email: userData.user.Email, oldPassword, newPassword})
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleErrors(err);
      });

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New password and confirm new password must match');
      setSuccessMessage('');
    } else {
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10">
          <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white">
            <div className="px-2 mb-4">
              <span className="h4 fw-bold">Edit password</span>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-4 px-2">
                  <label htmlFor="userName" className="form-label fs-16">
                    Old password
                  </label>
                  <input
                    type="password"
                    className="form-control input-n-medium sign-up-form"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-4 mt-2 px-2">
                  <label htmlFor="exampleInputPassword1" className="form-label fs-16">
                    New password
                  </label>
                  <input
                    type="password"
                    className="form-control input-n-medium sign-up-form"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4 mt-2 px-2">
                  <label htmlFor="exampleInputPassword2" className="form-label fs-16">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    className="form-control input-n-medium sign-up-form"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
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
                {errorMessage && (
                  <div className="text-danger mt-2">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="text-success mt-2">{successMessage}</div>
                )}
              </div>
            </div>
          </div>

          {userData && userData.user.Role === "Admin" && (
  <div className="card border-0 shadow-n px-md-4 px-2 py-5 br-theme bg-white mt-4">
    <div className="px-2 mb-4">
      <span className="h4 fw-bold">Worker Table</span>
    </div>

    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {usersData.map((user:any,index:number) =>{
        return(
          <tr key={ index}>
            <td>{ user.id}</td>
            <td>{ user.name}</td>
            <td>{ user.email}</td>
            <td>{ user.password}</td>
            <td>{ user.role}</td>
          </tr>
        )

      }  )}
      </tbody>
    </table>
  </div>
)}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
