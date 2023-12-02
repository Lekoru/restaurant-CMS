import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "animate.css";

/* eslint-disable jsx-a11y/anchor-is-valid */
function MobileMenu({ toRest, toLogin, toHome, logout, closeMenu }) {
  const mMenu = useSelector((state) => state.menu.menu);
  const navigate = useNavigate();
  const notShowSignIn = () => {
    if (authState !== null) {
      return false;
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      return false;
    }
    return true;
  };
  const location = useLocation();
  const authState = useSelector((state) => state.auth.auth);

  const goToUserProfile = () => {
    navigate("/user-dashboard/profile");
    closeMenu();
  };
  const goToUserOrders = () => {
    navigate("/user-dashboard/history");
    closeMenu();
  };

  return (
    <>
      <div
        className={`${
          mMenu
            ? "animate__animated animate__slideInRight"
            : "animate__animated animate__slideOutRight"
        } mobile-menu`}
      >
        <div className="pt-5 mt-5">
          <div className="col-10 offset-1">
            <ul className="navbar-nav ml-auto">
              {authState && (
                <li className="pb-3 text-center">
                  <span className="w-100 fs-20 fw-bold">{authState.name}</span>
                </li>
              )}
              <>
                {
                  notShowSignIn() && (
                    <li className="pb-3">
                      <a onClick={toLogin}>
                        <span className="btn btn-n-small bg-gr w-100">
                          Login
                        </span>
                      </a>
                    </li>
                  ) /*: (
                  <li className="pb-3">
                    <a onClick={toHome}>
                      <span className="btn btn-n-small bg-gr w-100">Home</span>
                    </a>
                  </li>
                )*/
                }
              </>
              {authState && (
                <>
                  <li className="py-3" onClick={goToUserProfile}>
                    <span className="btn rounded-pill">
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
                      <span>My Profile</span>
                    </span>
                  </li>
                  <li className="py-3" onClick={goToUserOrders}>
                    <span className="btn rounded-pill">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-icon me-2"
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
                      <span>My Orders</span>
                    </span>
                  </li>
                </>
              )}
              {authState && (
                <li className="py-3" onClick={logout}>
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
                    <span>Logout</span>
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
