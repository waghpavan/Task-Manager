import React from 'react'
import "./Navbar.css"

import { LuBookMinus } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store';

function Navbar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const dispatch = useDispatch(); 
  const handleLogout = () => {
    dispatch(authAction.logout())
    sessionStorage.removeItem("Id");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="logo navbar-brand">
            <b><LuBookMinus size={25} />ToDo</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2 home-li">
                <a className="nav-link active" aria-current="page" href="/#/">Home</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="/#/todo">ToDo</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="/#/taskhistory">Task History</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="/#/about">About Us</a>
              </li>
            </ul>


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!isLoggedIn && <div className='d-flex'>
                <li className="nav-item mx-2 py-2">
                  <a className="nav-link active btn-nav" aria-current="page" href="/#/SignIn">SignIn</a>
                </li>
                <li className="nav-item mx-2 py-2">
                  <a className="nav-link active btn-nav" aria-current="page" href="/#/SignUp">SignUp</a>
                </li>
              </div>
              }

              {isLoggedIn && 
              <li className="nav-item mx-2 py-2">
                <button onClick={handleLogout} className="nav-link active btn-nav logout" aria-current="page" href="">Logout</button>
              </li>
              }
            </ul>

          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar
