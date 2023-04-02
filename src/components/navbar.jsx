import React from "react";
import { NavLink } from "react-router-dom";
import JoinSpace from "./joinSpace";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light   justify-content-between ">
      <h1 className="navbar-brand ">TaskMaster</h1>
        <span className="navbar-band text-capitalize flex-fill">{user.name}</span>
     

        {user && (
          <React.Fragment>
            <ul className="navbar-nav d-flex align-items-center d-flex justify-content-evenly ">
              <li className="nav-item ">
                <div className="nav-link d-flex">
                  <JoinSpace user={user} />
                </div>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  sign out
                </NavLink>
              </li>
            </ul>
          </React.Fragment>
        )}
      
    </nav>
  );
};

export default NavBar;
