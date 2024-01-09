import { useSelector } from 'react-redux'
import 'animate.css'
import React from 'react'

interface mMenuProps {
  name: string
  menu: {
    initialState: {
      menu: null
    }
  }
}
function Overlay({ closeOverlay, width }: any) {
  const mMenu = useSelector((state: mMenuProps) => state)

  return (
    <div
      className={`${
        mMenu
          ? 'animate__animated animate__slideInLeft'
          : 'animate__animated animate__slideOutLeft'
      } overlay`}
      style={{ width: width }}
      onClick={closeOverlay}
    ></div>
  )
}

export default Overlay
