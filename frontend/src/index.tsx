import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux/store.tsx'
import { Provider } from 'react-redux'
import Index from './views/index.tsx'
import Login from './views/Login.tsx'
import InRestaurant from './views/InRestaurant.tsx'
import UserDashboard from './views/UserDashboard.tsx'
import UserProfile from './components/UserDashboard/routes/UserProfile.tsx'
import UserAdmin from './components/UserDashboard/routes/admin.tsx'
import UserOrderHistory from './components/UserDashboard/routes/UserOrderHistory.tsx'
import EditMenu from './components/UserDashboard/routes/menu_edit.tsx'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/in-resturant" element={<InRestaurant />} />
            <Route path="/user-dashboard" element={<UserDashboard />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="adminPanel" element={<UserAdmin />} />
              <Route path="menu_edit" element={<EditMenu />} />
              <Route path="history" element={<UserOrderHistory />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
