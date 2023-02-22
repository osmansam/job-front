import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { clearProfile } from "../features/profile/ProfileSlice";
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <nav>
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522job%2Blogo%2522&psig=AOvVaw3BADxxqGkXBNLqfEwniZsE&ust=1676988393884000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKiOu92ipP0CFQAAAAAdAAAAABAE"
          alt="logo"
          className="logo"
        />
        {user && (
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/allJobs">
                {user.role === "employer" ? "Your Jobs" : "Find Job"}
              </Link>
            </li>
            {user.role === "employer" && (
              <li>
                <Link to="/addjob">Add Job</Link>
              </li>
            )}
            {user.role !== "employer" && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            <li
              onClick={() => {
                dispatch(logoutUser());
                dispatch(clearProfile());
              }}
            >
              <Link to="/register">Logout</Link>
            </li>
          </ul>
        )}
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 10vh;
  }
  .logo {
    width: 100px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
  }
  li {
    margin: 0 1rem;
  }
  a {
    text-decoration: none;
    color: #000;
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: capitalize;
  }
`;
export default Navbar;
