import { NavLink } from "react-router-dom";

import { UserContext } from "../context/userContext";

import { useContext } from "react";

import "./NavBar.css";

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar">
      <h1>FinTrack</h1>

      <ul>
        {!user._id && (
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
        )}

        {user._id && (
          <>
            <li>
              <NavLink to={"/ourTeam"}>Nosso time</NavLink>
            </li>
            <li>
              <NavLink to={`/expenses/${user._id}`}>Despesas</NavLink>
            </li>
            <li>
              <NavLink to={"/create"}>Criar Despesa</NavLink>
            </li>
            <li><NavLink to={`/adm`}>Gerenciar</NavLink></li>
          </>
        )}
      </ul>

      {!user._id && (
        <ul>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/register"} className="register-btn">
              Registro
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
